module.exports = function(app) {

  // Sample User Data
  let users = [
    {id: 1, name: 'super', email: '', role: ''},
    {id: 2, name: 'jordan', email: 'jordan@gmail.com', role: ''},
    {id: 3, name: 'bill', email: 'bill@gmail.com', role: 'group'},
    {id: 4, name: 'sam', email: 'sam@gmail.com', role: ''}
  ];

  // POST endpoint API for validating user login
  app.post('/api/login', function (req,res) {
    if (users.some(user => user.name === req.body.name)) {
      res.send({
        "ok": true
      });
    } else {
      res.send({
        "ok" : false,
        errors: {"credentials": "Username does not exist"}
      })
    }
  });

  // GET endpoint API for getting all users
  app.get('/api/users', function (req, res) {
    console.log('Get Users');
    res.send(users);
  });

  // POST endpoint API for creating a new user
  app.post('/api/user', function (req, res) {
    console.log('Create User');
    // calculate the next ID
    let id = 1;
    if (users.length > 0) {
      let maximum = Math.max.apply(Math, users.map(function (f) { return f.id; }));
      id = maximum + 1;
    }
    let newUser = {"id": id, "name": req.body.name, "email": req.body.email, "role": req.body.role};
    users.push(newUser);
    res.send(newUser);
  });

  // PUT endpoint API for editing a user
  app.put('/api/user/:id', function (req, res) {
    console.log('Update User', req.body.name);
    let id = req.params.id;
    let editUser = users.find(x => x.id == id);
    editUser.name = req.body.name;
    editUser.email = req.body.email;
    editUser.role = req.body.role;
    res.send(editUser);
  });

  // DELETE endpoint API for deleting a user
  app.delete('/api/user/:id', function (req, res) {
    console.log('Delete User');
    let id = req.params.id;
    let u = users.find(x => x.id == id);
    users = users.filter(x => x.id != id);
    res.send(u);
  });

};
