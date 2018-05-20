var express = require('express');
var router = express.Router();
const { User } = require('../models/SlamCrownUsers');
const passport = require('passport');

router.get('/', function(req, res, next) {
  res.status(200)
  .send('Welcome to the Slam Crown Login page');
});
router.post('/', function (req, res, next) {
  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err || !user) {
      console.log(err, res);
      return res.status(400).json({
        message: 'Something is not right',
        user   : user
      });
    }
    req.login(user, {session: false}, (err) => {
      if (err) {
        console.log(res);
        res.send(err);
      }
      // generate a signed json web token with the contents of user object and return it in the response
      const token = jwt.sign({user}, 'your_jwt_secret');
      return res.json({user, token});
    });
  })(req, res, next);
});
module.exports = router;