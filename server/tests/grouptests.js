const request = require('supertest');
const express = require('express');
const app = express();
const url = 'mongodb://localhost:27017';
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
  const dbName = 'mychatdb';
  const db = client.db(dbName);
  if (err) {
    return console.log(err)
  } else {
    require('../routes/groups.js')(app, MongoClient, db);
  }
});

describe('POST endpoint api for creating groups - /api/group', function () {
  it('it should return data in text/html format', function (done) {
    request(app)
      .get('/api/group')
      .expect('Content-Type', "text/html; charset=utf-8")
      .end(function(err,res) {
        if (err) return done(err);
        done();
      })
  });
});

describe('GET endpoint API for Reading all groups - /api/groups', function () {
  it('it should return data in json format', function (done) {
    request(app)
      .get('/api/groups')
      .expect('Content-Type', "application/json; charset=utf-8")
      .end(function(err,res) {
        if (err) return done(err);
        done();
      })
  });
});

describe('GET endpoint API for getting a specific group - /api/group/:id', function () {
  it('it should return data in text/html format', function (done) {
    request(app)
      .get('api/group/:id')
      .expect('Content-Type', "text/html; charset=iso-8859-1")
      .end(function(err,res) {
        if (err) return done(err);
        done();
      })
  });
});

describe('PUT endpoint API for Updating a group - /api/group/:id', function () {
  it('it should return data in text/html format', function (done) {
    request(app)
      .put('api/group/:id')
      .expect('Content-Type', "text/html; charset=iso-8859-1")
      .end(function(err,res) {
        if (err) return done(err);
        done();
      })
  });
});

describe('DELETE endpoint API for Deleting a group - /api/group/:id', function () {
  it('it should return data in text/html format', function (done) {
    request(app)
      .delete('/api/group/:id')
      .expect('Content-Type', "text/html; charset=utf-8")
      .end(function(err,res) {
        if (err) return done(err);
        done();
      })
  });
});
