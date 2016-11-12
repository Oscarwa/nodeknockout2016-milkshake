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
    }
  }
}

module.exports = {
  initTarget: initTarget
}