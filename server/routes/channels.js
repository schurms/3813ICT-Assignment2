module.exports = function(app,fs) {

  // Sample Channel Data
  let channels = [
    {id: 1, name: 'Desktops'},
    {id: 2, name: 'Monitors/video'},
    {id: 3, name: 'Notebooks'},
    {id: 4, name: 'Peripherals'},
    {id: 5, name: 'Windows'},
    {id: 6, name: 'Apple'}];

  // GET endpoint API for getting all channels
  app.get("/api/channels", function (req, res) {
    res.send({channels: channels});
  });

  // POST endpoint API for creating a new channel
  app.post('/api/channels', function (req, res) {
    console.log('Create Channel');
    // calculate the next ID
    let id = 1;
    if (channels.length > 0) {
      let maximum = Math.max.apply(Math, channels.map(function (f) { return f.id; }));
      id = maximum + 1;
    }
    let newChannel = {"id": id, "name": req.body.name};
    channels.push(newChannel);
    res.send(newChannel);
  });

  // PUT endpoint API for editing a channel
  app.put('/api/channels/:id', function (req, res) {
    console.log('Update Channel', req.body.name);
    let id = req.params.id;
    let editChannel = channels.find(x => x.id == id);
    editChannel.name = req.body.name;
    res.send(editChannel);
  });

  // DELETE endpoint API for deleting a channel
  app.delete('/api/channels/:id', function (req, res) {
    console.log('Delete Channel');
    let id = req.params.id;
    let channel = channels.find(x => x.id == id);
    channels = channels.filter(x => x.id != id);
    res.send(channel);
  });



};
