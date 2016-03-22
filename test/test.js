'use strict';

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var request = chai.request;

var Users = require(__dirname + '/../models/user.js');

process.env.MONGOLAB_URI = 'mongodb://localhost/test_db';

require(__dirname + '/../server.js');

describe('test api', function () {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to create a new user', function(done)  {
    request('localhost:3000')
      .post('/login')
      .auth('testuser', 'testpassword')
      .end(function(err, res) {
        console.log(res);
        expect(err).to.eql(null);
        expect(res).to.have.property('headers');
        expect(res.body).to.have.property('token');
        done();
      });
  });
});
