module.exports = function(app,fs,MongoClient,db) {

  // GET endpoint API for getting all users
  app.get('/api/users', function (req, res) {
    console.log('Get Users');
    // Get the user collection
    const collection = db.collection('user');
    // Retrieve User Data
    collection.find().toArray(function (err, userArray) {
      if (err) {
        console.log(err);
        // Some error happened opening the database file.
        res.send({"ok": false});
      } else {
        //Return users
        res.send({users: userArray});
      }
    });
  });

  // POST endpoint API for creating a new user
  app.post('/api/user', function (req, res) {
    console.log('Create User');
    // Get the user collection
    const collection = db.collection('user');
    // Retrieve User Data
    collection.find().toArray(function (err, userArray) {
      if (err) {
        console.log(err);
      } else {
        // Test uppercase version - ignore case
        if (userArray.find(user => user.name.toUpperCase() === req.body.name.toUpperCase())) {
          //User exists
          res.send({"ok": false});
        } else {
          let id = 1;
          if (userArray.length > 0) {
            let maximum = Math.max.apply(Math, userArray.map(function (found) {
              return found.id;
            }));
            id = maximum + 1;
          }
          let newUser = {"id": id, "name": req.body.name, "email": req.body.email, "role": req.body.role};
          collection.insertOne(newUser);
          res.send(newUser);
        }
      }
    });
  });

  // PUT endpoint API for editing a user
  app.put('/api/user/:id', function (req, res) {
    console.log('Edit User');
    let userObj;
    let id = parseInt(req.params.id);
    //Read data from JSON file
    fs.readFile('server/data/user.json', 'utf8', function (err,data) {
      if (err) {
        console.log(err);
      } else {
        userObj = JSON.parse(data);
        //Find user
        let editUser = userObj.find(x => x.id == id);
        editUser.name = req.body.name;
        editUser.email = req.body.email;
        editUser.role = req.body.role;
        let userJson = JSON.stringify(userObj);
        //Write Data to JSON File
        fs.writeFile('server/data/user.json', userJson, 'utf-8', function (err) {
          if (err) throw err;
          //Return edited user
          res.send(editUser);
        });
      }
    });
  });

  // DELETE endpoint API for deleting a user
  app.delete('/api/user/:id', function (req, res) {
    console.log('Delete User');
    let id = parseInt(req.params.id);
    // Get the user collection
    const collection = db.collection('user');
    // Set up Delete query
    let myQuery = { id: id};
    // Find some documents
    collection.deleteOne(myQuery, function(err, result) {
    });
    res.send(id.toString());
  });

  // DELETE selected user from all user elements in Group Data
  function deleteAllGroupUser(id) {
    console.log('Delete User from Groups Data');
    let groupsArray;
    //Read data from JSON file
    fs.readFile('server/data/group.json', 'utf8', function (err,data) {
      if (err) {
        console.log(err);
      } else {
        groupsArray = JSON.parse(data);
        // Filter out all users that are being deleted
        groupsArray.forEach(function(object) {
            object.user = object.user.filter(user => user.id != id);
          });
        let groupJson = JSON.stringify(groupsArray);
        //Write data to JSON file
        fs.writeFile('server/data/group.json', groupJson, 'utf-8', function (err) {
          if (err) throw err;
        });
      }
    });
  }

  // DELETE selected user from all user elements in Channel Data
  function deleteAllChannelUser(id) {
    console.log('Delete User from Channel Data');
    let channelsArray;
    //Read data from JSON file
    fs.readFile('server/data/channel.json', 'utf8', function (err,data) {
      if (err) {
        console.log(err);
      } else {
        channelsArray = JSON.parse(data);
        // Filter out all users that are being deleted
        channelsArray.forEach(function(object) {
          object.user = object.user.filter(user => user.id != id);
        });
        let channelJson = JSON.stringify(channelsArray);
        //Write data to JSON file
        fs.writeFile('server/data/channel.json', channelJson, 'utf-8', function (err) {
          if (err) throw err;
        });
      }
    });
  }
};

