class GameOverState extends Phaser.State {
  create() {
    const center = {
      x: this.game.world.centerX,
      y: this.game.world.centerY
    }
    this.gameoverMsg = this.game.add.text(center.x, center.y-50, `Game Over`, {
      font: '100px Schoolbell',
      fill: '#fff'
    })
    this.restart = this.game.add.text(center.x, center.y + 60, `Restart?`, {
      font: '50px Schoolbell',
      fill: '#fff'
    })
    this.gameoverMsg.anchor.setTo(0.5, 0.5)
    this.restart.anchor.setTo(0.5, 0.5)
  }
}

export default GameOverState