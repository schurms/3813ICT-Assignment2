// Constants
const express = require('express')
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const fs = require('fs');
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

// MongoDb Connect
MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
  const dbName = 'mychatdb';
  const db = client.db(dbName);
  if (err) {
    return console.log(err)
  } else {
    require('./routes/user.js')(app,MongoClient,db);
    require('./routes/auth.js')(app,MongoClient,db);
    require('./routes/messages.js')(app,fs,MongoClient,db);
    require('./routes/groups.js')(app,MongoClient,db);
    require('./routes/channels.js')(app,MongoClient,db);
    require('./socket.js')(app,io,MongoClient,db);
    require('./listen.js')(http);
  }
});
