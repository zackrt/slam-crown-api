
const express = require('express');
const mongoose = require ('mongoose');
mongoose.Promise = global.Promise;
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const User = require('./models/SlamCrownUsers');
const router = require('./routes/login');
const userRouter = require('./routes/sign-up');
const userPage = require('./routes/userpage');
const userReportHistory = require('./routes/userreporthistory');
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
app.use(cors());
passport.use(localStrategy);
passport.use(jwtStrategy);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/auth', router);
app.use('/api/users', userRouter);
app.use('/api/userpage', userPage);
app.use('/api/userreporthistory', userReportHistory);
// parse application/ jsonParser
// POST- /api/users to create a new user, no auth needed
// PUT - /api/users/:id to update, and change their email, and date of concussion 
// DELETE - /api/users/:id delete id user, response that account is deleted
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
// if app.js is called directly (aka, with `node app.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer().catch(err => console.error(err));
};
module.exports = {app, runServer, closeServer};