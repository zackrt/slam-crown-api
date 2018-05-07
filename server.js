const express = require('express');
const morgan = require('morgan');
const loginRouter = require('./routes/login')
const SlamCrownUsersRouter = require('./routes/login')

const app1 = express();

// log the http layer
app1.use(morgan('common'));

app1.use(express.static('public'));

app1.get('/', (req, res) => {
  res.sendFile(__dirname + '/routes/index.html');
});

app1.use('/login', loginRouter);
app1.use('/users', SlamCrownUsersRouter);

function runServer() {
  const port = process.env.PORT || 8080;
  return new Promise((resolve, reject) => {
    app1.listen(port, () => {
      console.log(`Your app is listening on port ${port}`);
      resolve();
    })
    .on('error', err => {
      reject(err);
    });
  });
}
// both runServer and closeServer need to access the same
// server object, so we declare `server` here, and then when
// runServer runs, it assigns a value.
let server;

function runServer() {
  const port = process.env.PORT || 8080;
  return new Promise((resolve, reject) => {
    server = app1.listen(port, () => {
      console.log(`Your app is listening on port ${port}`);
      resolve(server);
    }).on('error', err => {
      reject(err)
    });
  });
}

// like `runServer`, this function also needs to return a promise.
// `server.close` does not return a promise on its own, so we manually
// create one.
function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        reject(err);
        // so we don't also call `resolve()`
        return;
      }
      resolve();
    });
  });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app1, runServer, closeServer};