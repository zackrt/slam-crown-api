const chai = require('chai');
const chaiHttp = require('chai-http');
const { app, runServer, closeServer } = require('../app');
const router = require ('../routes/sign-up')
const request = require('chai').request;
const { DATABASE_URL } = require('../config');
const expect = require('chai').expect;
chai.use(chaiHttp);


// POST test to /api/users
describe('API POST TEST in APP', function() {
    beforeEach(function() {
      // runs before each test in this block
      return runServer(DATABASE_URL);
    });
  
    afterEach(function() {
      // runs after each test in this block
      return closeServer();
    });
  
    // test cases, need to fix respond 
describe('/api/users POST endpoint', function createNewUser() {
  let res;
  const newUser = {
    emailAddress:'new@email.com',
    dateOfConcussion:'05-05-2018',
    password:'abcdefg'
  };
  it('should respond with 201, create a new user, emailAddress:new@email.com and redirect on post', function(done) {
    console.log(res, 'This is the res');
    return chai.request(router)
    .post('/routes/sign-up/api/users')
    .send(newUser)
    .then(function(res){
      expect(res).to.have.status(201);
      expect(res).to.be.json;
      done();
    }); 
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