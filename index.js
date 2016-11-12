var express = require('express')
var socket_io = require('socket.io');
var app = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/dist'))

const users = []

var server = app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

app.io = socket_io(server);

// socket io events

function initTarget() {
  return {
    points: Math.floor(Math.random() * 10) + 1,
    id: new Date().getTime(),
    velocity: {
      x: 300 + Math.floor(600 * Math.random()),
      y: 300 + Math.floor(600 * Math.random())
    },
    startPosition: {
      x: Math.floor(800 * Math.random()),
      y: Math.floor(600 * Math.random())
    }
  }
}
var currentTarget = initTarget();

app.io.on('connection', function(socket) {

  socket.on('init', function(data) {
    socket.emit('init', currentTarget)
  });

  socket.on('shoot', function(data) {
    //console.info(data);
    currentTarget = initTarget()
    app.io.emit('shoot', {data: data, target: currentTarget});
  });


  socket.on('saveName', function(name) {
    users.push({ name: name })
    app.io.emit('namesUpdated', users)
  })

  socket.on('getNamesList', function(){
  })

});
