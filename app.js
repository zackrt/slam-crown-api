
const express = require('express');
const mongoose = require ('mongoose');
mongoose.Promise = global.Promise;
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const User = require('./models/SlamCrownUsers');
const router = require('./routes/login');
const slamCrownUsersRouter = require('./routes/sign-up');
const { DATABASE_URL, PORT, CLIENT_ORIGIN } = require ('./config');
const jwt = require('jsonwebtoken');
const { localStrategy, jwtStrategy } = require('./auth/strategies');
// const {API_BASE_URL} = require('./config');

// export const fetchUserProfile = (userid) => dispatch => {
//     fetch(`${API_BASE_URL}/users/${userId}`).then(res => {
//         if (!res.ok) {
//             return Promise.reject(res.statusText);
//         }
//         return res.json();
//     }).then(userProfile => {
//         dispatch(fetchUserProfileSuccess(userProfile));
//     }).catch(err => dispatch(fetchUserProfileError(err)));
// };
passport.use(localStrategy);
app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/router', router);
app.use('/slamCrownUserRouter', slamCrownUsersRouter);
// parse application/ jsonParser

// POST- /api/users to create a new user, no auth needed
// PUT - /api/users/:id to update, and change their email, and date of concussion 
// DELETE - /api/users/:id delete id user, response that account is deleted

app.post('/api/users', (req,res) => {
  let document;
  const requiredFields = [ 'emailAddress' , 'password', 'dateOfConcussion'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      return res.status(400).send(message);
    }
  }
  //THROWING TypeError: User.hashPassword is not a function, using bcrypt, changing it password.hashSync threw a reference error!
  const user = {
    emailAddress:req.body.emailAddress,
    password:User.hashSync(req.body.password),
    dateOfConcussion:req.body.dateOfConcussion
  }
  return User.create(user)
  .then(function(document){
    console.log('this is the document', document);
    res.status(201).json(document.serialize());
  })
  .catch(function(error) {
    res.status(404).json({error:error});
  })      
});
// app.post('/api/test/:id', (req, res) => {
  //     console.log(req.body, req.params);
  //     res.json({body:res.body, params: res.params, query: req.query});
  
  //     // 3 things from req.  
  //     //   req.body -used in postman or submitted in form data, passing in emailAddress and password
  //     //   req.params - endpoint related, every :id object of that specific id would be req.params
  //     //   req.query - query string usually used in get request. ?x=1&y=2 can be add to the end of url, the left of equals is the keys, right is the values, they are split by the &
  
  // })
  app.post('/api/login', function (req, res, next) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
      if (err || !user) {
        console.log(err);
        return res.status(400).json({
          message: 'Something is not right',
          user   : user
        });
      }
      req.login(user, {session: false}, (err) => {
        if (err) {
          res.send(err);
        }
        // generate a signed json web token with the contents of user object and return it in the response
        const token = jwt.sign({user}, 'your_jwt_secret');
        return res.json({user, token});
      });
    })(req, res, next);
  });
  
  let server;
  
  // this function starts our server and returns a Promise.
  // In our test code, we need a way of asynchronously starting
  // our server, since we'll be dealing with promises there.
  function runServer(databaseUrl = DATABASE_URL, port = PORT) {
    return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
        if(err) {
          return reject(err);
        }
        server = app.listen(port,()=> {
          console.log(`Your app is listening on port ${port}`);
          resolve();
        })
          .on('error', err => {
            mongoose.disconnect();
            reject(err);
          });
    });
  });
}
// like `runServer`, this function also needs to return a promise.
// `server.close` does not return a promise on its own, so we manually
// create one.
function closeServer() {
  return mongoose.disconnect().then(() => {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        return reject(err);
      }
      resolve();
      });
    });
  });
}
// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer().catch(err => console.error(err));
};

//app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = {app, runServer, closeServer};