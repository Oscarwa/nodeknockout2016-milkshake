import GameState from 'states/GameState'

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
    this.game.state.add('game', GameState)

  }

  onEnter() {
    this.game.state.start('game')
  }
}

export default LobbyState