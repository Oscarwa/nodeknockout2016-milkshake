import { socketEvent, sendTargetData, sendShootData, socketListen } from 'utils/sockets'
import globals from 'utils/globals'
import fetch from 'isomorphic-fetch'

class GameState extends Phaser.State {

  create() {
    //physics & setup
    //this.game.stage.backgroundColor = '#3498DB';
    var bg = this.game.add.image(this.game.world.centerX, this.game.world.centerY, 'bg');
    bg.scale.set(0.4);
    bg.anchor.set(0.5);
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

    socketListen('namesUpdated', this.updateList)

    fetch('/users/list')
      .then((res) => {
        return res.text()
      })
      .then(function(users){
        this.updateList(JSON.parse(users))
      }.bind(this))

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

  shoot(pointer) {
    sendShootData({ player: globals.username });
    this.emitter = this.game.add.emitter(this.game.world.centerX, 200);

    this.emitter.makeParticles('broken_target');

    // this.emitter.setXSpeed(-200, 200);
    // this.emitter.setYSpeed(-150, -250);

    this.emitter.bringToTop = true;
    //this.emitter.setAlpha(0.1, 1, 500);
    this.emitter.minParticleScale = 0.2;
    this.emitter.maxParticleScale = 0.2;
    //this.emitter.setScale(-2, 2, 1, 1, 3000, Phaser.Easing.Sinusoidal.InOut, true);
    this.emitter.gravity = 1000;
    this.emitter.x = pointer.x;
    this.emitter.y = pointer.y;

    this.emitter.start(true, 2000, null, 5);
  }

  updateList = (names) => {
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
    this.game.load.image('broken_target', 'img/broken_target.png');
    this.game.load.image('bg', 'img/bg.jpg');
  }

  initTarget() {
    socketEvent('init');

    socketListen('init', (data) => {
      this.setTargetPosition(data);
    });

    socketListen('shoot', (data) => {
      this.setTargetPosition(data.target);
    });
  }
}

export default GameState
