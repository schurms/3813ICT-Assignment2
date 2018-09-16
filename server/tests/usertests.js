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
    require('../routes/user.js')(app, MongoClient, db);
  }
});

describe('POST endpoint api for creating users - /api/user', function () {
  it('it should return data in text/html format', function (done) {
    request(app)
      .get('/api/user')
      .expect('Content-Type', "text/html; charset=utf-8")
      .end(function(err,res) {
        if (err) return done(err);
        done();
    })
  });
});

describe('GET endpoint API for Reading all users - /api/users', function () {
  it('it should return data in json format', function (done) {
    request(app)
      .get('/api/users')
      .expect('Content-Type', "application/json; charset=utf-8")
      .end(function(err,res) {
        if (err) return done(err);
        done();
      })
  });
});

describe('PUT endpoint API for Updating a user - /api/user/:id', function () {
  it('it should return data in text/html format', function (done) {
    request(app)
      .put('api/user/:id')
      .expect('Content-Type', "text/html; charset=iso-8859-1")
      .end(function(err,res) {
        if (err) return done(err);
        done();
      })
  });
});

describe('PUT endpoint API for Updating a Users Avatar - /api/updateone/:id', function () {
  it('it should return data in text/html format', function (done) {
    request(app)
      .put('api/updateone/:id')
      .expect('Content-Type', "text/html; charset=iso-8859-1")
      .end(function(err,res) {
        if (err) return done(err);
        done();
      })
  });
});

describe('DELETE endpoint API for Deleting a user - /api/user/:id', function () {
  it('it should return data in text/html format', function (done) {
    request(app)
      .delete('api/user/:id')
      .expect('Content-Type', "text/html; charset=iso-8859-1")
      .end(function(err,res) {
        if (err) return done(err);
        done();
      })
  });
});

describe('POST endpoint api for creating users - /api/user', function ()  {
  it('it should pass as - 404 returned and expecting 404', function (done) {
    request(app)
      .get('/api/user')
      .expect(404)
      .end(function(err,res) {
        if (err) return done(err);
        done();
      })
  });
});

describe('GET endpoint API for Reading all users - /api/users', function ()  {
  it('it should pass as - 200 returned and expecting 200', function (done) {
    request(app)
      .get('/api/users')
      .expect(200)
      .end(function(err,res) {
        if (err) return done(err);
        done();
      })
  });
});
