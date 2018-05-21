'use strict';
const mongoose = require ('mongoose');
const { Strategy: LocalStrat } = require('passport-local');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const { User } = require('../models/SlamCrownUsers');
const { JWT_SECRET } = require('../config');


const localStrategy = new LocalStrat({usernameField: 'emailAddress', passwordField: 'password'}, (emailAddress, password, callback) => {
    console.log(emailAddress, password, callback);
    User.findOne({ emailAddress: emailAddress })
        .then(user => {
            console.log(user);
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
const jwtStrategy = new JWTStrategy(
    {
      secretOrKey: JWT_SECRET,
      // Look for the JWT as a Bearer auth header
      jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('Bearer'),
      // Only allow HS256 tokens - the same as the ones we issue
      algorithms: ['HS256']
    },
    (payload, done) => {
      done(null, payload.user);
    }
  );
module.exports = { localStrategy, jwtStrategy };