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
      res.send({result});
    });
  });

  // TEST API: Delete Groups
  app.get('/deletegroups', (req, res) => {
    console.log('Load Initial User Records');
    // Set Collection Constant
    const collection = db.collection('groups');
    // Find some documents
    collection.deleteMany({});
  });


  // GET endpoint API for getting groups
  app.get('/api/group', function (req, res) {
    console.log('Get Groups');
    let groupArray;
    //Read data from JSON File
    fs.readFile('server/data/group.json', 'utf8', function (err, data) {
      if (err) {
        console.log(err);
        //Some error happened opened the file. No success.
        res.send({"ok": false});
      } else {
        groupArray = JSON.parse(data);
        //Return group data
        res.send({groups: groupArray});
      }
    });
  });

  // GET endpoint API for getting a specific group
  app.get('/api/group/:id', function (req,res) {
    console.log('Get Group');
    let id = req.params.id;
    let groupArray;
    //Read data from JSON File
    fs.readFile('server/data/group.json', 'utf8', function (err, data) {
      if (err) {
        console.log(err);
        //Some error happened opened the file. No success.
        res.send({"ok": false});
      } else {
        groupArray = JSON.parse(data);
        //Retrieve Group - must exist
        let foundGroup = groupArray.find(group => group.id == id);
        res.send({group: foundGroup});
      }
    });
  });

  // POST endpoint API for creating a new group
  app.post('/api/group', function (req, res) {
    console.log('Create Group');
    let groupArray;
    //Read data from JSON file
    fs.readFile('server/data/group.json', 'utf8', function (err,data) {
      if (err) {
        console.log(err);
      } else {
        groupArray = JSON.parse(data)
        // Test uppercase version - ignore case
        if (groupArray.find(group => group.name.toUpperCase() === req.body.name.toUpperCase())) {
          // Group exists
          res.send({"ok": false});
        } else {
          // Find next available id
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
          groupArray.push(newGroup);
          let groupJson = JSON.stringify(groupArray);
          //Write data to JSON file
          fs.writeFile('server/data/group.json', groupJson, 'utf-8', function (err) {
            if (err) throw err;
            //Return created group
            res.send(newGroup);
          });
        }
      }
    });
  });

  // PUT endpoint API for Updating a group
  app.put('/api/group/:id', function (req, res) {
    console.log('Update Group');
    let groupArray;
    let id = req.params.id;
    //Read data from JSON file
    fs.readFile('server/data/group.json', 'utf8', function (err,data) {
      if (err) {
        console.log(err);
      } else {
        groupArray = JSON.parse(data);
        //Find group to be updated
        let updateGroup = groupArray.find(group => group.id == id);
        updateGroup.name = req.body.name;
        updateGroup.channel = req.body.channel;
        updateGroup.user = req.body.user;
        let groupJson = JSON.stringify(groupArray);
        //Write data to JSON file
        fs.writeFile('server/data/group.json', groupJson, 'utf-8', function (err) {
          if (err) throw err;
          //Return updated Group
          res.send(updateGroup);
        });
      }
    });
  });

  // DELETE endpoint API for deleting a group
  app.delete('/api/group/:id', function (req, res) {
    console.log('Delete Group');
    let groupArray;
    let id = req.params.id;
    //Read data from JSON file
    fs.readFile('server/data/group.json', 'utf8', function (err,data) {
      if (err) {
        console.log(err);
      } else {
        groupArray = JSON.parse(data);
        //Find group to be deleted
        let deleteGroup = groupArray.find(group => group.id == id);
        //Set new group array less item to be deleted
        groupArray = groupArray.filter(group => group.id != id);
        let groupJson = JSON.stringify(groupArray);
        //Write data to JSON file
        fs.writeFile('server/data/group.json', groupJson, 'utf-8', function (err) {
          if (err) throw err;
          //Return deleted Group.
          res.send(deleteGroup);
        });
      }
    });
  });

};
