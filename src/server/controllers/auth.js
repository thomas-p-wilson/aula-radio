import passport from 'passport';
import mongoose from 'mongoose';

const User = mongoose.model('User');

export function signin(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if (err || !user) {
            return res.status(500).send(info);
        }

        // Remove sensitive data before login
        user.password = undefined;
        user.salt = undefined;


        req.login(user, (err) => {
            if (err) {
                return res.status(400).send(err);
            }
            User.findOne({ _id: user._id }, '-password').exec((err, foundUser) => {
                if (err) {
                    return res.status(400).send(err);
                }
                res.json(foundUser);
            });
        });
    })(req, res, next);
}
