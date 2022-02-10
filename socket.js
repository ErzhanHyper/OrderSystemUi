var app = require('express')();
// var cors = require('cors');
// var https = require('https');
var http = require('http');

const fs = require('fs');
var socketio = require('socket.io');

var server = http.Server(app);
var io = socketio(server, {
    cors: {
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ['websocket', 'polling']
});


// const server = https.createServer({
//   key: fs.readFileSync('./ssl/private.pem'),
//   cert: fs.readFileSync('./ssl/public.pem'),
//   rejectUnauthorized: true,
//   origins: '*:*'
// },app);

// const io = require('socket.io-client')(server);

var Redis = require('ioredis');
var redis = new Redis();

// app.use(cors());

redis.subscribe('main-channel', function (err, count) {
	console.log("connected" + err + ":" + count);
});


redis.on('message', function(channel, message) {
  message = JSON.parse(message);
  io.emit(channel + ':' + message.event, message.data);
});

server.listen(5000, function(){
    console.log('Listening on Port 5000');
});
