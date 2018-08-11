const express = require('express')
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');

app.use (bodyParser.json());
app.use (bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname , '../dist/chat/')));

require('./routes.js')(app, path);
require('./socket.js')(app, io);
require('./listen.js')(http);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.get("/api/messages", (req, res, next) => {
  const messages = [
    {
      id: 'fadf12421l',
      title: 'First server-side post',
      content: 'This is coming from the server'
    },
    {
      id: 'ksajflaj132',
      title: 'Second server-side post',
      content: 'This is coming from the server!'
    }
  ];
  res.status(200).json({
    message: 'Messages fetched successfully!',
    messages: messages
  });
});

//Route to manage user signin
app.post("/api/messages",(req,res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'Post added Successfully'
  });
});
