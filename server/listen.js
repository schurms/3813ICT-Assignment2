module.exports = function(http) {

  // set up listening on port 3000
  http.listen(3000,() => {
    let d = new Date();
    let n = d.getHours();
    let m = d.getMinutes();
    console.log('Server has been started at : ' + n + ':' +m);
  });
};
