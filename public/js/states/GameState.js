import { socketEvent, sendTargetData, sendShootData, socketListen } from 'utils/sockets'
import globals from 'utils/globals'

class GameState extends Phaser.State {

  create() {
    //physics & setup
    this.game.stage.backgroundColor = '#3498DB';
    this.game.physics.startSystem(Phaser.Physics.Arcade);
    this.game.renderer.renderSession.roundPixels = true;

    //render target
    this.target = this.game.add.sprite(100, 120, 'target');
    this.target.anchor.set(0.5);
    this.target.scale.set(0.2);

    //users list
    this.namesList = this.game.make.bitmapData(800, 600)
    this.namesList.context.font = '16px Arial'
    this.namesList.context.fillStyle = '#ffffff'
    this.namesList.addToWorld()

    addListener('namesUpdated', this.updateList)

    //target physics
    this.game.physics.arcade.enable(this.target);
    this.target.inputEnabled = true;
    this.target.events.onInputDown.add(this.shoot, this);
    this.target.enableBody = true;
    this.target.body.bounce.x = true;
    this.target.body.bounce.y = true;
    this.target.body.collideWorldBounds = true;
    //this.setTargetPosition();
    this.initTarget()
  }

  shoot() {
    sendShootData({ player: globals.username });
    //this.setTargetPosition();
  }

  updateList = (names) => {
    console.log('UPDATING LIST')
    this.namesList.cls()
    const usersList = names.reduce((prev, next) =>`${prev} ${next.name}`, 'Users:')
    this.namesList.context.fillText(usersList, 64, 300)
  }
  
  setTargetPosition(data) {
    this.target.reset(data.startPosition.x, data.startPosition.y);
    this.target.body.velocity.x = data.velocity.x;
    this.target.body.velocity.y = data.velocity.y;
  }

  preload() {
    this.game.load.image('target', 'img/target.png');
  }

  initTarget() {
    socketEvent('init');

    socketListen('init', (data) => {
      this.setTargetPosition(data);
    });

    socketListen('shoot', (data) => {
      //console.log(data);
      this.setTargetPosition(data.target);
    });
  }
}

export default GameState
