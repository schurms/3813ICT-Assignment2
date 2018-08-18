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

//Route to manage user login
  app.post("/api/login",(req,res, next) => {
    if(req.body.name === "jordan" || req.body.name === "bill" || req.body.name == "super") {
      res.send({
        "ok": true
      });
    } else {
      res.send({
        "ok" : false,
        errors: {"credentials": "invalid username"}
      })
    }
  });

};
