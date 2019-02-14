import passport from 'passport';
import { Strategy } from 'passport-local';
import mongoose from 'mongoose';

const User = mongoose.model('User');

export default function local() {
    // Use local strategy
    passport.use(new Strategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        (email, password, done) => {
            User.findOne({
                email
            }, (err, user) => {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {
                        message: 'Unknown user or invalid password'
                    });
                }
                if (!user.authenticate(password)) {
                    return done(null, false, {
                        message: 'Unknown user or invalid password'
                    });
                }

                return done(null, user);
            });
        }
    ));
}
