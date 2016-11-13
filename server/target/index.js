var _ = require('lodash')
var UI = require('../UI')

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
    },
    bonus: Math.random() > 0.5
  }
}

function targetHandlers(socket, io){
  socket.on('shoot', function(data) {
    var currentUser = _.find(UI.getUsers(), function(user){
      return user.id === socket.id
    })
    if(currentUser) currentUser.points+=50
    currentTarget = initTarget()
    io.emit('pointsUpdated', UI.getUsers())
    io.emit('shoot', {data: data, target: currentTarget});
  });
}

module.exports = {
  targetHandlers: targetHandlers,
  initTarget: initTarget
}
