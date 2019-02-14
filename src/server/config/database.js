import mongoose from 'mongoose';
import chalk from 'chalk';
import path from 'path';
import glob from 'glob';
import config from './config';

const db = mongoose.connect(config.db.uri, config.db.options, (err) => {
    if (err) {
        console.error(chalk.red('Could not connect to MongoDB!'));
        console.log(chalk.red(err));
        throw new Error(err);
    }
});
mongoose.connection.on('error', (err) => {
    console.error(chalk.red(`MongoDB connection error: ${ err }`));
    throw new Error(err);
});

glob.sync(path.resolve(__dirname, '../models/**/*.js'))
    .forEach((modelPath) => {
        require(path.resolve(modelPath)); // eslint-disable-line import/no-dynamic-require, global-require
    });
export default db;
