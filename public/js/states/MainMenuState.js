import GameState from 'states/GameState'
import { sendName } from 'utils/sockets'
import globals from 'utils/globals'
import constants from 'utils/constants'


class MainMenuState extends Phaser.State {
  create() {
    globals.username = ''

    // GAME MENU BACKGROUND
    var splashMenu = this.game.add.image(0,0, 'splashMenu');
    // splashMenu.scale.set(0.4);
    // splashMenu.anchor.set(0.5);

    const backspace = this.game.input.keyboard.addKey(Phaser.KeyCode.BACKSPACE)
    backspace.onDown.add(this.deleteCharFromName, this)

    const enter = this.game.input.keyboard.addKey(Phaser.KeyCode.ENTER)
    enter.onDown.add(this.saveName, this)

    // GAME NAME TEXT
    this.gameName = this.game.make.bitmapData(800)
    this.gameName.context.font = '64px Asul'
    this.gameName.context.fillStyle = '#ffffff'
    this.gameName.context.fillText(constants.GAME_NAME, 320, 80)
    this.gameName.addToWorld()
    // GAME SUBTITLE TEXT
    this.gameName = this.game.make.bitmapData(800)
    this.gameName.context.font = '30px Asul'
    this.gameName.context.fillStyle = '#ffffff'
    this.gameName.context.fillText(constants.GAME_SUBTITLE, 390, 110)
    this.gameName.addToWorld()

    // ENTER NAME TEXT
    this.nameMsg = this.game.make.bitmapData(800)
    this.nameMsg.context.font = '32px Asul'
    this.nameMsg.context.fillStyle = '#ffffff'
    this.nameMsg.context.fillText(constants.ENTER_NAME, 90, 220)
    this.nameMsg.addToWorld()

    // PLAYER NAME
    this.bmd = this.game.make.bitmapData(800, 600)
    this.bmd.context.font = '64px Asul'
    this.bmd.context.fillStyle = '#ffffff'
    this.bmd.context.fillText('', 100, 320)
    this.bmd.addToWorld()

    this.game.input.keyboard.addCallbacks(this, null, null, this.keyPress)

    this.game.state.add('game', GameState);
  }

  deleteCharFromName() {
    globals.username = globals.username.slice(0, globals.username.length-1)
    this.bmd.cls()
    this.bmd.context.fillText(globals.username, 100, 320)
  }

  keyPress(char) {
    globals.username += char
    this.bmd.cls()
    this.bmd.context.fillText(globals.username, 100, 320)
  }

  saveName() {
    sendName(globals.username)
    this.bmd.cls()
    this.nameMsg.cls()
    this.game.state.start('game')
  }

  preload() {
    this.game.load.image('splashMenu', 'img/splash.png');
  }
}

export default MainMenuState
