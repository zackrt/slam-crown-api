/* GET SlamCrownUsers listing. */
var express = require('express');
var router = express.Router();
const { SlamCrownUser } = require('../models/SlamCrownUsers');
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false });
/* need json or bodyparser? */
router.get('/', jwtAuth,(req, res) => {
  let user;
   console.log('GET THE USER DATA AND SEND IT TO THE PAGE',req.query)
   try {
        SlamCrownUser.findOne({EmailAddress: req.query.EmailAddress}).then(user => {
            res.json({user:user.serialize()})
        })
   } catch(err) {
       res.json({err})
   }
});
router.post('/', jwtAuth,(req, res) => {
  let user;
  try {
      SlamCrownUser.create({EmailAddress: req.body.EmailAddress}).then(user => {
          res.status(201).json({user:user.serialize()})
    })
  } catch(err) {
      res.json({err})
  }
});
//delete SlamCrownUser account
router.delete('/', jwtAuth, (req, res) => {
    console.log(req);
    try {
        SlamCrownUser.deleteOne({EmailAddress: req.body.EmailAddress}).then(users => {
        res.status(200).json({ message: "Your Slam Crown Account was deleted!" })
    }) 
    } catch (e) {
        res.status(500).json({ message: 'Internal server error, account cannot deleted' });
    }
});
//update account 
router.put('/', jwtAuth,(req, res) =>{
    try {
        SlamCrownUser.findOneAndUpdate(
          {EmailAddress: req.body.EmailAddress},
          req.body,
          {new: true},
          (err, newUser) => {
            if (err) return res.status(500).send(err);
            res.send(newUser);
          })
    } catch (e) {
        res.status(500).json({ message: 'Internal server error, account cannot be updated' });
    }
});
module.exports = router;