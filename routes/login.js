var express = require('express');
var router = express.Router();
const { User } = require('../models/SlamCrownUsers');
const passport = require('passport');
const { jwtStrategy, localStrategy, generateToken } = require('../auth/strategies');

router.get('/', function(req, res, next) {
  res.status(200)
  .send('Welcome to the Slam Crown Login page');
});

router.post('/', function (req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    console.log(err,user,info);
    if (err) { return res.status(400).json(err); }
    if (!user) { return res.status(400).json(err)}
    res.status(200).json({token: generateToken(user)});
  })(req, res, next);
});

module.exports = router;