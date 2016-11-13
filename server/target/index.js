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
    bonus: Math.random() > 0.7
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

function bonusHandler(socket, io) {
  socket.on('bonus', function(type) {
    console.log(type)
    switch (type) {
      case 'bomb':
        var points = Math.floor(Math.random() * 200);
        _.each(UI.getUsers(), function(user) {
          if(user.id !== socket.id) {
            user.points -= points;
            if(user.points < 0) {
              user.points = 0;
            }
          }
        });
        io.emit('pointsUpdated', UI.getUsers())
        break;
      case 'lighting':
        socket.broadcast.emit('bonus', 'lighting')
        break;
      case 'timer':
        socket.emit('bonus', 'timer')
        break;
      case 'bonus':
        //console.log('bonus')
        var currentUser = _.find(UI.getUsers(), function(user){
          return user.id === socket.id
        })
        //console.log(currentUser)
        if(currentUser) currentUser.points += Math.floor(Math.random() * 200)
        io.emit('pointsUpdated', UI.getUsers())
        break;
      default:

    }
  })
}

module.exports = {
  targetHandlers: targetHandlers,
  bonusHandler: bonusHandler,
  initTarget: initTarget
}
