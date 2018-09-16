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
    require('../routes/channels.js')(app, MongoClient, db);
  }
});

describe('POST endpoint api for creating channels - /api/channel', function () {
  it('it should return data in text/html format', function (done) {
    request(app)
      .get('/api/channel')
      .expect('Content-Type', "text/html; charset=utf-8")
      .end(function(err,res) {
        if (err) return done(err);
        done();
      })
  });
});

describe('GET endpoint API for Reading all channels - /api/channels', function () {
  it('it should return data in json format', function (done) {
    request(app)
      .get('/api/channels')
      .expect('Content-Type', "application/json; charset=utf-8")
      .end(function(err,res) {
        if (err) return done(err);
        done();
      })
  });
});

describe('GET endpoint API for getting a specific channel - /api/channel/:id', function () {
  it('it should return data in text/html format', function (done) {
    request(app)
      .get('api/channel/:id')
      .expect('Content-Type', "text/html; charset=iso-8859-1")
      .end(function(err,res) {
        if (err) return done(err);
        done();
      })
  });
});

describe('PUT endpoint API for Updating a channel - /api/channel/:id', function () {
  it('it should return data in text/html format', function (done) {
    request(app)
      .put('api/channel/:id')
      .expect('Content-Type', "text/html; charset=iso-8859-1")
      .end(function(err,res) {
        if (err) return done(err);
        done();
      })
  });
});

describe('DELETE endpoint API for Deleting a channel - /api/channel/:id', function () {
  it('it should return data in text/html format', function (done) {
    request(app)
      .delete('/api/channel/:id')
      .expect('Content-Type', "text/html; charset=utf-8")
      .end(function(err,res) {
        if (err) return done(err);
        done();
      })
  });
});
