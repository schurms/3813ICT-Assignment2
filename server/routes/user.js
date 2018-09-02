module.exports = function(app,MongoClient,db) {

  // TEST API: Load Users
  app.get('/addusers', (req, res) => {
    console.log('Load Initial User Records');
    // Set up Data to Load
    let myData = [
      { id: 1, name:'super', email:'super@gmail.com', role:'super' },
      { id: 2, name:'jordan', email:'jordan@gmail.com', role:'group' },
      { id: 3, name:'fred', email:'fred@gmail.com', role:'' },
      { id: 4, name:'bill', email:'bill@gmail.com', role:'group' },
      { id: 5, name:'sam', email:'sam@gmail.com', role:'' },
      { id: 6, name:'good', email:'good@gmail.com', role:'super' }
    ];
    // Set Collection Constant
    const collection = db.collection('user');
    // Insert Data
    collection.insertMany(myData, function(err, result) {
      res.send({result});
    });
  });

  // TEST API: Delete Users
  app.get('/deleteusers', (req, res) => {
    console.log('Load Initial User Records');
    // Set Collection Constant
    const collection = db.collection('user');
    // Find some documents
    collection.deleteMany({});
  });

  // POST endpoint API for Creating a user
  app.post('/api/user', function (req, res) {
    console.log('Create User');
    // Set Collection Constant
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

  // GET endpoint API for Reading all users
  app.get('/api/users', function (req, res) {
    console.log('Read Users');
    // Set Collection Constant
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

  // PUT endpoint API for Updating a user
  app.put('/api/user/:id', function (req, res) {
    console.log('Update User');
    let id = parseInt(req.params.id);
    // Set Collection Constant
    const collection = db.collection('user');
    // Set up Update query
    let myQuery = {id: id};
    let newValues = { $set: {name: req.body.name, email: req.body.email, role: req.body.role}};
    collection.updateOne(myQuery,newValues, function(err, result) { });
    res.send(id.toString());
  });

  // DELETE endpoint API for Deleting a user
  app.delete('/api/user/:id', function (req, res) {
    console.log('Delete User');
    let id = parseInt(req.params.id);
    // Set Collection Constant
    const collection = db.collection('user');
    // Set up Delete query
    let myQuery = {id: id};
    // Find some documents
    collection.deleteOne(myQuery, function(err, result) { });
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

