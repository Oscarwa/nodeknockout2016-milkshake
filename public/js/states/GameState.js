import { socketEvent, sendTargetData, sendShootData, socketListen } from 'utils/sockets'
import globals from 'utils/globals'

class GameState extends Phaser.State {

  create() {
    //physics & setup
    var bg = this.game.add.image(this.game.world.centerX, this.game.world.centerY, 'bg');
    bg.scale.set(0.55);
    bg.anchor.set(0.5);
    this.game.physics.startSystem(Phaser.Physics.Arcade);
    this.game.renderer.renderSession.roundPixels = true;
    this.hitSound = this.game.add.audio('hit');
    this.hit2Sound = this.game.add.audio('hit2');
    this.BGM = this.game.add.audio('bgm');
    this.BGM.loopFull();

    //render target
    this.target = this.game.add.sprite(100, 120, 'target');
    this.target.anchor.set(0.5);
    this.target.scale.set(0.15);

    //users list
    this.namesList = this.game.add.text(10, 48, 'testing text', {
      font: '26px Schoolbell',
      fill: '#000000'
    })


    socketListen('namesUpdated', this.updateList)

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
    this.hitSound.play();
    sendShootData({ player: globals.username });
    this.emitter = this.game.add.emitter(this.game.world.centerX, 200);
    this.emitter.makeParticles('broken_target');
    this.emitter.bringToTop = true;
    this.emitter.minParticleScale = 0.13;
    this.emitter.maxParticleScale = 0.13;
    this.emitter.gravity = 1000;
    this.emitter.x = this.target.position.x;
    this.emitter.y = this.target.position.y;
    this.emitter.start(true, 2000, null, 5);
  }

  updateList = (names) => {
    const usersList = names.reduce((prev, next) =>`${prev}${next.name}  ${next.points}\n`, 'Users:\n')
    this.namesList.setText(usersList)
  }

  setTargetPosition(data) {
    this.target.reset(data.startPosition.x, data.startPosition.y);
    this.target.body.velocity.x = data.velocity.x;
    this.target.body.velocity.y = data.velocity.y;
  }

  preload() {
    this.game.load.image('target', 'img/target.png');
    this.game.load.image('broken_target', 'img/broken_target.png');
    this.game.load.image('broken_target_enemy', 'img/blue-target-broken.png');
    this.game.load.image('bg', 'img/bg.jpg');
    this.game.load.audio('bgm', 'sound/bgm.mp3');
    this.game.load.audio('hit', 'sound/crash.ogg');
    this.game.load.audio('hit2', 'sound/blop.mp3');

    this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js');
  }

  initTarget() {
    socketEvent('init');

    socketListen('init', (data) => {
      this.setTargetPosition(data.target);
      this.updateList(data.users)
    });

    socketListen('shoot', (data) => {
      if(globals.username !== data.data.player) {
        this.hit2Sound.play();
        this.emitter = this.game.add.emitter(this.game.world.centerX, 200);
        this.emitter.makeParticles('broken_target_enemy');
        this.emitter.bringToTop = true;
        this.emitter.minParticleScale = 0.13;
        this.emitter.maxParticleScale = 0.13;
        this.emitter.gravity = 1000;
        this.emitter.x = this.target.position.x;
        this.emitter.y = this.target.position.y;
        this.emitter.start(true, 2000, null, 5);
      }

      this.setTargetPosition(data.target);
    });
  }
}

export default GameState
