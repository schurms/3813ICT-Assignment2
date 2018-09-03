module.exports = function(app,MongoClient,db) {

  // TEST API: Load Groups
  app.get('/addgroups', (req, res) => {
    console.log('Load Initial Group Records');
    // Set up Data to Load
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

    // Set Collection Constant
    const collection = db.collection('groups');
    // Insert Data
    collection.insertMany(myData, function(err, result) {
      if (err) throw err;
      console.log(result);
      res.send({result});
    });
  });

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
          collection.insertOne(newGroup);
          res.send(newGroup);
        }
      }
    });
  });

  // GET endpoint API for Reading all groups
  app.get('/api/group', function (req, res) {
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
