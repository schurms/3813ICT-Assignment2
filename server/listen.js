module.exports = function(http) {

  http.listen(3000,() => {
    let d = new Date();
    let n = d.getHours();
    let m = d.getMinutes();
    console.log('Server has been started at : ' + n + ':' +m);
  });
};
