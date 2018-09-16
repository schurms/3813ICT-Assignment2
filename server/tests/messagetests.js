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
    require('../routes/messages.js')(app, MongoClient, db);
  }
});

describe('POST endpoint api for creating messages - /api/message', function () {
  it('it should return data in text/html format', function (done) {
    request(app)
      .get('/api/message')
      .expect('Content-Type', "text/html; charset=utf-8")
      .end(function(err,res) {
        if (err) return done(err);
        done();
    })
  });
});

describe('POST endpoint API to retrieve all messages - /api/messages', function () {
  it('it should return data in text/html format', function (done) {
    request(app)
      .get('/api/messages')
      .expect('Content-Type', "text/html; charset=utf-8")
      .end(function(err,res) {
        if (err) return done(err);
        done();
      })
  });
});

describe('POST endpoint API to retrieve all messages - /api/messages/:id', function () {
  it('it should return data in json format', function (done) {
    request(app)
      .get('/api/messages/id')
      .expect('Content-Type', "application/json; charset=utf-8")
      .end(function(err,res) {
        if (err) return done(err);
        done();
      })
  });
});
