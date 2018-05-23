const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { app, runServer, closeServer } = require('../app');
const request = require('chai').request;
const { TEST_DATABASE_URL } = require('../config');
const expect = require('chai').expect;
const { User } = require('../models/SlamCrownUsers')
chai.use(chaiHttp);
// beforeeach seed data, afterEach for dropdatabse to have clean data, and 
// before : connecting to database, after closing the server
// POST test to /api/users
const newUser = {
  emailAddress:'new@email.com',
  dateOfConcussion:'05-05-2018',
  password:'abcdefg'
};
function generateUserData() {
const newUser = {
  emailAddress:'new@email.com',
  dateOfConcussion:'05-05-2018',
  password:'abcdefg'
};
return newUser;
}
function seedUserData() {
  console.info('seeding slam crown user data');
  const seedData = [];

  for (let i=1; i<=10; i++) {
    seedData.push(generateUserData());
  }
  // this will return a promise
  return User.insertMany(seedData);
}

function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}
describe('API POST TEST in APP.JS', function() {
    before(function() {
    // runs before each test in this block
      return runServer(TEST_DATABASE_URL);
    });
    beforeEach(function() {
      return seedUserData();
    });
  
    afterEach(function() {
      return tearDownDb();
    });
  
    after(function() {
      // runs after each test in this block
      return closeServer();
    });
    // test cases, need to fix respond 
describe('/api/users GET endpoint', function getUsers() {
  it('should list slamcrown users on GET', function() {
    return chai.request(app)
      .get('/api/users')
      .then(function(res) {
        console.log(res.body);
        expect(res).to.have.status(200);
      });
  });     
});    

describe('/api/users POST endpoint', function createNewUser() {
  it('should respond with 201, create a new user, emailAddress:new@email.com and redirect on post', function() {
    return chai.request(app)
    .post('/api/users')
    .send(newUser)
    .then(function(res){
     //console.log(res, 'This is the res');
      expect(res).to.have.status(201);
      // expect(res).to.be.json;
    });
    // .then(() => done(), done);
  });
});

describe('/api/auth GET endpoint', function userLogin() {
  it('should respond with 200 status', function() {
    return chai.request(app)
      .get('/api/auth')
      .then(function(res) {
        console.log(res.body);
        expect(res).to.have.status(200);

      });
  });
});

describe('api/auth POST endpoint', function userLogin() {
  it('should respond with a 201 status', function() {
    return chai.request(app)
      .post('/api/auth')
      .send({
        "emailAddress": "aa",
        "password": "abcdef"
      })
      .then(function(res) {
        //console.log(res.body);
        expect(res).to.be.json;

      });
    });
  });
describe('/api/userpage Get endpoint', function userLogin(){
  it('should respond with a 201 status', function() {
    return chai.request(app)
      .get('/api/auth')
      .then(function(res) {
        
        expect(res).to.have.status(200);
      });
  });
});
describe('api/userpage POST endpoint', function userLogin() {
  it('should respond with a json', function() {
    return chai.request(app)
      .post('/api/userpage')
      .send({
        "emailAddress": "aa",
        "password": "abcdef"
      })
      .then(function(res) {
        console.log(res.body);
        expect(res).to.be.json;

      });
  });
});
});