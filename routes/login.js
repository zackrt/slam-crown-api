var express = require('express');
var router = express.Router();
const { User } = require('../models/SlamCrownUsers');
const passport = require('passport');
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Slam Crown Login page' })
    .status(200);
});
router.post('/', (req, res) => {
  let {password, emailAddress} = req.body;
  const requiredFields = [ 'password', 'emailAddress' ];
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
module.exports = router;