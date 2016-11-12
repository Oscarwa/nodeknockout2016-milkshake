import MainMenuState from 'states/MainMenuState'

class Game extends Phaser.Game {
  constructor() {
    super(500, 500, Phaser.AUTO, 'content', null)
    this.state.add('MainMenuState', MainMenuState, false)
    this.state.start('MainMenuState')
  }
}

new Game()