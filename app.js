const mongoose = require ('mongoose');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const { User } = require('./models/SlamCrownUsers');
const { DATABASE_URL, PORT, CLIENT_ORIGIN } = require ('./config');

mongoose.connect(DATABASE_URL)


app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//app.get('/api/*', (req, res) => {
//  res.json({ok: true});
//});

// POST- /api/users to create a new user, no auth needed
// PUT - /api/users/:id to update, and change their email, and date of concussion 
// DELETE - /api/users/:id delete id user, response that account is deleted

app.post('/api/users', (req,res) => {
    const requiredFields = [ 'emailAddress' , 'password', 'dateOfConcussion'];
    for (let i=0; i<requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
          const message = `Missing \`${field}\` in request body`

          return res.status(400).send(message);
        }
      }
      const user = {
          emailAddress:req.body.emailAddress,
          dateOfConcussion:req.body.dateOfConcussion,
          password:User.hashPassword(req.body.password)
        } 
    User.create(user)
      .then(function(document){
        res.status(201).json(document.serialize());
        })
        .catch(function(error) {
        res.status(404).json({error:error});
        })      
});
app.post('/api/test/:id', (req, res) => {
    console.log(req.body, req.params);
    res.json({body:res.body, params: res.params, query: req.query});

    // 3 things from req.  
    //   req.body -used in postman or submitted in form data, passing in email and password
    //   req.params - endpoint related, every :id object of that specific id would be req.params
    //   req.query - query string usually used in get request. ?x=1&y=2 can be add to the end of url, the left of equals is the keys, right is the values, they are split by the &
    
})
app.post('/api/login', (req,res) => {
    // 
    //
    //

    res.json({
        token:"bearer auth"
    })
})
// will need jwtAuth
app.put('/api/users/:id', (req,res) => {


    res.json({message:`Updating specific user email and date of Concussion ${req.params.id}`});
        // try {
        //     User.findOneAndUpdate(
        //       {EmailAddress: req.body.EmailAddress},
        //       req.body,
        //       {new: true},
        //       res.status(201),
        //       (err, User) => {
        //         if (err) return res.status(500).send(err);
        //         res.send(User);
        //       })
        // } catch (e) {
        //     res.status(500).json({ message: 'Internal server error, account cannot be updated' });
        // }
    });
// app.delete('/api/:id', jwtAuth, (req, res) => {
//     console.log(req);
//     try {
//         User.deleteOne({EmailAddress: req.body.EmailAddress}).then(users => {
//             res.status(202).json({ message: "Your slam crown account was deleted"})
//         })
//     } catch (e) {
//         res.status(500).json({ message: 'Internal server error, account cannot be deleted' });
//     }
// });

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = app;