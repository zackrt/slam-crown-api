const chai = require('chai');
const chaiHttp = require('chai-http');

const {app} = require('../server');

const should = chai.should();
chai.use(chaiHttp);

describe('API', function() {

  it('should 200 on GET requests', function() {
    return chai.request(app)
      .get('/api/fooooo')
      .then(function(res) {
        res.should.have.status(200);
        res.should.be.json;
      });
  });

  describe('POST endpoint', function() {

    it('should create a new slam crown user and return a 201', function() {
      return chai.request(app)
        .post('/api')
        .then(function(res) {
          res.should.have.status(201);
          res.should.be.json;
        });
      })
    });
  describe('DELETE endpoint', function() {

    it('should delete slam crown user and return a 202 status', function() {
        
        let user;

        return User
          .findOne()
          .then(function(_user) {
            user = _user;
            return chai.request(app).delete(`/api/${user._id}`);
          })
          .then(function(res) {
            expect(res).to.have.status(202);
            return User.findById(user.id);
          })
          .then(function(user) {
            expect(user).to.be.null;
          });
      });
    });
});