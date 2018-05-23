/* endpoint for SlamCrownUsers */
var express = require('express');
var router = express.Router();
const { User } = require('../models/SlamCrownUsers');
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false });
/* need json or bodyparser? */
console.log(jwtAuth,"jwt");

router.get('/', jwtAuth,(req, res) => {
    res.status(200)
    .send('Welcome to the Slam Crown User Page');
});

router.post('/', jwtAuth,(req, res) => {
//   let user;
//   try {
//       User.create({EmailAddress: req.body.EmailAddress}).then(user => {
//           res.status(201).json({user:user.serialize()})
//     })
//   } catch(err) {
//       res.json({err})
//   }
});
//delete SlamCrownUser account
router.delete('/', jwtAuth, (req, res) => {
    console.log('req in userpage.js router', req);
    try {
        User.deleteOne({EmailAddress: req.body.EmailAddress}).then(users => {
        res.status(200).json({ message: "Your Slam Crown Account was deleted!" })
    }) 
    } catch (e) {
        res.status(500).json({ message: 'Internal server error, account cannot deleted' });
    }
});
//update account 
router.put('/', jwtAuth,(req, res) =>{
    try {
        User.findOneAndUpdate(
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