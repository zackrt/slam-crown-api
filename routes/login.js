var express = require('express');
var router = express.Router();
const { SlamCrownUser } = require('../models/SlamCrownUsers');

const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false });

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Slam Crown Login' });
});
router.post('/', function(res, req) {
  let {password, EmailAddress} = req.body;
  res.body
});

module.exports = router;