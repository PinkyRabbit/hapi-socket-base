const socketIO = require('socket.io');

const connectSocketIO = (server) => {
  const io = socketIO.listen(server.listener);
  const clients = [];

  io.on('connection', (socket) => {
    clients.push(socket);

    setInterval(() => {
      socket.emit('greeting-from-server', {
        greeting: 'Hello Client',
      });
    }, 60000);

    socket.on('greeting-from-client', (message) => {
      console.log(message);
    });

    socket.on('message', (message) => {
      clients.forEach((client) => client.send(message));
    });

    socket.on('disconnect', (test) => {
      console.log('test');
      console.log(test);
      // const disconnectedIndex = clients.findIndex((client) => client.id);

      // for (var i = 0; i < sockets.length; i++) {
      //   if (sockets[i].id === socket.id) {
      //     sockets.splice(i, 1);
      //   }
      // }
      console.log('The socket disconnected');
    });
  });
};

module.exports = {
  connectSocketIO,
};
