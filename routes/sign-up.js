var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const { User } = require('../models/SlamCrownUsers');
/* GET users listing. to render the page */
router.get('/', function(req, res, next) {
  res.send('Slam Crown Sign-up page');
});
/* 
needs router.post for EmailAddress, hashed password, and date of concussion 
 create a new user*/
router.post('/', bodyparser, function (req, res) {
  let RequiredFields = {EmailAddress, password}
  try {
    User.create({EmailAddress: req.body.EmailAddress}).then(user => {
        res.status(201).json({user:user.serialize()})
  });
     } catch(err) {
            res.json({err})
     };
});

module.exports = router;