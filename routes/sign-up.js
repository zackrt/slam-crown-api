var express = require('express');
var router = express.Router();
const { SlamCrownUser } = require('../models/SlamCrownUsers');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Slam Crown Sign-up page');
});
/* 
needs router.post for EmailAddress, hashed password, and date of concussion 
*/
router.get ('/', function (req, res) {
    SlamCrownUser
});
router.post('/', jwtAuth, function (req, res) {
  let RequiredFields = {EmailAddress, password}
  try {
    SlamCrownUser.create({EmailAddress: req.body.EmailAddress}).then(user => {
        res.status(201).json({user:user.serialize()})
  });
     } catch(err) {
            res.json({err})
     };
});

module.exports = router;