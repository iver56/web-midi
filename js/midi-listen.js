var midi = require('midi'),
	http = require('http'),
    sockjs = require('sockjs'),
    midiServer = sockjs.createServer(),
    connections = [];

midiServer.on('connection', function(conn) {
  console.log('Listener connected');
  connections.push(conn);
  
  conn.on('close', function() {
    connections.splice(connections.indexOf(conn), 1); // remove the connection
    console.log('Lost connection to listener');
  });
});

var localhost = http.createServer();
midiServer.installHandlers(localhost, {prefix:'/midiServer'});
localhost.listen(5555, '0.0.0.0');
console.log('localhost:5555/midiServer');

// Set up a new midi input.
var midiInput = new midi.input();

// Count the available midi input ports.
midiInput.getPortCount();

// Get the name of a specified midi input port.
midiInput.getPortName(0);

// Configure a callback.
midiInput.on('message', function(deltaTime, message) {
	console.log('m:' + message + ' d:' + deltaTime);
	// write the message to all connected clients
	for (var i=0; i<connections.length; i++) {
		connections[i].write(message);
	}
});

// Open the first available midi input port.
midiInput.openPort(0);

setTimeout(function() {
	// Close the port when done.
	console.log('Closed midi port')
	midiInput.closePort();
}, 7200000); //2 hours
