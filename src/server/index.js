/*
 * Rome has grown since its humble beginnings, that it is now overwhelmed by its own greatness.
 *   - Livy
 */
import chalk from 'chalk';

import config from './config/config';
import './config/database';
import app from './config/express';

export default app.listen(config.port);
console.log('--');
console.log(chalk.green('Application started'));
console.log(chalk.green(`Environment:\t\t\t${ process.env.NODE_ENV }`));
console.log(chalk.green(`Port:\t\t\t\t${ config.port }`));
console.log(chalk.green(`Database:\t\t\t${ config.db.uri }`));
// if (tls) {
//     console.log(chalk.green('TLS:\t\t\t\ton'));
// }
console.log('--');

// /**
//  * Module dependencies.
//  */
// var init = require('./config/init')(),
//  config = require('./config/config'),
//  mongoose = require('mongoose'),
//  extend = require('mongoose-schema-extend'),
//  chalk = require('chalk'),
//  autoIncrement = require('mongoose-auto-increment'),
//  Q = require('q');

// // Enable long stack traces in promises
// Q.longStackSupport = true;

// /**
//  * Main application entry file.
//  * Please note that the order of loading is important.
//  */

// // Bootstrap db connection
// var db = mongoose.connect(config.db.uri, config.db.options, function(err) {
//  if (err) {
//      console.error(chalk.red('Could not connect to MongoDB!'));
//      console.log(chalk.red(err));
//  }
// });
// mongoose.connection.on('error', function(err) {
//  console.error(chalk.red('MongoDB connection error: ' + err));
//  process.exit(-1);
//  }
// );

// autoIncrement.initialize(db);

// // Init the express application
// var app = require('./config/express')(db);

// // Bootstrap passport config
// require('./config/passport')();

// require('./config/mongoose');

// // Start the app by listening on <port>
// app.listen(config.port);

// // Expose app
// exports = module.exports = app;

// Logging initialization
// console.log('--');
// console.log(chalk.green('Application started'));
// console.log(chalk.green(`Environment:\t\t\t${ process.env.NODE_ENV }`));
// console.log(chalk.green(`Port:\t\t\t\t${ process.env.PORT }`));
// console.log(chalk.green(`Database:\t\t\t${ process.env.DB_URI }`));
// if (tls) {
//     console.log(chalk.green('TLS:\t\t\t\ton'));
// }
// console.log('--');
