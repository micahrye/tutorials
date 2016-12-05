'use strict';

const client = require('net').Socket();

const HOST = 'localhost';
const PORT = 4242;

function done () {
  // Half-closes the socket. i.e., it sends a FIN packet.
  // It is possible the server will still send some data.
  client.end();
  // a bit of overkill, but wanted to include it.
  process.exit();
}

client.connect({host: HOST, port: PORT}, (err) => {
  if (err) {
    console.log(err.message, err.stack);
  }
  console.log(`client connected to ${HOST}:${PORT}`);
});

client.on('connect', (err) => {
  console.log('connected');
  client.write('The clients says hello');

  process.stdin.on('data', function (data) {
    const text = data.toString();
    client.write(text);
    if (text === 'quit\n') {
      done();
    }
  });

});

client.on('data', (data) => {
  console.log(`server says: \"${data}\"`);
});

client.on('end', (data) => {
  console.log('server sent FIN');
});

client.on('close', () => {
  console.log('Connection closed');
});
