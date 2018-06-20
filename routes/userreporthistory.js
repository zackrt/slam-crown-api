var express = require('express');
var router = express.Router();
const { User } = require('../models/SlamCrownUsers');
const passport = require('passport');
const jwt = require('express-jwt');
const {JWT_SECRET} = require('../config');
//const jwtAuth = passport.authenticate('jwt', { session: false });
const jwtAuth = jwt({
    secret:JWT_SECRET,
    getToken: function fromHeaderOrQuerystring (req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            console.log(req.headers.authorization.split(' '), "TOKEN");
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
          return req.query.token;
        }
        return null;
      }
});
/* retrieve user's past responses and return in table format */
router.get('/', jwtAuth, function (req, res) {
    return res
        .status(200)
        .send('Past Report History');
});

module.exports = router;