var express = require('express');
var router = express.Router();
const { SlamCrownUser } = require('../models/SlamCrownUsers');
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false });
/* retrieve user's past responses and return in table format */


module.exports = router;