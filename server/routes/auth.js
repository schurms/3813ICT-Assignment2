module.exports = function(app,fs) {

  // POST endpoint for validating if User is in system
  app.post('/api/login', function (req,res) {
    console.log('Validate Login');
    let userArray;
    //Read data from JSON File
    fs.readFile('server/data/user.json', 'utf8', function (err, data) {
      if (err) {
        console.log(err);
        //Some error happened opened the file. No success.
        res.send({"ok": false});
      } else {
        userArray = JSON.parse(data);
        //Check if exists
        if (userArray.find(user => user.name === req.body.name)) {
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
    let userArray;
    //Read data from JSON File
    fs.readFile('server/data/user.json', 'utf8', function (err, data) {
      if (err) {
        console.log(err);
        //Some error happened opened the file. No success.
        res.send({"ok": false});
      } else {
        userArray = JSON.parse(data);
        //If user exists
        let foundUser = userArray.find(user => user.name === req.body.name);
        //Return found user details
        res.send(foundUser);
      }
    });
  });

};
