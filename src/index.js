var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var _ = require("underscore");

var rockets = [];

function makeNewRocket(socket) {
    var rocket = {
        id: socket.id,
        position: {
            x: 0,
            y: 0
        }
    };
    rockets.push(rocket);
    socket.broadcast.emit('positionUpdate', rocket);
    console.log(rockets);
}

function requestRocketId(socket){
    io.to(socket.id).emit("rocketIdRequest", socket.id);
}

io.on('connection', function (socket) {
    requestRocketId(socket);

    socket.on('rocketIdResponse', function(data){
        //do they already have a rocket or should we add a new one!

    });

    socket.on('updatePosition', function (player) {
        socket.broadcast.emit('positionUpdate', player);
    });
    
    socket.on('disconnect', function() {
        rockets = _.reject(rockets, function(rocket){
            return rocket.id === socket.id;
        });
    });
});

app.use('/bower_components', express.static('../bower_components'));
app.use('/assets', express.static('../assets'));
app.use('/js', express.static('js'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});