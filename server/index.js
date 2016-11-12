var express = require('express')
var socket_io = require('socket.io');
var app = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/../dist'))

const users = []

var server = app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

app.io = socket_io(server);

// socket io events
app.io.on('connection', function(socket) {

  socket.on('shoot', function(data) {
    console.info(data);
    socket.emit('shoot', data);
  });

  socket.on('saveName', function(name) {
    users.push({ name: name })
    console.log(users)
    socket.emit('namesUpdated', users)
  })

  socket.on('getNamesList', function(){
  })

  socket.on('targetClicked', function(data){
    console.log('targetClicked', data)
    socket.emit('shoot', data);
    socket.emit('namesUpdated', users)
  })

});
