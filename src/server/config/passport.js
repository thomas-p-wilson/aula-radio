import path from 'path';
import glob from 'glob';
import passport from 'passport';
import mongoose from 'mongoose';

const User = mongoose.model('User');

export default () => {
    // Serialize sessions
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // Deserialize sessions
    passport.deserializeUser((id, done) => {
        User.findOne({ _id: id }, '-password')
            .exec((err, user) => {
                done(err, user);
            });
    });

    // Initialize strategies
    glob.sync(path.resolve(__dirname, 'strategies/**/*.js'))
        .forEach((strategy) => {
            require(path.resolve(strategy))(); // eslint-disable-line global-require, import/no-dynamic-require
        });
};
