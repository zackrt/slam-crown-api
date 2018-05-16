const chai = require('chai');
const chaiHttp = require('chai-http');
const { app, runServer, closeServer } = require('../app');
const request = require('chai').request;
const { TEST_DATABASE_URL } = require('../config');
const expect = require('chai').expect;
chai.use(chaiHttp);
// beforeeach seed data, afterEach for dropdatabse to have clean data, and 
// before : connecting to database, after closing the server
// POST test to /api/users
describe('API POST TEST in APP', function() {
  const newUser = {
    emailAddress:'new@email.com',
    dateOfConcussion:'05-05-2018',
    password:'abcdefg'
  };
    before(function() {
    // runs before each test in this block
      return runServer(TEST_DATABASE_URL);
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
  it('should respond with 201, create a new user, emailAddress:new@email.com and redirect on post', function(done) {
    return chai.request(app)
    .post('/api/users')
    .send(newUser)
    .then(function(res){
     //console.log(res, 'This is the res');
      expect(res).to.have.status(201);
      // expect(res).to.be.json;
    })
    .then(() => done(), done);
  });
});
// describe('login POST endpoint', function() {
//   const newUser = {
//     EmailAddress:'new@email.com',
//     password:'abcd'
//   };
//   xit('should respond with 201 and redirect on post', function() {
//     return chai.request(app)
//     .post('/api/login')
//     .send(newUser)
//     .then(function(res) {({"EmailAddress":{"emailAddress":"new@email.com"}})
//       .expect(201)
//       .expect('Content-Type', /json/)
//       .end(function(err, res) {
//         if (err) done(err);
//         res.body.should.have.property('emailAddress');
//         res.body.emailAddress.should.have.property('emailAddress', 'new@email.com');
//          });
     //setTimeout(done, 300); 
});