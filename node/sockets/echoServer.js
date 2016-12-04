'use strict';

const net = require('net');

const HOST = 'localhost';
const PORT = 4242;

const server = net.createServer(function(socket) {
  console.log('client established connection at: ' + socket.remoteAddress +':'+ socket.remotePort);

  socket.on('data', function(data) {
    console.log(`client@${socket.remoteAddress}: ${data}`);
    // Write the data back to the socket, the client will receive it as data from the server
    socket.write(`echo: ${data}`);
  });

  // Add a 'close' event handler to this instance of socket
  socket.on('close', function(data) {
    console.log('CLOSED: ' + socket.remoteAddress +' '+ socket.remotePort);
  });

});
server.listen({port: PORT, host: HOST}, () => {
  console.log('socket echo server listening');
});
