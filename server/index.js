var express = require('express')
var socket_io = require('socket.io');
var app = express()
var _ = require('lodash')

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/../dist'))

var server = app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

app.io = socket_io(server);

const users = []

app.get('/users/list', function(req, res){
  users = _.filter(users, (user) => {
    return user.name
  })
  res.send(users)
})
// socket io events
app.io.on('connection', function(socket) {

  const userData = {
    id: socket.id
  }

  users.push(userData)

  socket.on('shoot', function(data) {
    console.info(data);
    socket.emit('shoot', data);
  });

  socket.on('nameChanged', function(name) {
    userData.name = name
    socket.broadcast.emit('namesUpdated', users)
  })

  socket.on('targetClicked', function(data) {
    console.log('targetClicked', data)
    socket.emit('shoot', data);
    socket.emit('namesUpdated', users)
  })

  socket.on('disconnect', function(data) {
    users = _.reject(users, function(user){
      return user.id === socket.id
    })
    socket.broadcast.emit('namesUpdated', users)
  })

});
