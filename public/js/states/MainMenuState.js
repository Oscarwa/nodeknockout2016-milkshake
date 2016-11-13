import LobbyState from 'states/LobbyState'
import GameState from 'states/GameState'
import { socketEvent, sendName, socketListen } from 'utils/sockets'
import globals from 'utils/globals'
import constants from 'utils/constants'

class MainMenuState extends Phaser.State {
  create() {
    globals.username = ''

    // GAME MENU BACKGROUND
    var splashMenu = this.game.add.image(0,0, 'splashMenu');

    const backspace = this.game.input.keyboard.addKey(Phaser.KeyCode.BACKSPACE)
    backspace.onDown.add(this.deleteCharFromName, this)

    const enter = this.game.input.keyboard.addKey(Phaser.KeyCode.ENTER)
    enter.onDown.add(this.onEnter, this)

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
    this.nameMsg = this.game.make.bitmapData(800, 500)
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

    //Ready button
    this.button = this.game.add.button(this.game.world.centerX + 200, 280, 'button', this.onGo, this, 2, 1, 0)
    this.button.visible = false;

    this.game.input.keyboard.addCallbacks(this, null, null, this.keyPress)

    // this.game.state.add('lobby', LobbyState);
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

  onEnter() {
    sendName(globals.username)
    this.game.state.start('game')
  }

  preload() {
    this.game.load.image('splashMenu', 'img/splash.png');
    this.game.load.image('button', 'img/ready-btn.png');
    this.game.load.spritesheet('button', 'img/go-btn.png', 149, 75)
  }
}

export default MainMenuState
