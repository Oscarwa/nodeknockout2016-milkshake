import GameState from 'states/GameState'
import { socketListen, sendStartGame, sendName } from 'utils/sockets'
import NamesList from 'objects/NamesList'
import globals from 'utils/globals'

class LobbyState extends Phaser.State {
  create() {
    this.game.add.image(0,0, 'lobby');

    const enter = this.game.input.keyboard.addKey(Phaser.KeyCode.ENTER)
    enter.onDown.add(this.onEnter, this)

    this.lobbyMsg = this.game.add.text(64, 64, 'Lobby', {
      font: '45px Schoolbell',
      fill: '#ffffff'
    })
    this.playersMsg = this.game.add.text(64, 130, 'Press [ENTER] to start game \nfor all players', {
      font: '30px Schoolbell',
      fill: '#ffffff'
    })

    this.lobbyNamesList = new NamesList(this.game, 64, 230, '')

    this.game.state.add('game', GameState)

    socketListen('gameStarting', this.startGame)
    sendName(globals.username)

    //tions
    this.target = this.game.add.sprite(600, 90, 'target');
    this.target.anchor.set(0.5);
    this.target.scale.set(0.15);
    this.game.add.text(700, 50, 'Normal target', {
      font: '26px Schoolbell',
      fill: '#ffffff'
    })
    this.game.add.text(700, 80, 'It gives you 50 points if you \nhit it before your enemies', {
      font: '16px Schoolbell',
      fill: '#ffffff'
    })

    this.target = this.game.add.sprite(600, 190, 'blueTarget');
    this.target.anchor.set(0.5);
    this.target.scale.set(0.15);
    this.game.add.text(700, 145, 'Bonus target', {
      font: '26px Schoolbell',
      fill: '#ffffff'
    })
    this.game.add.text(700, 175, 'It gives you 50 points and an item if you\nhit it before your enemies', {
      font: '16px Schoolbell',
      fill: '#ffffff'
    })
    this.game.add.text(700, 220, 'items are used with [SPACE]', {
      font: '19px Schoolbell',
      fill: '#e4ff19'
    })


    this.game.add.sprite(570, 260, 'bomb').scale.set(0.8);
    this.game.add.text(700, 260, 'Bomb', {
      font: '26px Schoolbell',
      fill: '#ffffff'
    })
    this.game.add.text(700, 290, 'Explodes on enemies taking \ndown their score', {
      font: '16px Schoolbell',
      fill: '#ffffff'
    })

    this.game.add.sprite(565, 350, 'timer').scale.set(0.8);
    this.game.add.text(700, 345, 'Timer', {
      font: '26px Schoolbell',
      fill: '#ffffff'
    })
    this.game.add.text(700, 375, 'Slow down your target\'s speed\nfor the next 10 targets', {
      font: '16px Schoolbell',
      fill: '#ffffff'
    })

    this.game.add.sprite(570, 425, 'bonus').scale.set(0.8);
    this.game.add.text(700, 435, 'Score++', {
      font: '26px Schoolbell',
      fill: '#ffffff'
    })
    this.game.add.text(700, 465, 'Gives you some extra score points', {
      font: '16px Schoolbell',
      fill: '#ffffff'
    })

    this.game.add.sprite(565, 500, 'lighting').scale.set(0.8);
    this.game.add.text(700, 500, 'Lighting', {
      font: '26px Schoolbell',
      fill: '#ffffff'
    })
    this.game.add.text(700, 530, 'Speed up your enemies target\'s speed\nfor the next 5 targets', {
      font: '16px Schoolbell',
      fill: '#ffffff'
    })
  }

  startGame = () => {
    this.lobbyNamesList.destroy(true)
    this.game.state.start('game')
  }

  preload() {
    this.game.load.image('lobby', 'img/lobby.jpg');

    this.game.load.image('bomb', 'img/bombs.png');
    this.game.load.image('timer', 'img/timer.png');
    this.game.load.image('bonus', 'img/bonus.png');
    this.game.load.image('lighting', 'img/lighting.png');

    this.game.load.image('target', 'img/target.png');
    this.game.load.image('blueTarget', 'img/blue-target.png');
  }

  onEnter() {
    sendStartGame()
  }
}

export default LobbyState
