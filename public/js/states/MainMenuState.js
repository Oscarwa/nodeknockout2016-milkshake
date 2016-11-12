import MainState from 'states/MainState'
import { socketEvent } from 'utils/sockets'

const constants = {
  ENTER_NAME_MSG: 'Please enter your name'
}

class MainMenuState extends Phaser.State {
  create() {
    this.username = ''

    const backspace = this.game.input.keyboard.addKey(Phaser.KeyCode.BACKSPACE)
    backspace.onDown.add(this.deleteCharFromName, this)

    const enter = this.game.input.keyboard.addKey(Phaser.KeyCode.ENTER)
    enter.onDown.add(this.saveName, this)

    this.namesList = this.game.make.bitmapData(800, 600)
    this.namesList.context.font = '16px Arial'
    this.namesList.context.fillStyle = '#ffffff'
    this.namesList.addToWorld()

    this.nameMsg = this.game.make.bitmapData(800, 200)
    this.nameMsg.context.font = '32px Arial'
    this.nameMsg.context.fillStyle = '#ffffff'
    this.nameMsg.context.fillText(constants.ENTER_NAME_MSG, 64, 64)
    this.nameMsg.addToWorld()

    this.bmd = this.game.make.bitmapData(800,200)
    this.bmd.context.font = '64px Arial'
    this.bmd.context.fillStyle = '#ffffff'
    this.bmd.context.fillText('me', 64, 128)
    this.bmd.addToWorld()

    this.game.input.keyboard.addCallbacks(this, null, null, this.keyPress)

    this.game.state.add('main', MainState);
  }

  deleteCharFromName() {
    this.username = this.username.slice(0, this.username.length-1)
    this.bmd.cls()
    this.bmd.context.fillText(this.username, 64, 128)
  }

  keyPress(char) {
    this.username += char
    this.bmd.cls()
    this.bmd.context.fillText(this.username, 64, 128)
  }

  saveName() {
    this.name = this.username
    alert(`Saved your name as:${this.name}`)
    socketEvent('saveName', this.name)
    this.bmd.cls()
    this.nameMsg.cls()
    this.game.state.start('main')
  }
}

export default MainMenuState