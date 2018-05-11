var express = require('express');
var slamCrownUsersRouter = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const { User } = require('../models/SlamCrownUsers');
/* GET users listing. to render the page */
slamCrownUsersRouter.get('/', function(req, res, next) {
  res.send('Slam Crown Sign-up page');
});
console.log(jsonParser, 'jsonParser');
/* 
needs router.post for EmailAddress, hashed password, and date of concussion 
 create a new user*/
 slamCrownUsersRouter.post('/', jsonParser, function (req, res) {
  let RequiredFields = {emailAddress, password};
  try {
    User.create({emailAddress: req.body.emailAddress}).then(user => {
        res.status(201).json({user:user.serialize()})
      console.log(user, 'user in sign-up.js');
  });
     } catch(err) {
            res.json({err})
     };
  })

module.exports = slamCrownUsersRouter;