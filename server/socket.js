module.exports = function(app, io) {

  console.log("Server Socket Initialised");

  io.on('connection',(socket) => {console.log('user connection');

      socket.on('disconnect',function() {
        console.log('user disconnection');
      });

      socket.on('add-message',(message) => {
        io.emit('message',{type:'new-message',text:message});
      });
  });

};
