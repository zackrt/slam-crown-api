const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const {app1, runServer, closeServer} = require('../server');
const request = require('chai').request;
const should = chai.should();
chai.use(chaiHttp);

// POST test to /api/users
describe('API POST TEST in APP', function() {

describe('POST endpoint', function createNewUser() {
  const newUser = {
    emailAddress:'new@email.com',
    password:'abcd',
    dateOfConcussion:'05-05-2018'
  };
  it('should respond with 201 and redirect on post', function(done) {
    return chai.request(app)
    .post('/api/users')
    .send(newUser)
    .then(function(res){
      console.log(res);
      expect(res).to.have.status(201);
      expect(res).to.be.json;
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
//     setTimeout(done, 300); 
});
