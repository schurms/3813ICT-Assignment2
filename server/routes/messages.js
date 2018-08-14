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

  app.get("/api/messages", (req, res, next) => {
    const messages = [
      {
        id: 'fadf12421l',
        title: 'First server-side post',
        content: 'This is coming from the server'
      },
      {
        id: 'ksajflaj132',
        title: 'Second server-side post',
        content: 'This is coming from the server!'
      }
    ];
    res.status(200).json({
      message: 'Messages fetched successfully!',
      messages: messages
    });
  });

//Route to manage message posts
  app.post("/api/messages",(req,res, next) => {
    const post = req.body;
    console.log(post);
    res.status(201).json({
      message: 'Post added Successfully'
    });
  });

};
