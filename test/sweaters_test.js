var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

process.env.MONGOLAB_URI = 'mongodb://localhost/sweater_stream_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var Sweater = require(__dirname + '/../models/sweater');

describe('sweater routes', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to create a sweater', function(done) {
    var sweaterData = {name: 'test sweater'};
    chai.request('localhost:3000')
      .post('/api/sweaters')
      .send(sweaterData)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('test sweater');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  it('should be able to get all da sweaters', function(done) {
    chai.request('localhost:3000')
      .get('/api/sweaters')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  describe('needs a sweater', function() {
    beforeEach(function(done) {
      (new Sweater({name: 'test sweater'})).save(function(err, data) {
        expect(err).to.eql(null);
        this.sweater = data;
        done();
      }.bind(this));
    });

    it('should be able to modify a sweater', function(done) {
      chai.request('localhost:3000')
        .put('/api/sweaters/' + this.sweater._id)
        .send({name: 'a different sweater name'})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('success!');
          done();
        });
    });

    it('should be able to murder a sweater', function(done) {
      chai.request('localhost:3000')
        .delete('/api/sweaters/' + this.sweater._id)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('success!');
          done();
        });
    });
  });
});
