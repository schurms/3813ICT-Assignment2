module.exports = function(app,fs) {

  // GET endpoint API for getting all users
  app.get('/api/users', function (req, res) {
            console.log('Get Users');
    let userArray;
    //Read data from JSON
    fs.readFile('server/data/user.json', 'utf8', function (err, data) {
      if (err) {
        console.log(err);
        //Some error happened opened the file. No success.
        res.send({"ok": false});
      } else {
        userArray = JSON.parse(data);
        //Return users
        res.send({users: userArray});
      }
    });
  });

  // POST endpoint API for creating a new user
  app.post('/api/user', function (req, res) {
    console.log('Create User');
    let userArray;
    //Read data from JSON
    fs.readFile('server/data/user.json', 'utf8', function (err,data) {
      if (err) {
        console.log(err);
      } else {
        userArray = JSON.parse(data);
        if (userArray.find(user => user.name === req.body.name)) {
          //User exists
          res.send({"ok": false});
        } else {
          //Determine the next available id
          let id = 1;
          if (userArray.length > 0) {
            let maximum = Math.max.apply(Math, userArray.map(function (found) {
              return found.id;
            }));
            id = maximum + 1;
          }
          let newUser = {"id": id, "name": req.body.name, "email": req.body.email, "role": req.body.role};
          userArray.push(newUser);
          let userJson = JSON.stringify(userArray);
          //Write data to JSON
          fs.writeFile('server/data/user.json', userJson, 'utf-8', function (err) {
            if (err) throw err;
            //Return created user
            res.send(newUser);
          });
        }
      }
    });
  });

  // PUT endpoint API for editing a user
  app.put('/api/user/:id', function (req, res) {
    console.log('Edit User');
    let userObj;
    let id = req.params.id;
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
    let userObj;
    let id = req.params.id;
    //Read data from JSON file
    fs.readFile('server/data/user.json', 'utf8', function (err,data) {
      if (err) {
        console.log(err);
      } else {
        userObj = JSON.parse(data);
        //Find user to delete
        let deleteUser = userObj.find(user => user.id == id);
        //Create new user array less user to be deleted
        userObj = userObj.filter(user => user.id != id);
        let userJson = JSON.stringify(userObj);
        //Write data to JSON File
        fs.writeFile('server/data/user.json', userJson, 'utf-8', function (err) {
        if (err) throw err;
          //Return deleted user
          res.send(deleteUser);
        });
      }
    });
  });

};
