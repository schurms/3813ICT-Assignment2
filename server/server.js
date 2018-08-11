// Constants
const express = require('express')
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');

// Bind application-level middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname , '../dist/chat/')));

// Include Modules
require('./routes/signin.js')(app, path);
require('./routes/messages.js')(app, path);
require('./socket.js')(app, io);
require('./listen.js')(http);
