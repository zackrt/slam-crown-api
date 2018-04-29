import { model } from 'mongoose';

'use strict';
const { Strategy: LocalStrategy, ExtractJwt } = require('passport-local');

const { User } = require('../models/users');
const { JWT_SECRET } = require('../config');

const LocalStrategy = new LocalStrategy({usernameField: 'EmailAddress'}, (EmailAddress, password, callback) => {
    let user;
    User.findOne({ EmailAddress })
        .then(_user => {
            user = _user;
            if (!user) {
        // Return a rejected promise so we break out of the chain of .thens.
        // Any errors like this will be handled in the catch block.
                return Promise.reject({
                    reason: 'LoginError',
                    message: 'Incorrect email address or password'
                });
            }
        })
        .then(isValid => {
            if (!isValid) {
                return Promise.reject({
                    reason: 'LoginError',
                    message: 'Incorrect email address or password'
                });
            }
            return callback(null, user);
        })
        .catch(err => {
            if (err.reason === 'LoginError') {
                return callback(null,false, err);   
            }
            return callback(err,false);
        });
});

const jwtStrategy = new JwtStrategy (
    {
        secretOrKey: JWT_SECRET,
        // Look for the JWT as a Bearer auth header
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),

        algorithms: ['HS256']
    },
    (payload, done) => {
        done(null, payload.user);
    }
);
module.exports = { localStrategy, jwtStrategy };