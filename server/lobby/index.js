var gameRunning = false

function lobbyHandlers(socket, io) {
  socket.on('startGame', function(data) {
    setTimeout(function(){
      console.log('sending game over')
      io.emit('gameOver')
      gameRunning = false
    }, 90000)
    if(!gameRunning) {
      io.emit('gameStarting')
      gameRunning = true
    }
  })
}

function isGameRunning(){
  return gameRunning
}

module.exports = {
  lobbyHandlers: lobbyHandlers,
  isGameRunning: isGameRunning
}