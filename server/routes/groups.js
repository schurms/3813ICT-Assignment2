module.exports = function(app,path){

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
  });

  app.get("/api/groups", (req, res, next) => {
    const groups = [
      {
        id: '1',
        name: 'Group One'
      },
      {
        id: '2',
        title: 'Group Two'
      }
    ];
    res.status(200).json({
      group: 'Groups fetched successfully!',
      groups: groups
    });
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
