var _ = require('lodash')

var users = []

var UISocketHandlers = function(socket, io){  
  var userData = {
    id: socket.id,
    points: 0
  }
  users.push(userData)

  socket.on('saveName', function(name) {
    users.push({ name: name, points: 0 })
    io.emit('namesUpdated', users)
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
}


module.exports = {
  UISocketHandlers: UISocketHandlers,
  users: users
}