var
	port        = process.env.PORT || 4004,
	express         = require('express'),
	http            = require('http'),
	app             = express(),
	server          = http.createServer(app),
	io              = require('socket.io');
	socket = io.listen(server);

server.listen(port)

console.log('Listening on port ' + port );

app.use(express.static(__dirname + '/Client'));

app.get( '/', function( req, res ){
	console.log('Trying to load %s', __dirname + '\\..\\Client\\index.html\n');
	res.sendfile( 'Client\\index.html' , { root: '../' });
});

// Chatroom
// Starts listening when someone connects.
socket.sockets.on('connection', function (socket) {
  // when a client emits 'message', this listens and executes
  socket.on('message', function (data) {
    // send all clients a "message" type message. Creative, I know.
    socket.broadcast.emit('message', {
      message: data
    });
  });
});