'use strict'

const publicPath = 'http://0.0.0.0:3001/'

module.exports = {
    mode: process.env.NODE_ENV || 'production',
    entry: [
        // 'webpack-dev-server/client?' + publicPath,
        './src/client'
    ],
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js',
        publicPath: publicPath
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: [
                'strip-sourcemap-loader',
                'babel-loader'
            ]
        }]
    },

    'devtool': 'source-map'
    // 'devServer': {
    //     contentBase: 'public/',
    //     publicPath: publicPath,
    //     host: '0.0.0.0',
    //     port: 3001,
    //     headers: {
    //         'Access-Control-Allow-Origin': '*'
    //     },
    //     disableHostCheck: true,
    //     hot: false,
    //     inline: false
    // }
}


// /* eslint-disable no-useless-escape */

// require('@babel/register');
// const fs = require('fs');
// const path = require('path');
// const webpack = require('webpack');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
// const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const globAll = require('glob-all');
// const PurifyCSSPlugin = require('purifycss-webpack');
// const CompressionPlugin = require('compression-webpack-plugin');
// const UnminifiedWebpackPlugin = require('unminified-webpack-plugin');
// const MinifyPlugin = require('babel-minify-webpack-plugin');
// const UnusedWebpackPlugin = require('unused-webpack-plugin');
// const OfflinePlugin = require('offline-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

// const forProd = (prod, other) => {
//     if (process.env.NODE_ENV === 'production') {
//         return prod;
//     }
//     return other;
// }

// const fixSetting = function (o) {
//     if (!Array.isArray(o)) {
//         return require.resolve(o);
//     }

//     o[0] = require.resolve(o[0]);
//     if (o[1] && o[1].alias) {
//         Object.keys(o[1].alias).forEach((key) => {
//             o[1].alias[key] = require.resolve(o[1].alias[key]);
//         });
//     }
//     return o;
// }
// const fixBabel = function (settings) {
//     let result = {
//         ...settings
//     };
//     if (result.presets) {
//         result.presets = result.presets.map(fixSetting);
//     }
//     if (result.plugins) {
//         result.plugins = result.plugins.map(fixSetting);
//     }
//     return result;
// }
// const babelSettings = fixBabel(JSON.parse(fs.readFileSync('.babelrc', 'utf8')));

// const cssLoader = (url = false) => ({
//     'loader': 'css-loader',
//     'options': {
//         url,
//         'minimize': process.env.NODE_ENV === 'production',
//         'importLoaders': 1
//     }
// });

// const API_URL = process.env.API_URL || '/';
// const WS_URL = process.env.WS_URL || '/';

// module.exports = {
//     'entry': {
//         [forProd('main.min', 'main')]: [forProd(undefined, 'webpack-dev-server/client?http://0.0.0.0:3001'), 'whatwg-fetch', './src/js/index.js'].filter((o) => (!!o)),
//         'index': ['./src/html/index.html'],
//         'loader': ['./src/sass/preloading/style.scss']
//         // 'vendor.min': ['offline-plugin/runtime', 'react', 'react-dom', 'react-router', 'redux', 'react-redux', 'redux-saga', 'history', 'lodash-es']
//     },
//     'output': {
//         'filename': 'js/[name].js',
//         'path': path.resolve('./dist')
//     },
//     'node': { 'global': true },
//     'module': { 'rules': [
//         // {
//         //     'enforce': 'pre',
//         //     'test': /\.jsx?$/,
//         //     'exclude': /node_modules/,
//         //     'loader': 'eslint-loader',
//         //     'options': {
//         //         'configFile': '.eslintrc',
//         //         'failOnWarning': false,
//         //         'failOnError': true
//         //     }
//         // },
//         {
//             'test': /\.js$/,
//             'exclude': /node_modules/,
//             'loaders': [
//                 'strip-sourcemap-loader',
//                 {
//                     'loader': 'babel-loader', 'query': babelSettings
//                 }
//             ]
//         },
//         {
//             'test': /\.css$/,
//             'use': ExtractTextPlugin.extract({
//                 'use': cssLoader(true),
//                 'fallback': 'style-loader',
//                 'publicPath': '../'
//             })
//         },
//         {
//             'test': /\.(sass|scss)$/,
//             'use': ExtractTextPlugin.extract({
//                 'use': [cssLoader(), 'sass-loader'],
//                 'fallback': 'style-loader',
//                 'publicPath': '../'
//             })
//         },
//         {
//             'test': /\.less$/,
//             'use': ExtractTextPlugin.extract({
//                 'use': [cssLoader(), 'less-loader'],
//                 'fallback': 'style-loader',
//                 'publicPath': '../'
//             })
//         },
//         {
//             'test': /\.html/,
//             'loader': 'file-loader',
//             'query': { 'name': '[name].[ext]' }
//         },
//         {
//             'test': /\.(png|jpg|gif)(\?v=\d+\.\d+\.\d+)?$/,
//             'loader': 'url-loader?limit=100000'
//         },
//         {
//             'test': /\.(eot|com|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
//             'loader': 'url-loader?limit=10000&mimetype=application/octet-stream'
//         },
//         {
//             'test': /\.svg(\?v=\d+\.\d+\.\d+)?$/,
//             'loader': 'url-loader?limit=10000&mimetype=image/svg+xml'
//         }
//     ] },
//     'resolve': {
//         'extensions': ['.js', '.jsx', '.json'],
//         'modules': [
//             path.resolve('./'),
//             'node_modules'
//         ],
//         'alias': {
//             '@babel/runtime': path.resolve(__dirname, 'node_modules/@babel/runtime'),

//             // Remove dupes
//             'react': path.resolve(__dirname, 'node_modules/react'),
//             'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
//             'prop-types': path.resolve(__dirname, 'node_modules/prop-types'),
//             'immutability-helper': path.resolve(__dirname, 'node_modules/immutability-helper'),
//             'scheduler': path.resolve(__dirname, 'node_modules/scheduler'),
//             'hoist-non-react-statics': path.resolve(__dirname, 'node_modules/hoist-non-react-statics'),
//             'classnames': path.resolve(__dirname, 'node_modules/classnames'),
//             'lodash': path.resolve(__dirname, 'node_modules/lodash'),
//             'warning': path.resolve(__dirname, 'node_modules/warning'),
//             'date-fns': path.resolve(__dirname, 'node_modules/date-fns'),
//             'lodash': path.resolve(__dirname, 'node_modules/lodash-es')
//         }
//     },
//     'plugins': [
//         new webpack.DefinePlugin({
//             'process.env': {
//                 'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
//             },
//             'API_URL': JSON.stringify(API_URL),
//             'WS_URL': JSON.stringify(WS_URL),
//             'CORS_CREDENTIALS': !!process.env.CORS_CREDENTIALS
//         }),
//         new ExtractTextPlugin({
//             // 'filename': '[name].[contenthash].css'
//             'filename': 'css/[name].css',
//             // 'disable': !process.env.WEBPACK_ANALYZER// && process.env.NODE_ENV !== 'production'
//         }),
//         // new CopyWebpackPlugin([
//         //     { from: 'src/html', to: '.' }
//         // ]),
//         // new OfflinePlugin({
//         //     AppCache: false,
//         //     ServiceWorker: { events: true },
//         // }),
//         new BundleAnalyzerPlugin({
//             'analyzerHost': '0.0.0.0',
//             'analyzerPort': 3000,
//             'analyzerMode': (process.env.WEBPACK_ANALYZER) ? 'server' : 'disabled'
//         }),
//         new UnusedWebpackPlugin({
//             directories: [path.join(__dirname, 'src')],
//             exclude: ['*.test.js']
//         }),
//         new DuplicatePackageCheckerPlugin(),
//         // new webpack.NamedModulesPlugin()
//     ].concat(forProd([
//         // new PurifyCSSPlugin({
//         //     'verbose': true,
//         //     'paths': globAll.sync([
//         //         path.join(__dirname, 'dist/*.html'),
//         //         path.join(__dirname, 'src/**/*.js')
//         //     ]),
//         //     'moduleExtensions': ['.js'],
//         //     'minimize': true
//         // }),
//         // new webpack.optimize.ModuleConcatenationPlugin(),
//         new UnminifiedWebpackPlugin(),
//         new MinifyPlugin({}, {
//             test: /\.min\.js$/
//         }),
//         new CompressionPlugin({
//             'asset': '[path].gz[query]',
//             'algorithm': 'gzip',
//             'test': /\.min.js$|\.min.css$/,
//             'threshold': 10240,
//             'minRatio': 0.8
//         })
//     ], [])),
//     'externals': {
//         'window': 'window',
//         'location': 'location'
//     },
//     'devtool': 'source-map',
//     'devServer': {
//         disableHostCheck: true,
//         hot: false,
//         inline: false
//     }
// };
