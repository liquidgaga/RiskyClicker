
    var
        port        = process.env.PORT || 4004,
        io              = require('socket.io'),
        express         = require('express'),
        http            = require('http'),
        app             = express(),
        server          = http.createServer(app);

    server.listen(port)

    console.log('Listening on port ' + port );

	app.use(express.static(__dirname + '/Client'));
	
    app.get( '/', function( req, res ){
        console.log('Trying to load %s', __dirname + '\\..\\Client\\index.html\n');
        res.sendfile( 'Client\\index.html' , { root: '../' });
    });