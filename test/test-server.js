const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const request = require('chai');
const should = chai.should();
chai.use(chaiHttp);

// POST test to /api/users
describe('API POST TEST in APP', function() {
describe('POST endpoint', function createNewUser() {
  it('should respond with redirect on post', function(done) {
    request(app)
      .post('/api/users')
      .send({"EmailAddress":{"EmailAddress":"new@email.com"}})
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) done(err);
        res.body.should.have.property('EmailAddress');
        res.body.participant.should.have.property('EmailAddress', 'new@email.com');

         });
done(); 
});
})
})