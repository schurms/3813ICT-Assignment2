module.exports = function(app,path){
  console.log("Routes Started");

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

//Route to manage user signin
  app.post("/api/signin",(req,res, next) => {
    if(req.body.username === "jordan" || req.body.username === "bill" || req.body.username == "super") {
      res.send({
        "ok": true
      });
    } else {
      res.send({
        "ok" : false,
        errors: {"credentials": "invalid usename"}
      })
    }
  });

};
