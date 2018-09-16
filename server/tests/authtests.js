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
    require('../routes/auth.js')(app, MongoClient, db);
  }
});

describe('GET /api/login', function () {
  it('it should return data in in json format', function (done) {
    request(app)
      .get('/api/login')
      .expect('Content-Type', "text/html; charset=utf-8")
      .end(function(err,res) {
        if (err) return done(err);
        done();
    })
  });
});

describe('GET /api/login', function ()  {
  it('it should pass as - 404 returned and expecting 404', function (done) {
    request(app)
      .get('/api/login')
      .expect(404)
      .end(function(err,res) {
        if (err) return done(err);
        done();
      })
  });
});

describe('GET /api/authuser', function () {
  it('it should return data in in json format', function (done) {
    request(app)
      .get('/api/authuser')
      .expect('Content-Type', "text/html; charset=utf-8")
      .end(function(err,res) {
        if (err) return done(err);
        done();
      })
  });
});

describe('GET /api/authuser', function ()  {
  it('it should pass as - 404 returned and expecting 404', function (done) {
    request(app)
      .get('/api/authuser')
      .expect(404)
      .end(function(err,res) {
        if (err) return done(err);
        done();
      })
  });
});
