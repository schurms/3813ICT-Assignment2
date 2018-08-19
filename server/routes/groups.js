module.exports = function(app) {

  // Sample Group Data
  let groups = [
    {
      id: 1,
      name: 'Group One1',
      channel: [
        { id: 1, name: 'Channel 1'},
        { id: 2, name: 'Channel 2'}
      ]},
    {
      id: 2,
      name: 'Group Two2',
      channel: [
        { id: 3, name: 'Channel 3'},
        { id: 4, name: 'Channel 4'}
      ]},
    {
      id: 3,
      name: 'Group Three3',
      channel: [
        { id: 5, name: 'Channel 5'},
        { id: 6, name: 'Channel 6'}
      ]},
    {
      id: 4,
      name: 'Group Four4',
      channel: [
        { id: 7, name: 'Channel 7'},
        { id: 8, name: 'Channel 8'}
      ]}];

  // GET endpoint API for getting groups
  app.get("/api/groups", function (req, res) {
    res.send({groups: groups});
  });

  // POST endpoint API for creating a new group
  app.post('/api/groups', function (req, res) {
    console.log('Create Group');
    // calculate the next ID
    let id = 1;
    if (groups.length > 0) {
      let maximum = Math.max.apply(Math, groups.map(function (f) { return f.id; }));
      id = maximum + 1;
    }
    let newGroup = {"id": id, "name": req.body.name, "channel": req.body.channel};
    groups.push(newGroup);
    res.send(newGroup);
  });

  // PUT endpoint API for editing a group
  app.put('/api/groups/:id', function (req, res) {
    console.log('Update Group', req.body.name);
    let id = req.params.id;
    let editGroup = groups.find(x => x.id == id);
    editGroup.name = req.body.name;
    editGroup.channel = req.body.channel;
    res.send(editGroup);
  });

  // DELETE endpoint API for deleting a group
  app.delete('/api/groups/:id', function (req, res) {
    console.log('Delete Group');
    let id = req.params.id;
    let g = groups.find(x => x.id == id);
    groups = groups.filter(x => x.id != id);
    res.send(g);
  });

};
