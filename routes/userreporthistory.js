var express = require('express');
var router = express.Router();
const { SlamCrownUser } = require('../models/SlamCrownUsers');
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false });
/* retrieve user's past responses and return in table format */

router.get('/', function (req, res) {
    res.render('userreporthistory', {title: 'Past Report History'})
        .status(200);
}

module.exports = router;