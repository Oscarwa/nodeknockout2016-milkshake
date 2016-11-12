function targetHandlers(socket, io){
  socket.on('shoot', function(data) {
    currentTarget = helpers.initTarget()
    io.emit('shoot', {data: data, target: currentTarget});
  });
}

module.exports = {
  targetHandlers: targetHandlers
}
