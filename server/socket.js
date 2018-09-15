module.exports = function(app, io) {

  console.log("Server Socket Initialised");

  io.on('connection',(socket) => {console.log('user connection');

    socket.on('disconnect',(channel) => {
      socket.leave('Travel');
        io.in('Travel').emit('message',{type:'new-message',text:channel});

    });

    socket.on('room', (channel) => {
      socket.join(channel);
      io.emit('message',{type:'new-message',text:channel});
    });

    socket.on('add-message',(message) => {
      io.emit('message',{type:'new-message',text:message});
    });
  });

};
