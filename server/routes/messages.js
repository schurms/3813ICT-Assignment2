module.exports = function(app,MongoClient,db) {

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
        let newMsg = {"id": id, "message": req.body.message, "messagedate": req.body.messagedate, "userid": req.body.userid, "username": req.body.username, "channelid": req.body.channelid, "channelname": req.body.channelname, "userimage": req.body.userimage};
        collection.insertOne(newMsg);
        res.status(200).send(newMsg);
      }
    });
  });

  //POST endpoint API to retrieve all messages
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
        res.status(200).send({"ok": false});
      } else {
        res.status(200).send({messages: messageArray});
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
        res.status(200).send({"ok": false});
      } else {
        res.status(200).send({messages: messagesArray});
      }
    });
  });


};
