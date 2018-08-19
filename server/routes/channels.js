module.exports = function(app,path){

  let channels = [
    {id: 1, name: 'Desktops'},
    {id: 2, name: 'Monitors/video'},
    {id: 3, name: 'Notebooks'},
    {id: 4, name: 'Peripherals'},
    {id: 5, name: 'Windows'},
    {id: 6, name: 'Apple'}];

  app.get("/api/channels", (req, res, next) => {
    res.send({channels: channels});
  });

};
