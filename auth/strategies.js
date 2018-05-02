'use strict';
const mongoose = require ('mongoose');
const { Strategy: LocalStrat, ExtractJwt } = require('passport-local');
const passportJWT = require("passport-jwt");
const jwtStrategy =  require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const { User } = require('../models/SlamCrownUsers');
const { JWT_SECRET } = require('../config');


const localStrategy = new LocalStrat({usernameField: 'emailAddress', passwordField: 'password'}, (email, password, callback) => {
    User.findOne({ emailAddress: email })
        .then(user => {
            if (!user || !user.validatePassword(password)) {
        // Return a rejected promise so we break out of the chain of .thens.
        // Any errors like this will be handled in the catch block.
                return callback({
                    reason: 'LoginError',
                    message: 'Incorrect email address or password'
                });
            }
            callback(null, user);
        })
        .catch(err => {
            return callback(err);
        });
});
//passport.js
// const passport = require('passport’);
// const LocalStrategy = require('passport-local').Strategy;
// these are passed into the body
// passport.use(new LocalStrategy({
//         usernameField: 'emailAddress',
//         passwordField: 'password'
//     }, 
//     function (email, password, cb) {
//         //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
//         return UserModel.findOne({email, password})
//            .then(user => {
//                if (!user) {
//                    return cb(null, false, {message: 'Incorrect email or password.'});
//                }
//                return cb(null, user, {message: 'Logged In Successfully'});
//           })
//           .catch(err => cb(err));
//     }
// ));

module.exports = { localStrategy, jwtStrategy };