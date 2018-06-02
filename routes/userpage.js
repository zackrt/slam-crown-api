/* endpoint for SlamCrownUsers */
var express = require('express');
var router = express.Router();
const { User } = require('../models/SlamCrownUsers');
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false });
/* need json or bodyparser? */
console.log(jwtAuth,"jwt");
//take the user's inputs "EmailAddress & hashed password, return/render their userpage"
router.get('/', jwtAuth,(req, res, next) => {
    const id = req.user.EmailAddress;
        User.find(id)
        .then(user =>{
        res.status(200)
        .send('Welcome to the Slam Crown User Page');
        }).catch(
        res.sendStatus(401)
        )
});
//delete user
router.delete('/', jwtAuth, (req, res) => {
    //console.log('req in userpage.js router', req);
    try {
        User.deleteOne({EmailAddress: req.body.EmailAddress}).then(users => {
        res.status(204);
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