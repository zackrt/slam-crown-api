var express = require('express');
var router = express.Router();
const { SlamCrownUser } = require('../models/SlamCrownUsers');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const passport = require('passport');


router.get('/', bodyParser, function(req, res, next) {
  res.render('login', { title: 'Slam Crown Login' });
});
router.post('/', bodyParser, function(res, req) {
  let {password, EmailAddress} = req.body;
  res.body
});

module.exports = router;