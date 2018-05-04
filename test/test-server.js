const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const should = chai.should();
chai.use(chaiHttp);

describe('POST endpoint', function createNewUser() {
  it('should create a new user', function () {
    // strategy:   1. make POST to `/api/users`
    //    2. prove res has right status 201, data type
    //    3. prove the new user was created
    let res;
    let user;
    let newUser = {
      password: 'asdfjkl',
      EmailAddress: 'mocha@slam-crown.com'
    }
    return chai.request(app)
      .post('/api/users')
      .send(newUser)
      .then(res => {
        (res).should.have.status(201);
        (res.body).should.be.an('object');
        (res.body).should.to.include.keys(
          'id','EmailAddress');
        (res.body.EmailAddress).should.to.equal(newUser.EmailAddress);
        // cause Mongo should have created id on insertion
        (res.body.id).should.not.be.null;
        return User.findById(res.body.id);
      })
      .then(user => {
        (user.EmailAddress).should.to.equal(newUser.EmailAddress);
      })      
  });
})