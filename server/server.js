// Constants
const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const formidable = require('formidable');
const bodyParser = require('body-parser');
const url = 'mongodb://localhost:27017';
const MongoClient = require('mongodb').MongoClient;

// Cross origin resource sharing to cater for port 4200 to port 3000
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:4200', // Angular server address and port
  optionsSuccessStatus: 200 //
};

// Set up CORS (Cross Site)
app.use(cors(corsOptions));

// Bind application-level middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Point static path to dist
app.use(express.static(path.join(__dirname , '../dist/myChat/')));
app.use('/images',express.static(path.join(__dirname, './public/images')));

// MongoDb Connect
MongoClient.connect(url, {poolSize:10, useNewUrlParser: true }, function(err, client) {
  const dbName = 'mychatdb';
  const db = client.db(dbName);
  if (err) {
    return console.log(err)
  } else {
    // load testdata
    loadTestData(db);

    // Routes
    require('./routes/user.js')(app,MongoClient,db);
    require('./routes/auth.js')(app,MongoClient,db);
    require('./routes/messages.js')(app,MongoClient,db);
    require('./routes/groups.js')(app,MongoClient,db);
    require('./routes/channels.js')(app,MongoClient,db);
    require('./socket.js')(app,io,MongoClient,db);
    require('./routes/uploads.js')(app,formidable);
    require('./listen.js')(http);
  }
});

// Function loads initial test data
function loadTestData(db) {
  // Set Up User Data
  db.listCollections({name: 'user'}).next(function(err, collinfo) {
    if (collinfo) {
      db.collection('user').drop (function(err, result) {
        if (err) throw err;
        console.log('User Collection Dropped')
      });
    }
    // Create Collection
    db.createCollection('user', function(err, result) {
      if (err) throw err;
      console.log('User Collection Created');
      let myData = [
        {"id":1,"name":"super","password":"1234","email":"super@gmail.com","role":"super","userimage":"http://localhost:3000/images/avatar1.png"},
        {"id":2,"name":"jordan","password":"1234","email":"jordan@gmail.com","role":"group","userimage":"http://localhost:3000/images/avatar2.png"},
        {"id":3,"name":"fred","password":"1234","email":"fred@gmail.com","role":"","userimage":"http://localhost:3000/images/avatar3.png"},
        {"id":4,"name":"bill","password":"1234","email":"bill@gmail.com","role":"group","userimage":"http://localhost:3000/images/avatar4.png"},
        {"id":5,"name":"sam","password":"1234","email":"sam@gmail.com","role":"","userimage":"http://localhost:3000/images/avatar5.png"},
        {"id":6,"name":"good","password":"1234","email":"good@gmail.com","role":"super","userimage":"http://localhost:3000/images/default.png"}
      ];
      // Insert User Records
      db.collection('user').insertMany(myData, function(err, result) {
        if (err) throw err;
        console.log('User Records Created');
      });
    });
  });

  // Set Up Channels Data
  db.listCollections({name: 'channels'}).next(function(err, collinfo) {
    if (collinfo) {
      db.collection('channels').drop (function(err, result) {
        if (err) throw err;
        console.log('Channels Collection Dropped')
      });
    }
    // Create Collection
    db.createCollection('channels', function(err, result) {
      if (err) throw err;
      console.log('Channels Collection Created');
      let myData = [
        {"id":1,"name":"Notebooks","user":[]},
        {"id":2,"name":"Peripherals","user":[{"id":4,"name":"bill","email":"bill@gmail.com","role":"group"}]},
        {"id":3,"name":"Windows","user":[{"id":4,"name":"bill","email":"test@gmail.com","role":"group"}]},
        {"id":4,"name":"Apple","user":[{"id":1,"name":"super","email":"super@gmail.com","role":"super"}]},
        {"id":5,"name":"Shopping","user":[{"id":1,"name":"super","email":"super@gmail.com","role":"super"},{"id":3,"name":"fred","email":"fred@gmail.com","role":""}]},
        {"id":6,"name":"Travel","user":[{"id":2,"name":"jordan","email":"jordan@gmail.com","role":"group"},{"id":3,"name":"fred","email":"fred@gmail.com","role":""},{"id":1,"name":"super","email":"super@gmail.com","role":"super"}]},
        {"id":7,"name":"Home Theatre","user":[]},
        {"id":8,"name":"TV Shows","user":[]},
        {"id":9,"name":"Automative","user":[]},
        {"id":10,"name":"Photography","user":[]},
        {"id":11,"name":"Desktops","user":[]},
        {"id":12,"name":"Monitors/Videos","user":[]},
        {"id":13,"name":"Unallocated 1","user":[]},
        {"id":14,"name":"Unallocated 2","user":[]}
      ];
      // Insert Channels Records
      db.collection('channels').insertMany(myData, function(err, result) {
        if (err) throw err;
        console.log('Channels Records Created');
      });
    });
  });

  // Set Up Groups Data
  db.listCollections({name: 'groups'}).next(function(err, collinfo) {
    if (collinfo) {
      db.collection('groups').drop (function(err, result) {
        if (err) throw err;
        console.log('Groups Collection Dropped')
      });
    }
    // Create Collection
    db.createCollection('groups', function(err, result) {
      if (err) throw err;
      console.log('Groups Collection Created');
      let myData = [
        {"id":1,"name":"Overseas",
          "channel":[
            {"id":5,"name":"Shopping","user":[{"id":1,"name":"super","email":"super@gmail.com","role":"super"},{"id":3,"name":"fred","email":"fred@gmail.com","role":""}]},
            {"id":6,"name":"Travel","user":[{"id":2,"name":"jordan","email":"jordan@gmail.com","role":"group"},{"id":3,"name":"fred","email":"fred@gmail.com","role":""},{"id":1,"name":"super","email":"super@gmail.com","role":"super"}]}],
          "user":[{"id":1,"name":"super","email":"super@gmail.com","role":"super"},{"id":2,"name":"jordan","email":"jordan@gmail.com","role":"group"},{"id":3,"name":"fred","email":"fred@gmail.com","role":""}]},
        {"id":2,"name":"Computers",
          "channel":[
            {"id":1,"name":"Notebooks","user":[]},
            {"id":3,"name":"Windows","user":[{"id":4,"name":"bill","email":"test@gmail.com","role":"group"}]},
            {"id":2,"name":"Peripherals","user":[{"id":4,"name":"bill","email":"bill@gmail.com","role":"group"}]},
            {"id":4,"name":"Apple","user":[{"id":1,"name":"super","email":"super@gmail.com","role":"super"}]},
            {"id":11,"name":"Desktops","user":[]},
            {"id":12,"name":"Monitors/Videos","user":[]}],
          "user":[
            {"id":4,"name":"bill","email":"bill@gmail.com","role":"group"},
            {"id":1,"name":"super","email":"super@gmail.com","role":"super"}]},
        {"id":3,"name":"Entertainment",
          "channel":[
            {"id":7,"name":"Home Theatre","user":[]},
            {"id":8,"name":"TV Shows","user":[]}],
          "user":[]},
        {"id":4,"name":"Lounges",
          "channel":[
            {"id":9,"name":"Automative","user":[]},
            {"id":10,"name":"Photography","user":[]}],
          "user":[]}
      ];
      // Insert Groups Records
      db.collection('groups').insertMany(myData, function(err, result) {
        if (err) throw err;
        console.log('Groups Records Created');
      });
    });
  });

  // Set Up Messages Data
  db.listCollections({name: 'messages'}).next(function(err, collinfo) {
    if (collinfo) {
      db.collection('messages').drop (function(err, result) {
        if (err) throw err;
        console.log('Messages Collection Dropped')
      });
    }
    // Create Collection
    db.createCollection('messages', function(err, result) {
      if (err) throw err;
      console.log('Messages Collection Created');
    });
  });

}
