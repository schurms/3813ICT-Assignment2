module.exports = function(app,MongoClient,db) {

  // TEST API: Delete Groups
  app.get('/deletegroups', (req, res) => {
    console.log('Load Initial Channel Records');
    // Set Collection Constant
    const collection = db.collection('groups');
    // Delete all records
    let myQuery = { };
    collection.deleteMany(myQuery, function(err, result) {
      if (err) throw err;
      console.log("Removed All Groups");
      res.send({result});
    });
  });

  // POST endpoint API for Creating a group
  app.post('/api/group', function (req, res) {
    console.log('Create Group');
    // Set Collection Constant
    const collection = db.collection('groups');
    // Retrieve Group Data
    collection.find().toArray(function (err, groupArray) {
      if (err) {
        console.log(err);
      } else {
        // Test uppercase version - ignore case
        if (groupArray.find(group => group.name.toUpperCase() === req.body.name.toUpperCase())) {
          //Group exists
          res.send({"ok": false});
        } else {
          let id = 1;
          if (groupArray.length > 0) {
            let maximum = Math.max.apply(Math, groupArray.map(function (found) {
              return found.id;
            }));
            id = maximum + 1;
          }
          // Define empty array for channels/users when created
          let channel = [];
          let user = [];
          let newGroup = {"id": id, "name": req.body.name, "channel": channel, "user": user};
          collection.insertOne(newGroup, function(err, result) {
            if (err) throw err;
            res.send(newGroup);
          });
        }
      }
    });
  });

  // GET endpoint API for Reading all groups
  app.get('/api/groups', function (req, res) {
    console.log('Get Groups');
    // Set Collection Constant
    const collection = db.collection('groups');
    // Retrieve Group Data
    collection.find().toArray(function (err, groupArray) {
      if (err) {
        console.log(err);
        // Some error happened opening the database file.
        res.send({"ok": false});
      } else {
        //Return groups
        res.send({groups: groupArray});
      }
    });
  });

  // GET endpoint API for Reading a specific group
  app.get('/api/group/:id', function (req,res) {
    console.log('Get Group');
    let id = parseInt(req.params.id);
    // Set Collection Constant
    const collection = db.collection('groups');
    // Retrieve Group Data
    collection.find().toArray(function (err, groupArray) {
      if (err) {
        console.log(err);
        // Some error happened opening the database file.
        res.send({"ok": false});
      } else {
        //Retrieve Group - must exist
        let foundGroup = groupArray.find(group => group.id == id);
        res.send({group: foundGroup});
      }
    });
  });

  // GET endpoint API for Reading a specific group channel
  app.get('/api/mychannels/:id', function (req,res) {
    let testArray;

    console.log('Get User Group / Channel');
    let id = parseInt(req.params.id);
    id = 1;
    // Set Collection Constant
    const collection = db.collection('groups');
    // Retrieve Group Data
    collection.find({$and:[{"channel.user.id":id},{"user.id":id}]},{"channel.user.id":  id}).toArray(function (err, groupArray) {
      if (err) {
        console.log(err);
        // Some error happened opening the database file.
        res.send({"ok": false});
      } else {
        testArray = groupArray;
        console.log(testArray);
        res.send({groups: testArray});
      }
    });
  });

  // PUT endpoint API for Updating a group;
  app.put('/api/group/:id', function (req, res) {
    console.log('Update Group');
    let id = parseInt(req.params.id);
    // Set Collection Constant
    const collection = db.collection('groups');
    // Set up Update query
    let myQuery = {id: id};
    let newValues = { $set: {name: req.body.name, channel: req.body.channel, user: req.body.user}};
    collection.updateOne(myQuery,newValues, function(err, result) { });
    res.send(id.toString());
  });

  // DELETE endpoint API for Deleting a group
  app.delete('/api/group/:id', function (req, res) {
    console.log('Delete Group');
    let id = parseInt(req.params.id);
    // Set Collection Constant
    const collection = db.collection('groups');
    // Set up Delete query
    let myQuery = {id: id};
    // Find some documents
    collection.deleteOne(myQuery, function(err, result) { });
    res.send(id.toString());
  });

};
