import { sendRestart } from 'utils/sockets'
import MainMenuState from 'states/MainMenuState'

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
    this.restart.inputEnabled = true;
    this.restart.input.enableDrag();
    this.restart.events.onInputDown.add(this.onRestart, this)
    this.gameoverMsg.anchor.setTo(0.5, 0.5)
    this.restart.anchor.setTo(0.5, 0.5)
    this.game.state.add('mainMenu', MainMenuState)
  }

  onRestart = () => {
    sendRestart()
    this.game.state.start('lobby')
    location.reload();
  }

}

export default GameOverState
