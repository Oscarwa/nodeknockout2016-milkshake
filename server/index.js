var express = require('express')
var socket_io = require('socket.io');
var app = express()
var _ = require('lodash')
var helpers = require('./utils/helpers')

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/../dist'))

var users = []

var server = app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

app.io = socket_io(server);

// socket io events
var currentTarget = helpers.initTarget();

app.get('/users/list', function(req, res){
  users = _.filter(users, (user) => {
    return user.name
  })
  res.send(users)
})

app.io.on('connection', function(socket) {
  var userData = {
    id: socket.id
  }

  users.push(userData)

  socket.on('init', function(data) {
    socket.emit('init', {
      target: currentTarget,
      users: users
    })
  });

  socket.on('shoot', function(data) {
    currentTarget = helpers.initTarget()
    app.io.emit('shoot', {data: data, target: currentTarget});
  });


  socket.on('saveName', function(name) {
    users.push({ name: name })
    app.io.emit('namesUpdated', users)
  })

  socket.on('nameChanged', function(name) {
    userData.name = name
    socket.broadcast.emit('namesUpdated', users)
  })

  socket.on('disconnect', function(data) {
    users = _.filter(users, function(user){
      return user.id !== socket.id
    })
    socket.broadcast.emit('namesUpdated', users)
  })

});
