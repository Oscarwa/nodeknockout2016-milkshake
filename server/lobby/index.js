var UI = require('../UI')

var gameRunning = false

function lobbyHandlers(socket, io) {
  socket.on('startGame', function(data) {
    setTimeout(function(){
      io.emit('gameOver')
      gameRunning = false
    }, 90000)
    if(!gameRunning) {
      io.emit('gameStarting')
      gameRunning = true
    }
  })
  socket.on('restart', function() {
    var users = UI.getUsers()
    users.forEach(function(user) {
      user.points = 0
    })
    UI.setUsers(users)
  })
}

function isGameRunning(){
  return gameRunning
}

module.exports = {
  lobbyHandlers: lobbyHandlers,
  isGameRunning: isGameRunning
}