module.exports = function(app,MongoClient,db) {

  // TEST API: Load Messages
  app.get('/addmessages', (req, res) => {
    console.log('Load Test message Records');
    // Set up Data to Load
    let myData = [
      {"id":1,"message":"Message 1","messagedate":"Thu Sep 06 2018 19:50:14 GMT+1000 (Australian Eastern Standard Time)","userid":1,"username": "super","channelid":"6","channelname":"Travel","userimage":"http://localhost:3000/images/avatar1.png"},
      {"id":2,"message":"Message 2","messagedate":"Thu Sep 06 2018 19:51:14 GMT+1000 (Australian Eastern Standard Time)","userid":2,"username": "jordan","channelid":"6","channelname":"Travel","userimage":"http://localhost:3000/images/avatar2.png"},
      {"id":3,"message":"Message 3","messagedate":"Thu Sep 06 2018 19:52:14 GMT+1000 (Australian Eastern Standard Time)","userid":2,"username": "jordan","channelid":"6","channelname":"Travel","userimage":"http://localhost:3000/images/avatar2.png"},
      {"id":4,"message":"Message 4","messagedate":"Thu Sep 06 2018 19:53:14 GMT+1000 (Australian Eastern Standard Time)","userid":1,"username": "super","channelid":"6","channelname":"Travel","userimage":"http://localhost:3000/images/avatar1.png"},
      {"id":5,"message":"Message 5","messagedate":"Thu Sep 06 2018 19:54:14 GMT+1000 (Australian Eastern Standard Time)","userid":2,"username": "jordan","channelid":"6","channelname":"Travel","userimage":"http://localhost:3000/images/avatar2.png"},
      {"id":6,"message":"Message 6","messagedate":"Thu Sep 06 2018 19:55:14 GMT+1000 (Australian Eastern Standard Time)","userid":1,"username": "super","channelid":"6","channelname":"Travel","userimage":"http://localhost:3000/images/avatar1.png"}
    ];
    // Set Collection Constant
    const collection = db.collection('messages');
    // Insert records
    collection.insertMany(myData, function(err, result) {
      if (err) throw err;
      console.log(result);
      res.send({result});
    });
  });

  // TEST API: Delete Messages
  app.get('/deletemessages', (req, res) => {
    console.log('Delete All Message Records');
    // Set Collection Constant
    const collection = db.collection('messages');
    // Delete all records
    let myQuery = { };
    collection.deleteMany(myQuery, function(err, result) {
      if (err) throw err;
      console.log("Removed All Messages");
      res.send({result});
    });
  });

  // POST endpoint API for Creating a Message in History
  app.post('/api/message', function (req, res) {
    console.log('Add a message to history');
    // Set Collection Constant
    const collection = db.collection('messages');
    // Retrieve Message Data
    collection.find().toArray(function (err, messageArray) {
      if (err) {
        console.log(err);
      } else {
        let id = 1;
        if (messageArray.length > 0) {
          let maximum = Math.max.apply(Math, messageArray.map(function (found) {
            return found.id;
          }));
          id = maximum + 1;
        }
        let newMsg = {"id": id, "message": req.body.message, "messagedate": req.body.messagedate, "userid": req.body.userid, "username": req.body.username, "channelid": req.body.channelid, "channelname": req.body.channelname};
        collection.insertOne(newMsg);
        res.send(newMsg);
      }
    });
  });

  //Route to retrieve all product items
  app.post('/api/messages', function (req, res) {
    // Get the products collection
    console.log("Get Messages for Channel");
    let id = req.body.id;
    console.log(id);
    const collection = db.collection('messages');
    // Retrieve messages based on channel id
    collection.find({channelid: id}).sort({messagedate: 1}).toArray(function (err, messageArray) {
      if (err) {
        console.log(err);
        // Some error happened opening the database file.
        res.send({"ok": false});
      } else {
        res.send({messages: messageArray});
      }
    });
  });

  // GET endpoint API for Reading a specific channel
  app.get('/api/messages/:id', function (req,res) {
    console.log('Get Messages for channel');
    let id = parseInt(req.params.id);
    // Set Collection Constant
    const collection = db.collection('messages');
    // Retrieve Message Data
    collection.find({channelid: id}).sort({messagedate: 1}).toArray(function (err, messagesArray) {
      if (err) {
        console.log(err);
        // Some error happened opening the database file.
        res.send({"ok": false});
      } else {
        res.send({messages: messagesArray});
      }
    });
  });


};
