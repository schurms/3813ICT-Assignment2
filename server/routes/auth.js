module.exports = function(app,fs) {

  // POST endpoint for validating if User is in system
  app.post('/api/login', function (req,res) {
    let userObj;
    fs.readFile('server/data/user.json', 'utf8', function (err, data) {
      if (err) {
        console.log(err);
        //Some error happened opened the file. No success.
        res.send({"ok": false});
      } else {
        userObj = JSON.parse(data);
        if (userObj.find(user => user.name === req.body.name)) {
          res.send({"ok": true});
        } else {
          res.send({"ok": false});
        }
      }
    });
  });

  // POST endpoint API for retrieving user credentials
  app.post('/api/authuser', function (req, res) {
    let userObj;
    fs.readFile('server/data/user.json', 'utf8', function (err, data) {
      if (err) {
        console.log(err);
        //Some error happened opened the file. No success.
        res.send({"ok": false});
      } else {
        userObj = JSON.parse(data);
        let result = userObj.find(user => user.name === req.body.name);
        res.send(result);
      }
    });
  });


};
