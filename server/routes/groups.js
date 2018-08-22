module.exports = function(app,fs) {

  // GET endpoint API for getting groups
  app.get('/api/groups', function (req, res) {
    let userObj;
    fs.readFile('server/data/group.json', 'utf8', function (err, data) {
      if (err) {
        console.log(err);
        //Some error happened opened the file. No success.
        res.send({"ok": false});
      } else {
        groupObj = JSON.parse(data);
        console.log('Get Group');
        res.send({groups: groupObj});
      }
    });
  });

  // POST endpoint API for creating a new group
  app.post('/api/groups', function (req, res) {
    console.log('Create Group');
    let groupObj;
    fs.readFile('server/data/group.json', 'utf8', function (err,data) {
      if (err) {
        console.log(err);
      } else {
        groupObj = JSON.parse(data);
        if (groupObj.find(group => group.name === req.body.name)) {
          // Group exists
          res.send({"ok": false});
        } else {
          console.log('Create Group');
          // calculate the next ID
          let id = 1;
          if (groupObj.length > 0) {
            let maximum = Math.max.apply(Math, groupObj.map(function (f) {
              return f.id;
            }));
            id = maximum + 1;
          }
          let newGroup = {"id": id, "name": req.body.name, "channel": req.body.channel};
          groupObj.push(newGroup);
          let groupJson = JSON.stringify(groupObj);
          fs.writeFile('server/data/group.json', groupJson, 'utf-8', function (err) {
            if (err) throw err;
            //Send response that registration was successful.
            res.send(newGroup);
          });
        }
      }
    });
  });

  // PUT endpoint API for editing a group
  app.put('/api/groups/:id', function (req, res) {
    console.log('Update Group');
    let groupObj;
    let id = req.params.id;
    fs.readFile('server/data/group.json', 'utf8', function (err,data) {
      if (err) {
        console.log(err);
      } else {
        groupObj = JSON.parse(data);
        let editGroup = groupObj.find(x => x.id == id);
        editGroup.name = req.body.name;
        editGroup.channel = req.body.channel;
        let groupJson = JSON.stringify(groupObj);
        fs.writeFile('server/data/group.json', groupJson, 'utf-8', function (err) {
          if (err) throw err;
          //Send response that registration was successful.
          res.send(editGroup);
        });
      }
    });
  });

  // DELETE endpoint API for deleting a group
  app.delete('/api/groups/:id', function (req, res) {
    console.log('Delete Group');
    let groupObj;
    let id = req.params.id;
    fs.readFile('server/data/group.json', 'utf8', function (err,data) {
      if (err) {
        console.log(err);
      } else {
        groupObj = JSON.parse(data);
        let g = groupObj.find(x => x.id == id);
        groupObj = groupObj.filter(x => x.id != id);
        let groupJson = JSON.stringify(groupObj);
        fs.writeFile('server/data/group.json', groupJson, 'utf-8', function (err) {
          if (err) throw err;
          //Send response that registration was successful.
          res.send(g);
        });
      }
    });
  });

};
