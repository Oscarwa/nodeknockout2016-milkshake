import MainMenuState from 'states/MainMenuState'

class Game extends Phaser.Game {
  constructor() {
    super(1020, 600, Phaser.AUTO, 'content', null)
    this.state.add('MainMenuState', MainMenuState, false)
    this.state.start('MainMenuState')
  }
}

new Game()
