'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/make_order', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/make_order')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect('charset', /utf-8/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});
