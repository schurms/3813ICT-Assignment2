module.exports = function(app,fs) {

  // Sample User Data
  let users = [
    {id: 1, name: 'super', email: '', role: ''},
    {id: 2, name: 'jordan', email: 'jordan@gmail.com', role: ''},
    {id: 3, name: 'bill', email: 'bill@gmail.com', role: 'group'},
    {id: 4, name: 'sam', email: 'sam@gmail.com', role: ''}
  ];

  // GET endpoint API for getting all users
  app.get('/api/users', function (req, res) {
    let userObj;
    fs.readFile('server/data/userdata.json', 'utf8', function (err, data) {
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

  // GET endpoint API for getting all users
  // app.get('/api/users', function (req, res) {
  //   console.log('Get Users');
  //   res.send({users: users});
  // });

  // POST endpoint API for creating a new user
  app.post('/api/user', function (req, res) {
    console.log('Update User');
    let userObj;
    fs.readFile('server/data/userdata.json', 'utf8', function (err,data) {
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
          fs.writeFile('server/data/userdata.json', userJson, 'utf-8', function (err) {
            if (err) throw err;
            //Send response that registration was successful.
            res.send(newUser);
          });
        }
      }
    });
  });

  // // POST endpoint API for creating a new user
  // app.post('/api/user', function (req, res) {
  //   if (users.find(user => user.name === req.body.name)) {
  //     // User exists
  //     res.send({ "ok": false });
  //   } else {
  //     console.log('Create User');
  //     // calculate the next ID
  //     let id = 1;
  //     if (users.length > 0) {
  //       let maximum = Math.max.apply(Math, users.map(function (f) { return f.id; }));
  //       id = maximum + 1;
  //     }
  //     let newUser = {"id": id, "name": req.body.name, "email": req.body.email, "role": req.body.role};
  //     users.push(newUser);
  //     res.send(newUser);
  //   }
  // });

  // PUT endpoint API for editing a user
  app.put('/api/user/:id', function (req, res) {
    console.log('Update User');
    let userObj;
    let id = req.params.id;
    fs.readFile('server/data/userdata.json', 'utf8', function (err,data) {
      if (err) {
        console.log(err);
      } else {
        userObj = JSON.parse(data);
        let editUser = userObj.find(x => x.id == id);
        editUser.name = req.body.name;
        editUser.email = req.body.email;
        editUser.role = req.body.role;
        let userJson = JSON.stringify(userObj);
        fs.writeFile('server/data/userdata.json', userJson, 'utf-8', function (err) {
          if (err) throw err;
          //Send response that registration was successful.
          res.send(editUser);
        });
      }
    });
  });

  // PUT endpoint API for editing a user
  // app.put('/api/user/:id', function (req, res) {
  //   console.log('Update User', req.body.name);
  //   let id = req.params.id;
  //   let editUser = users.find(x => x.id == id);
  //   editUser.name = req.body.name;
  //   editUser.email = req.body.email;
  //   editUser.role = req.body.role;
  //   res.send(editUser);
  // });

  // DELETE endpoint API for deleting a user
  app.delete('/api/user/:id', function (req, res) {
    console.log('Delete User');
    let userObj;
    let id = req.params.id;
    fs.readFile('server/data/userdata.json', 'utf8', function (err,data) {
      if (err) {
        console.log(err);
      } else {
        userObj = JSON.parse(data);
        let u = userObj.find(x => x.id == id);
        userObj = userObj.filter(x => x.id != id);
        let userJson = JSON.stringify(userObj);
        fs.writeFile('server/data/userdata.json', userJson, 'utf-8', function (err) {
        if (err) throw err;
          //Send response that registration was successful.
          res.send(u);
        });
      }
    });
  });

  // DELETE endpoint API for deleting a user
  // app.delete('/api/user/:id', function (req, res) {
  //   console.log('Delete User');
  //   let id = req.params.id;
  //   let u = users.find(x => x.id == id);
  //   users = users.filter(x => x.id != id);
  //   res.send(u);
  // });

};
