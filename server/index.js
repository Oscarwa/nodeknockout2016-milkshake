var express = require('express')
var socket_io = require('socket.io');
var app = express()
var _ = require('lodash')

var UI = require('./UI')
var target = require('./target')

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/../dist'))

var server = app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

app.io = socket_io(server);

// socket io events
var currentTarget = target.initTarget();

app.io.on('connection', function(socket) {

  socket.on('init', function(data) {
    socket.emit('init', {
      target: currentTarget,
      users: UI.users
    })
  });

  UI.UISocketHandlers(socket, app.io)
  target.targetHandlers(socket, app.io)

});
