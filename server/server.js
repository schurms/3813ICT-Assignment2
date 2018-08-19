// Constants
const express = require('express')
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');

// CORS
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Set up CORS (Cross Site)
app.use(cors(corsOptions));

// Bind application-level middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Point static path to dist
app.use(express.static(path.join(__dirname , '../dist/myChat/')));

// Include Modules
require('./routes/login.js')(app, path);
require('./routes/user.js')(app, path);
require('./routes/messages.js')(app, path);
require('./routes/groups.js')(app,path);
require('./routes/channels.js')(app,path);
require('./socket.js')(app, io);
require('./listen.js')(http);
