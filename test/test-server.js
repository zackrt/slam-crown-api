const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const request = require('chai').request;
const should = chai.should();
chai.use(chaiHttp);

// POST test to /api/users
describe('API POST TEST in APP', function() {
describe('POST endpoint', function createNewUser() {
  const newUser = {
    EmailAddress:'new@email.com',
    password:'abcd'
  };
  it('should respond with 200 and redirect on post', function(done) {
    return chai.request(app)
    .post('/api/users')
    .send(newUser)
    .then(function(res) {({"EmailAddress":{"emailAddress":"new@email.com"}})
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) done(err);
        res.body.should.have.property('emailAddress');
        res.body.emailAddress.should.have.property('emailAddress', 'new@email.com');
         });
    setTimeout(done, 300);
    });
  });
});
describe('login POST endpoint', function() {
  const newUser = {
    EmailAddress:'new@email.com',
    password:'abcd'
  };
  it('should respond with 201 and redirect on post', function() {
    return chai.request(app)
    .post('/api/login')
    .send(newUser)
    .then(function(res) {({"EmailAddress":{"emailAddress":"new@email.com"}})
      .expect(201)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) done(err);
        res.body.should.have.property('emailAddress');
        res.body.emailAddress.should.have.property('emailAddress', 'new@email.com');
         });
    setTimeout(done, 300); 
});
});
});
})