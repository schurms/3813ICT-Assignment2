module.exports = function(app,fs) {

  app.get('/api/messages', function (req, res) {
    console.log('Get Messages');
    let messageArray;
    //Read data from JSON File
    fs.readFile('server/data/message.json', 'utf8', function (err, data) {
      if (err) {
        console.log(err);
        //Some error happened opened the file. No success.
        res.send({"ok": false});
      } else {
        messageArray = JSON.parse(data);
        //Return group data
        res.send({messages: messageArray});
      }
    });
  });


  // POST endpoint API for creating a new user
  app.post('/api/messages', function (req, res) {
    console.log('Create Message History');
    let messageArray;
    //Read data from JSON
    fs.readFile('server/data/message.json', 'utf8', function (err,data) {
      if (err) {
        console.log(err);
      } else {
        messageArray = JSON.parse(data);
        //Determine the next available id
        let id = 1;
        if (messageArray.length > 0) {
            let maximum = Math.max.apply(Math, messageArray.map(function (found) {
              return found.id;
            }));
            id = maximum + 1;
          }
          let channel = {
            id: req.body.channelid,
            name: req.body.channelname,
          };
          let newMsg = {"id": id, "message": req.body.message, "date": req.body.date, "user": req.body.user, "channel": channel};
          messageArray.push(newMsg);
          let msgJson = JSON.stringify(messageArray);
          //Write data to JSON
          fs.writeFile('server/data/message.json', msgJson, 'utf-8', function (err) {
            if (err) throw err;
            //Return created message
            res.send(newMsg);
          });

      }
    });
  });



};
