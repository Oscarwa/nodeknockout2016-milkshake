var _ = require('lodash')

var users = []
var guestNumber = 0

var UISocketHandlers = function(socket, io){  
  var userData = {
    id: socket.id,
    points: 0
  }
  users.push(userData)

  socket.on('nameChanged', function(name) {
    userData.name = name
    socket.emit('namesUpdated', users)
  })

  socket.on('disconnect', function(data) {
    users = _.filter(users, function(user){
      return user.id !== socket.id
    })
    console.log('users connected now', users.length)
    console.log(users)
    socket.broadcast.emit('namesUpdated', users)
  })
}

function getUsers(){
  return users
}

module.exports = {
  UISocketHandlers: UISocketHandlers,
  getUsers: getUsers
}