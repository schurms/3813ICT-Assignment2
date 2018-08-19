// Constants
const express = require('express')
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');

// Cross origin resource sharing to cater for port 4200 to port 3000
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
};

// Set up CORS (Cross Site)
app.use(cors(corsOptions));

// Bind application-level middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Point static path to dist
app.use(express.static(path.join(__dirname , '../dist/myChat/')));

// Include Modules
require('./routes/user.js')(app);
require('./routes/messages.js')(app);
require('./routes/groups.js')(app);
require('./routes/channels.js')(app);
require('./socket.js')(app, io);
require('./listen.js')(http);
