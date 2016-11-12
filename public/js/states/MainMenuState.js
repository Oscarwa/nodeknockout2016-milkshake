import GameState from 'states/GameState'
import { sendName } from 'utils/sockets'
import globals from 'utils/globals'
import constants from 'utils/constants'


class MainMenuState extends Phaser.State {
  create() {
    globals.username = ''

    const backspace = this.game.input.keyboard.addKey(Phaser.KeyCode.BACKSPACE)
    backspace.onDown.add(this.deleteCharFromName, this)

    const enter = this.game.input.keyboard.addKey(Phaser.KeyCode.ENTER)
    enter.onDown.add(this.saveName, this)

    this.nameMsg = this.game.make.bitmapData(800, 200)
    this.nameMsg.context.font = '32px Schoolbell'
    this.nameMsg.context.fillStyle = '#ffffff'
    this.nameMsg.context.fillText(constants.ENTER_NAME, 64, 64)
    this.nameMsg.addToWorld()

    this.bmd = this.game.make.bitmapData(800,200)
    this.bmd.context.font = '64px Schoolbell'
    this.bmd.context.fillStyle = '#ffffff'
    this.bmd.context.fillText('', 64, 128)
    this.bmd.addToWorld()

    this.game.input.keyboard.addCallbacks(this, null, null, this.keyPress)

    this.game.state.add('game', GameState);
  }

  deleteCharFromName() {
    globals.username = globals.username.slice(0, globals.username.length-1)
    this.bmd.cls()
    this.bmd.context.fillText(globals.username, 64, 128)
  }

  keyPress(char) {
    globals.username += char
    this.bmd.cls()
    this.bmd.context.fillText(globals.username, 64, 128)
  }

  saveName() {
    sendName(globals.username)
    this.bmd.cls()
    this.nameMsg.cls()
    this.game.state.start('game')
  }
}

export default MainMenuState
