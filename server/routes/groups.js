module.exports = function(app,path){

  // app.use((req, res, next) => {
  //   res.setHeader("Access-Control-Allow-Origin", "*");
  //   res.setHeader(
  //     "Access-Control-Allow-Headers",
  //     "Origin, X-Requested-With, Content-Type, Accept"
  //   );
  //   res.setHeader(
  //     "Access-Control-Allow-Methods",
  //     "GET, POST, PATCH, DELETE, OPTIONS"
  //   );
  //   next();
  // });

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

  app.get("/api/groups", (req, res, next) => {
    res.send({groups: groups});
  });


//Route to manage group posts
  app.post("/api/groups",(req,res, next) => {
    const group = req.body;
    console.log(group);
    res.status(201).json({
      group: 'Group added Successfully'
    });
  });

};
