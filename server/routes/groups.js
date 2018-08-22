module.exports = function(app,fs) {

  // GET endpoint API for getting groups
  app.get('/api/groups', function (req, res) {
    console.log('Get Groups');
    let groupArray;
    //Read data from JSON File
    fs.readFile('server/data/group.json', 'utf8', function (err, data) {
      if (err) {
        console.log(err);
        //Some error happened opened the file. No success.
        res.send({"ok": false});
      } else {
        groupArray = JSON.parse(data);
        //Return group data
        res.send({groups: groupArray});
      }
    });
  });

  // POST endpoint API for creating a new group
  app.post('/api/groups', function (req, res) {
    console.log('Create Group');
    let groupArray;
    //Read data from JSON file
    fs.readFile('server/data/group.json', 'utf8', function (err,data) {
      if (err) {
        console.log(err);
      } else {
        groupArray = JSON.parse(data);
        if (groupArray.find(group => group.name === req.body.name)) {
          // Group exists
          res.send({"ok": false});
        } else {
          // Find next available id
          let id = 1;
          if (groupArray.length > 0) {
            let maximum = Math.max.apply(Math, groupArray.map(function (found) {
              return found.id;
            }));
            id = maximum + 1;
          }
          let newGroup = {"id": id, "name": req.body.name, "channel": req.body.channel};
          groupArray.push(newGroup);
          let groupJson = JSON.stringify(groupArray);
          //Write data to JSON file
          fs.writeFile('server/data/group.json', groupJson, 'utf-8', function (err) {
            if (err) throw err;
            //Return Created Group
            res.send(newGroup);
          });
        }
      }
    });
  });

  // PUT endpoint API for editing a group
  app.put('/api/groups/:id', function (req, res) {
    console.log('Edit Group');
    let groupArray;
    let id = req.params.id;
    //Read data from JSON file
    fs.readFile('server/data/group.json', 'utf8', function (err,data) {
      if (err) {
        console.log(err);
      } else {
        groupArray = JSON.parse(data);
        //Find group to be edited
        let editGroup = groupArray.find(group => group.id == id);
        editGroup.name = req.body.name;
        editGroup.channel = req.body.channel;
        let groupJson = JSON.stringify(groupArray);
        //Write data to JSON file
        fs.writeFile('server/data/group.json', groupJson, 'utf-8', function (err) {
          if (err) throw err;
          //Return edited Group
          res.send(editGroup);
        });
      }
    });
  });

  // DELETE endpoint API for deleting a group
  app.delete('/api/groups/:id', function (req, res) {
    console.log('Delete Group');
    let groupArray;
    let id = req.params.id;
    //Read data from JSON file
    fs.readFile('server/data/group.json', 'utf8', function (err,data) {
      if (err) {
        console.log(err);
      } else {
        groupArray = JSON.parse(data);
        //Find group to be deleted
        let deleteGroup = groupArray.find(group => group.id == id);
        //Set new group array less item to be deleted
        groupArray = groupArray.filter(group => group.id != id);
        let groupJson = JSON.stringify(groupArray);
        //Write data to JSON file
        fs.writeFile('server/data/group.json', groupJson, 'utf-8', function (err) {
          if (err) throw err;
          //Return deleted Group.
          res.send(deleteGroup);
        });
      }
    });
  });

};
