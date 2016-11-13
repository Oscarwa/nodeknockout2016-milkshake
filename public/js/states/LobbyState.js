import GameState from 'states/GameState'
import { socketListen, sendStartGame, sendName } from 'utils/sockets'
import NamesList from 'objects/NamesList'
import globals from 'utils/globals'

class LobbyState extends Phaser.State {
  create() {  
    const enter = this.game.input.keyboard.addKey(Phaser.KeyCode.ENTER)
    enter.onDown.add(this.onEnter, this) 

    this.lobbyMsg = this.game.add.text(64, 64, 'Lobby', {
      font: '26px Schoolbell',
      fill: '#ffffff'
    })
    this.playersMsg = this.game.add.text(64, 130, 'Players Ready:', {
      font: '30px Schoolbell',
      fill: '#ffffff'
    })

    this.lobbyNamesList = new NamesList(this.game, 64, 200, '')

    this.game.state.add('game', GameState)

    socketListen('gameStarting', this.startGame)
    sendName(globals.username)
  }

  startGame = () => {
    this.lobbyNamesList.destroy(true)
    this.game.state.start('game')    
  }

  onEnter() {
    sendStartGame()
  }
}

export default LobbyState