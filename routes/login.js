var express = require('express');
var router = express.Router();
const { User } = require('../models/SlamCrownUsers');
const passport = require('passport');
var local = require('../auth/strategies');

router.get('/', function(req, res, next) {
  res.status(200)
  .send('Welcome to the Slam Crown Login page');
});
router.post('/', function (req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return res.status(400).json(err); }
    if (!user) { return res.status(400).json(err)}
    res.json({token: 'fake token'});
  })(req, res, next);

});

module.exports = router;