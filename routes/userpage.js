/* endpoint for SlamCrownUsers */
var express = require('express');
var router = express.Router();
const { User } = require('../models/SlamCrownUsers');
const passport = require('passport');
const jwt = require('express-jwt');
const {JWT_SECRET} = require('../config');
const jwtAuth = jwt({
    secret:JWT_SECRET,
    getToken: function fromHeaderOrQuerystring (req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            console.log(req.headers.authorization.split(' '), "TOKEN");
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
          return req.query.token;
        }
        return null;
      }
});
/* need json or bodyparser? */
//console.log(jwtAuth,"jwt");
//take the user's inputs "EmailAddress & hashed password, return/render their userpage"
//passport.jwt
router.get('/',jwtAuth, (req, res, next) => {
    const emailAddress = req.user.emailAddress;
        User.findOne({emailAddress})
        .then(user =>{
          return res.status(200)
        .json(user.serialize());
        }).catch(err => {
          return res.status(404).json(err);
        })
});
//delete user
router.delete('/', jwtAuth, (req, res, next) => {
    //console.log('req in userpage.js router', req);
   // can use sendStatus(204)
    console.error.log(req.user, 'in delete endpoint')
    User.deleteOne({EmailAddress: req.user.EmailAddress})
        .then(users => {
            console.log(res, 'in delete endpoint');
            res.status(204);
        })
        .catch (
            res.status(500).json({ message: 'Internal server error, account cannot deleted' })
        )
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