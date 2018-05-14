var express = require('express');
var router = express.Router();
const { User } = require('../models/SlamCrownUsers');
/* GET users listing. to render the page */
router.get('/', function(req, res, next) {
  res
  .status(200)
  .send('welcome to the Slam Crown Sign-up page');
});
/* 
needs router.post for EmailAddress, hashed password, and date of concussion 
 create a new user*/
 router.post('/', function(req, res) {
   let user;
   let {password, emailAddress, dateOfConcussion} = req.body;
  const requiredFields = [ 'password', 'emailAddress', 'dateOfConcussion' ];
    for (let i=0; i<requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`
        return res.status(400).send(message);
      }
    }
    console.log(req.body);
    return User.create({
      emailAddress: req.body.emailAddress,
      password: req.body.password,
      dateOfConcussion: req.body.dateOfConcussion
      })
      .then(user => {
        return res
          .status(201)
          .send(`Slam Crown User \`${user}\`Created`)
          .json({user:user.serialize()});
      })
      .catch(err => {
            res.json({err});
      });
  })
module.exports = router;