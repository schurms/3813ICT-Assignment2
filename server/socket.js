module.exports = function(app, io) {

  console.log("Server Socket Initialised");

  let mychannel;

  io.on('connection',(socket) => {console.log('user connection');

    socket.on('disconnect',function() {
      console.log('user disconnection');
    });

    socket.on('room', (channel) => {
      socket.join(channel);
    });

    socket.on('add-message',(message) => {
      io.emit('message',{type:'new-message',text:message});
    });
  });

};
