import mongoose, { Schema } from 'mongoose';

const User = new Schema({
    name: {
        type: String,
        optional: false
    },
    email: {
        type: String,
        optional: false,
        unique: true
    },
    password: {
        type: String
    },
    roles: [String]
}, { strict: false });


User.methods.authenticate = function authenticate(password) {
    return this.password === password; // TODO Obviously we want some hashing goodness going on here
};

mongoose.model('User', User);
export default User;
