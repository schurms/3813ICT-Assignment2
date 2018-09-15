module.exports = function(app,MongoClient,db) {

  // POST endpoint for validating if User is in system
  app.post('/api/login', function (req,res) {
    console.log('Validate Login');
    // Get the user collection
    const collection = db.collection('user');
    // Retrieve User Data
    collection.find({name: req.body.name, password: req.body.password}).toArray(function (err, userArray) {
      if (err) {
        console.log(err);
        // Some error happened opening the database file.
        res.send({"ok": false});
      } else {
        // if user id found
        if (userArray.length === 1) {
          //Return true
          res.send({"ok": true});
        } else {
          //Return false
          res.send({"ok": false});
        }
      }
    });
  });

  // POST endpoint API for retrieving user credentials
  app.post('/api/authuser', function (req, res) {
    console.log('Get Credentials');
    // Get the user collection
    const collection = db.collection('user');
    // Retrieve User Data
    collection.find().toArray(function (err, userArray) {
      if (err) {
        console.log(err);
        // Some error happened opening the database file.
        res.send({"ok": false});
      } else {
        //If user exists
        let foundUser = userArray.find(user => user.name === req.body.name);
        //Return found user details
        res.send(foundUser);
      }
    });
  });

};
