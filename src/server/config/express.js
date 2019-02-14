import fs from 'fs';
import path from 'path';
import glob from 'glob';
import express from 'express';
import compression from 'compression';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';
import Store from 'connect-mongo';
import flash from 'connect-flash';
import https from 'https';
import consolidate from 'consolidate';
import mongoose from 'mongoose';

import config from './config';
import passportInit from './passport';

const app = express();

// Should be placed before express.static
// NOTE: Should be disabled if TLS present (https://cve.mitre.org/cgi-bin/cvename.cgi?name=cve-2012-4929)
app.use(compression({
    // only compress files for the following content types
    filter(req, res) {
        return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
    },
    // zlib option for compression level
    level: 3
}));

// Showing stack errors
app.set('showStackError', true);

app.engine('html', consolidate.swig);
app.set('view engine', 'html');
app.set('views', path.resolve(__dirname, '../views'));

// Enable logger (morgan)
app.use(morgan(config.logging.format || 'combined', config.logging.options || {}));

// Environment dependent middleware
if (process.env.NODE_ENV === 'development') {
    // Disable views cache
    app.set('view cache', false);
} else if (process.env.NODE_ENV === 'production') {
    app.locals.cache = 'memory';
}

// Request body parsing middleware should be above methodOverride
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(methodOverride());

// Use helmet to secure Express headers
app.use(helmet.frameguard({ action: 'deny' }));
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
app.disable('x-powered-by');

// Setting the app router and static folder
app.use(express.static(path.resolve('./public')));

// CookieParser should be above session
app.use(cookieParser());

// Express MongoDB session storage
app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret,
    store: new (Store({ session }))({
        mongooseConnection: mongoose.connection,
        collection: config.sessionCollection
    }),
    cookie: config.sessionCookie,
    name: config.sessionName
}));

// use passport session
app.use(passport.initialize());
app.use(passport.session());
passportInit();

// connect flash for flash messages
app.use(flash());

// Globbing routing files
glob.sync(path.resolve(__dirname, '../routes/**/*.js'))
    .forEach((routePath) => {
        require(path.resolve(routePath)).default(app); // eslint-disable-line import/no-dynamic-require, global-require
    });

// Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
app.use((err, req, res, next) => {
    // If the error object doesn't exists
    if (!err) {
        return next();
    }

    // Log it
    console.error(err.stack);

    // Error page
    res.status(500).render('500', {
        error: err.stack
    });
});

// Assume 404 since no middleware responded
app.use((req, res) => {
    res.status(404).render('404', {
        url: req.originalUrl,
        error: 'Not Found'
    });
});

let tls; // eslint-disable-line import/no-mutable-exports
if (process.env.TLS_KEY_PATH && process.env.TLS_CERT_PATH) {
    // Log SSL usage
    console.log('TLS Enabled');

    // Load SSL key and certificate
    const privateKey = fs.readFileSync(process.env.TLS_KEY_PATH, 'utf8');
    const certificate = fs.readFileSync(process.env.TLS_CERT_PATH, 'utf8');

    // Create HTTPS Server
    tls = https.createServer({
        key: privateKey,
        cert: certificate
    }, app);
}

export { tls };
export default app;
// /**
//  * Module dependencies.
//  */
// var fs = require('fs'),
//  http = require('http'),
//  https = require('https'),
//  express = require('express'),
//  morgan = require('morgan'),
//  logger = require('./logger'),
//  bodyParser = require('body-parser'),
//  session = require('express-session'),
//  compression = require('compression'),
//  methodOverride = require('method-override'),
//  cookieParser = require('cookie-parser'),
//  helmet = require('helmet'),
//  passport = require('passport'),
//  mongoStore = require('connect-mongo')({
//      session: session
//  }),
//  flash = require('connect-flash'),
//  config = require('./config'),
//  consolidate = require('consolidate'),
//  path = require('path');

// module.exports = function(db) {
//  // Initialize express app
//  var app = express();

//  // Globbing model files
//  config.getGlobbedFiles('./app/models/**/*.js').forEach(function(modelPath) {
//      require(path.resolve(modelPath));
//  });

//  // Setting application local variables
//  app.locals.title = config.app.title;
//  app.locals.description = config.app.description;
//  app.locals.keywords = config.app.keywords;
//  app.locals.facebookAppId = config.facebook.clientID;
//  app.locals.jsFiles = config.getJavaScriptAssets();
//  app.locals.cssFiles = config.getCSSAssets();

//  // Passing the request url to environment locals
//  app.use(function(req, res, next) {
//      res.locals.url = req.protocol + '://' + req.headers.host + req.url;
//      next();
//  });

//  // Should be placed before express.static
//  app.use(compression({
//      // only compress files for the following content types
//      filter: function(req, res) {
//          return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
//      },
//      // zlib option for compression level
//      level: 3
//  }));

//  // Showing stack errors
//  app.set('showStackError', true);

//  // Set swig as the template engine
//  app.engine('server.view.html', consolidate[config.templateEngine]);

//  // Set views path and view engine
//  app.set('view engine', 'server.view.html');
//  app.set('views', './app/views');

//  // Enable logger (morgan)
//  app.use(morgan(logger.getLogFormat(), logger.getLogOptions()));

//  // Environment dependent middleware
//  if (process.env.NODE_ENV === 'development') {
//      // Disable views cache
//      app.set('view cache', false);
//  } else if (process.env.NODE_ENV === 'production') {
//      app.locals.cache = 'memory';
//  }

//  // Request body parsing middleware should be above methodOverride
//  app.use(bodyParser.urlencoded({
//      extended: true
//  }));
//  app.use(bodyParser.json({limit: '50mb'}));
//  app.use(methodOverride());

//  // Use helmet to secure Express headers
//  app.use(helmet.xframe());
//  app.use(helmet.xssFilter());
//  app.use(helmet.nosniff());
//  app.use(helmet.ienoopen());
//  app.disable('x-powered-by');

//  // Setting the app router and static folder
//  app.use(express.static(path.resolve('./public')));

//  // CookieParser should be above session
//  app.use(cookieParser());

//  // Express MongoDB session storage
//  app.use(session({
//      saveUninitialized: true,
//      resave: true,
//      secret: config.sessionSecret,
//      store: new mongoStore({
//          db: db.connection.db,
//          collection: config.sessionCollection
//      }),
//      cookie: config.sessionCookie,
//      name: config.sessionName
//  }));

//  // use passport session
//  app.use(passport.initialize());
//  app.use(passport.session());

//  // connect flash for flash messages
//  app.use(flash());

//  // Use helmet to secure Express headers
//  app.use(helmet.xframe());
//  app.use(helmet.xssFilter());
//  app.use(helmet.nosniff());
//  app.use(helmet.ienoopen());
//  app.disable('x-powered-by');

//  // Setting the app router and static folder
//  app.use(express.static(path.resolve('./public')));

//  // Globbing routing files
//  config.getGlobbedFiles('./app/routes/**/*.js').forEach(function(routePath) {
//      require(path.resolve(routePath))(app);
//  });

//  // Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
//  app.use(function(err, req, res, next) {
//      // If the error object doesn't exists
//      if (!err) return next();

//      // Log it
//      console.error(err.stack);

//      // Error page
//      res.status(500).render('500', {
//          error: err.stack
//      });
//  });

//  // Assume 404 since no middleware responded
//  app.use(function(req, res) {
//      res.status(404).render('404', {
//          url: req.originalUrl,
//          error: 'Not Found'
//      });
//  });

//  if (process.env.NODE_ENV === 'staging' || process.env.NODE_ENV === 'production') {
//      // Log SSL usage
//      console.log('Securely using https protocol');

//      // Load SSL key and certificate
//      var privateKey = fs.readFileSync('/home/grow-one/ssl/growone.key', 'utf8');
//      var certificate = fs.readFileSync('/home/grow-one/ssl/319637bca8f2440c.crt', 'utf8');

//      // Create HTTPS Server
//      var httpsServer = https.createServer({
//          key: privateKey,
//          cert: certificate
//      }, app);

//      // Return HTTPS server instance
//      return httpsServer;
//  }

//  // Return Express server instance
//  return app;
// };
