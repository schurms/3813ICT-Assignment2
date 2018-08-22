module.exports = function(app,fs) {

  // GET endpoint API for getting all users
  app.get('/api/users', function (req, res) {
    let userObj;
    fs.readFile('server/data/user.json', 'utf8', function (err, data) {
      if (err) {
        console.log(err);
        //Some error happened opened the file. No success.
        res.send({"ok": false});
      } else {
        userObj = JSON.parse(data);
        console.log('Get Users');
        res.send({users: userObj});
      }
    });
  });

  // POST endpoint API for creating a new user
  app.post('/api/user', function (req, res) {
    console.log('Update User');
    let userObj;
    fs.readFile('server/data/user.json', 'utf8', function (err,data) {
      if (err) {
        console.log(err);
      } else {
        userObj = JSON.parse(data);
        if (userObj.find(user => user.name === req.body.name)) {
          // User exists
          res.send({"ok": false});
        } else {
          console.log('Create User');
          // calculate the next ID
          let id = 1;
          if (userObj.length > 0) {
            let maximum = Math.max.apply(Math, userObj.map(function (f) {
              return f.id;
            }));
            id = maximum + 1;
          }
          let newUser = {"id": id, "name": req.body.name, "email": req.body.email, "role": req.body.role};
          userObj.push(newUser);
          let userJson = JSON.stringify(userObj);
          fs.writeFile('server/data/user.json', userJson, 'utf-8', function (err) {
            if (err) throw err;
            //Send response that registration was successful.
            res.send(newUser);
          });
        }
      }
    });
  });

  // PUT endpoint API for editing a user
  app.put('/api/user/:id', function (req, res) {
    console.log('Update User');
    let userObj;
    let id = req.params.id;
    fs.readFile('server/data/user.json', 'utf8', function (err,data) {
      if (err) {
        console.log(err);
      } else {
        userObj = JSON.parse(data);
        let editUser = userObj.find(x => x.id == id);
        editUser.name = req.body.name;
        editUser.email = req.body.email;
        editUser.role = req.body.role;
        let userJson = JSON.stringify(userObj);
        fs.writeFile('server/data/user.json', userJson, 'utf-8', function (err) {
          if (err) throw err;
          //Send response that registration was successful.
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
    fs.readFile('server/data/user.json', 'utf8', function (err,data) {
      if (err) {
        console.log(err);
      } else {
        userObj = JSON.parse(data);
        let u = userObj.find(x => x.id == id);
        userObj = userObj.filter(x => x.id != id);
        let userJson = JSON.stringify(userObj);
        fs.writeFile('server/data/user.json', userJson, 'utf-8', function (err) {
        if (err) throw err;
          //Send response that registration was successful.
          res.send(u);
        });
      }
    });
  });

};
