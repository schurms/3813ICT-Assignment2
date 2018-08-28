module.exports = function(app,fs) {

  // GET endpoint API for getting all channels
  app.get('/api/channel', function (req, res) {
    console.log('Get Channels');
    let channelArray;
    //Read data from JSON file
    fs.readFile('server/data/channel.json', 'utf8', function (err, data) {
      if (err) {
        console.log(err);
        //Some error happened opened the file. No success.
        res.send({"ok": false});
      } else {
        channelArray = JSON.parse(data);
        //Return channels
        res.send({channels: channelArray});
      }
    });
  });

  // GET endpoint API for getting a specific channel
  app.get('/api/channel/:id', function (req,res) {
    console.log('Get Channel');
    let id = req.params.id;
    let channelArray;
    //Read data from JSON File
    fs.readFile('server/data/channel.json', 'utf8', function (err, data) {
      if (err) {
        console.log(err);
        //Some error happened opened the file. No success.
        res.send({"ok": false});
      } else {
        channelArray = JSON.parse(data);
        //Retrieve Channel - must exist
        let foundChannel = channelArray.find(channel => channel.id == id);
        res.send({channel: foundChannel});
      }
    });
  });

  // POST endpoint API for creating a new channel
  app.post('/api/channel', function (req, res) {
    console.log('Create Channel');
    let channelArray;
    //Read data from JSON file
    fs.readFile('server/data/channel.json', 'utf8', function (err,data) {
      if (err) {
        console.log(err);
      } else {
        channelArray = JSON.parse(data);
        if (channelArray.find(channel => channel.name === req.body.name)) {
          // Channel exists
          res.send({"ok": false});
        } else {
          // Determine next available id
          let id = 1;
          if (channelArray.length > 0) {
            let maximum = Math.max.apply(Math, channelArray.map(function (found) {
              return found.id;
            }));
            id = maximum + 1;
          }
          // Define empty array for users when created
          let user = [];
          let newChannel = {"id": id, "name": req.body.name, "user": user};
          channelArray.push(newChannel);
          let channelJson = JSON.stringify(channelArray);
          //Write data to JSON file
          fs.writeFile('server/data/channel.json', channelJson, 'utf-8', function (err) {
            if (err) throw err;
            //Return created channel
            res.send(newChannel);
          });
        }
      }
    });
  });

  // PUT endpoint API for editing a channel
  app.put('/api/channel/:id', function (req, res) {
    console.log('Edit Channel');
    let channelArray;
    let id = req.params.id;
    //Read data from JSON file
    fs.readFile('server/data/channel.json', 'utf8', function (err,data) {
      if (err) {
        console.log(err);
      } else {
        channelArray = JSON.parse(data);
        let editChannel = channelArray.find(channel => channel.id == id);
        editChannel.name = req.body.name;
        editChannel.user = req.body.user;
        let channelJson = JSON.stringify(channelArray);
        //Write data to JSON file
        fs.writeFile('server/data/channel.json', channelJson, 'utf-8', function (err) {
          if (err) throw err;
          //Return edited Channel
          res.send(editChannel);
        });
      }
    });
  });

  // DELETE endpoint API for deleting a channel
  app.delete('/api/channel/:id', function (req, res) {
    console.log('Delete Channel');
    let channelArray;
    let id = req.params.id;
    //Read data from JSON File
    fs.readFile('server/data/channel.json', 'utf8', function (err,data) {
      if (err) {
        console.log(err);
      } else {
        channelArray = JSON.parse(data);
        let deleteChannel = channelArray.find(channel => channel.id == id);
        //Set array to all data less deleted item
        channelArray = channelArray.filter(channel => channel.id != id);
        let channelJson = JSON.stringify(channelArray);
        //Write data to JSON File
        fs.writeFile('server/data/channel.json', channelJson, 'utf-8', function (err) {
          if (err) throw err;
          //Return deleted channel
          deleteAllGroupChannel(id);
          res.send(deleteChannel);
        });
      }
    });
  });

  // DELETE selected channel from all user elements in Group Data
  function deleteAllGroupChannel(id) {
    console.log('Delete Channel from Groups Data');
    let groupsArray;
    //Read data from JSON file
    fs.readFile('server/data/group.json', 'utf8', function (err,data) {
      if (err) {
        console.log(err);
      } else {
        groupsArray = JSON.parse(data);
        // Filter out all channels that are being deleted
        groupsArray.forEach(function(object) {
          object.channel = object.channel.filter(channel => channel.id != id);
        });
        let groupJson = JSON.stringify(groupsArray);
        //Write data to JSON file
        fs.writeFile('server/data/group.json', groupJson, 'utf-8', function (err) {
          if (err) throw err;
        });
      }
    });
  }

};
