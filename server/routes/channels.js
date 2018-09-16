module.exports = function(app,MongoClient,db) {

  // TEST API: Load Channels
  app.get('/addchannels', (req, res) => {
    console.log('Load Initial Channel Records');
    // Set up Data to Load
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
    // Set Collection Constant
    const collection = db.collection('channels');
    // Insert Data
    collection.insertMany(myData, function(err, result) {
      if (err) throw err;
      console.log(result);
      res.status(200).send({result});
    });
  });

  // TEST API: Delete Channels
  app.get('/deletechannels', (req, res) => {
    console.log('Load Initial Channel Records');
    // Set Collection Constant
    const collection = db.collection('channels');
    // Delete all records
    let myQuery = { };
    collection.deleteMany(myQuery, function(err, result) {
      if (err) throw err;
      console.log("Removed All Channels");
      res.status(200).send({result});
    });
  });

  // POST endpoint API for Creating a channel
  app.post('/api/channel', function (req, res) {
    console.log('Create Channel');
    // Set Collection Constant
    const collection = db.collection('channels');
    // Retrieve Channel Data
    collection.find().toArray(function (err, channelArray) {
      if (err) {
        console.log(err);
      } else {
        // Test uppercase version - ignore case
        if (channelArray.find(channel => channel.name.toUpperCase() === req.body.name.toUpperCase())) {
          //Channel exists
          res.status(200).send({"ok": false});
        } else {
          let id = 1;
          if (channelArray.length > 0) {
            let maximum = Math.max.apply(Math, channelArray.map(function (found) {
              return found.id;
            }));
            id = maximum + 1;
          }
          // Define empty array for users when created
          let user = [];
          let newChannel = {"id": id, "name": req.body.name, "user": user};
          collection.insertOne(newChannel, function(err, result) {
            if (err) throw err;
            res.status(200).send(newChannel);
          });
        }
      }
    });
  });

  // GET endpoint API for Reading all channels
  app.get('/api/channels', function (req, res) {
    console.log('Get Channels');
    // Set Collection Constant
    const collection = db.collection('channels');
    // Retrieve Channel Data
    collection.find().toArray(function (err, channelArray) {
      if (err) {
        console.log(err);
        // Some error happened opening the database file.
        res.status(404).send({"ok": false});
      } else {
        //Return channels
        res.status(200).send({channels: channelArray});
      }
    });
  });

  // GET endpoint API for Reading a specific channel
  app.get('/api/channel/:id', function (req,res) {
    console.log('Get Channel');
    let id = parseInt(req.params.id);
    // Set Collection Constant
    const collection = db.collection('channels');
    // Retrieve Channel Data
    collection.find().toArray(function (err, channelArray) {
      if (err) {
        console.log(err);
        // Some error happened opening the database file.
        res.send({"ok": false});
      } else {
        //Retrieve Channel - must exist
        let foundChannel = channelArray.find(channel => channel.id == id);
        res.send({channel: foundChannel});
      }
    });
  });

  // PUT endpoint API for Updating a channel;
  app.put('/api/channel/:id', function (req, res) {
    console.log('Update Channel');
    let id = parseInt(req.params.id);
    // Set Collection Constant
    const collection = db.collection('channels');
    // Set up Update query
    let myQuery = {id: id};
    let newValues = { $set: {name: req.body.name, user: req.body.user}};
    collection.updateOne(myQuery,newValues, function(err, result) { });
    res.status(200).send(id.toString());
  });

  // DELETE endpoint API for Deleting a channel
  app.delete('/api/channel/:id', function (req, res) {
    console.log('Delete Channel');
    let id = parseInt(req.params.id);
    // Set Collection Constant
    const collection = db.collection('channels');
    // Set up Delete query
    let myQuery = {id: id};
    // Find some documents
    collection.deleteOne(myQuery, function(err, result) { });
    deleteAllGroupChannel(id);
    res.status(200).send(id.toString());
  });

  // DELETE selected channel from all channel elements in Group Data
  function deleteAllGroupChannel(id) {
    console.log('Delete the Channel from the Groups Data');
    const collection = db.collection('groups');
    let myQuery = { };
    // Set up Delete query
    collection.update(myQuery,{$pull:{channel:{id:id}}}, {multi:true});
  }

};
