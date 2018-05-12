var express = require('express');
var slamCrownUsersRouter = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const { User } = require('../models/SlamCrownUsers');
/* GET users listing. to render the page */
slamCrownUsersRouter.get('/', function(req, res, next) {
  res
  .status(200)
  .send('welcome to the Slam Crown Sign-up page');
});
console.log(jsonParser, 'jsonParser');
/* 
needs router.post for EmailAddress, hashed password, and date of concussion 
 create a new user*/
 slamCrownUsersRouter.post('/', jsonParser, function(req, res) {
   console.log('?');
  const requiredFields = [ 'emailAddress', 'password', 'dateOfConcussion' ];
    for (let i=0; i<requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`
        console.error(message);
        return res.status(400).send(message);
      }
    }
  try {
    User.create({emailAddress: req.body.emailAddress}).then(user => {
        res
          .status(201)
          .send(`Slam Crown User \`${use}\`Created`)
          .json({user:user.serialize()});
      console.log(user, 'user in sign-up.js');
  });
     } catch(err) {
            res.json({err})
     };
  })

module.exports = slamCrownUsersRouter;