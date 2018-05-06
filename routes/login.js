var express = require('express');
var loginRouter = express.Router();
const { User } = require('../models/SlamCrownUsers');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const passport = require('passport');

loginRouter.get('/', jsonParser, function(req, res, next) {
  res.render('login', { title: 'Slam Crown Login' })
    .status(200);
});
loginRouter.post('/', jsonParser, (req, res) => {
  let {password, EmailAddress} = req.body;
  const requiredFields = [ 'password', 'EmailAddress' ];
  const missingField = requiredFields.find(field => !(field in req.body));
  if (missingField) {
    console.log('missing entity field');
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Missing field',
      location: missingField
    });
  }
});

module.exports = loginRouter;