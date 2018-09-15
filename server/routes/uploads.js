module.exports = function(app, formidable) {

  //Route to update images
  app.post('/api/upload', (req, res) => {
    let form = new formidable.IncomingForm();
    form.uploadDir = './public/images';
    form.keepExtensions = true;

    form.on('error', function(err) {
      res.send({
        result: "failed",
        data: {},
        numberOfImages: 0,
        message: "Cannot upload images. Error is :" + err
      });
    });

    form.on('fileBegin', function(name, file) {
      // Rename the incoming file to the file's name
      file.path = form.uploadDir + "/" + file.name;
    });

    form.on('file', function(field, file) {
      res.send({
        result: 'OK',
        data: {'filename':file.name,'size':file.size},
        numberOfImages:1,
        message:"Upload Successful"
      });
    });

    form.parse(req);

  });
};
