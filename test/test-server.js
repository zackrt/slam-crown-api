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
  password:'abcdefg',
  painLevel:1,
  othersymptoms:'',
  selectedSymptoms:''
};
// api/users = sign-up, api/auth = login, api/userspage = userpage w/ jwt
function seedUserData() {
      return chai.request(app)
      .post('/api/users')
      .send(
      newUser
      )
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

describe('/api/users GET endpoint', function getUsers() {
  it('should list slamcrown users on GET', function() {
    return chai.request(app)
      .get('/api/users')
      .then(function(res) {
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
      console.log(res.body);
      expect(res).to.have.status(201);
      expect(res).to.be.json;
    });
  });
});

describe('/api/auth GET endpoint', function userLogin() {
  it('should respond with 200 status', function() {
    return chai.request(app)
      .get('/api/auth')
      .then(function(res) {
        expect(res).to.have.status(200);
      });
  });
});
describe('api/auth POST endpoint', function() {
  it('should respond with a 200 status', function() {
    return chai.request(app)
      .post('/api/auth')
      .send(newUser)
      .then(function(res) {
        expect(res).to.be.json;
        expect(res).to.have.status(200);
      });
    });
  });
describe('/api/userpage GET to Login route endpoint', function(){
  it('GET should respond with a 200 status', function() {
    return chai.request(app)
      .get('/api/auth')
      .then(function(res) {
        expect(res).to.have.status(200);
      });
  });
});

describe('api/userpage GET endpoint', function userLogin() {
    it('GET should respond with 401 status', function() {
      return chai.request(app)
      .get('/api/userpage')
      .then(function(res) {
         // console.log(res.body);
          expect(res).to.have.status(401);
      });
    });

    it('POST to /api/auth Login.js, then GET to /api/userpager should respond with 200 status', function() {
      return chai.request(app)
      .post('/api/auth')
      .send(newUser)
      .then(function(res){
        //console.log('THIS IS THE NEW USER',newUser);
        expect(res.body).to.not.be.null;
        //need to get token and set the headers 
        expect(res).to.have.status(200);
        const token = res.body.token;
        //we have the token now
        expect(token).to.not.be.null;
        return chai.request(app)
          .get('/api/userpage')
          .set('Authorization','Bearer '+ token)
            .then(res => {
              //console.log(res,'Get res')
              expect(res).to.have.status(200)
            })
      })
    });
});
   describe('/api/userreporthistory, GET endpoint', function(){
     it('should post to api/auth, login, then get to api/userreporthistory with a 200', function(){
      return chai.request(app)
      .post('/api/auth')
      .send(newUser)
      .then(function(res){
        //console.log('THIS IS THE NEW USER',newUser);
        expect(res.body).to.not.be.null;
        //need to get token and set the headers 
        expect(res).to.have.status(200);
        const token = res.body.token;
      })
       console.log(token, 'token in userreporthistory')
       return chai.request(app)
        .get('/api/userreporthistory')
        .set('Authorization','Bearer '+ token)
        .send(newUser)
        .then(function(res){
          expect(res).to.have.status(200);
        })
     })
describe('api/userpage PUT endpoint', function () {
  it('should POST to api/auth then api/userpage PUT endpoint with a 200', function() {
     return chai.request(app)
      .post('/api/auth')
      .send(newUser)
      .then(function(res){
        //console.log('THIS IS THE NEW USER',newUser);
        expect(res.body).to.not.be.null;
        //need to get token and set the headers 
        expect(res).to.have.status(200);
        const token = res.body.token;
        expect(token).to.not.be.null;
        return chai.request(app)
          .put('/api/userpage')
          .set('Authorization','Bearer '+ token)
            .then(res =>{
              //console.log(res, "this is the PUT res")
              expect(res).to.be.json;
              expect(res).to.have.status(200);
            });
      });
  });
})
})
});