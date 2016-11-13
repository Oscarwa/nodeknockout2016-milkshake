import { socketEvent, sendTargetData, sendShootData, socketListen } from 'utils/sockets'
import globals from 'utils/globals'
<<<<<<< e3cbf19fe48ef69c7421d0ea94ac7dcdffa2a3ab
import constants from 'utils/constants'
=======
import NamesList from 'objects/NamesList'
>>>>>>> Created list object

class GameState extends Phaser.State {

  create() {
    //physics & setup
    //var bgIndex = Math.floor(Math.random() * 5) + 1;
    var bg = this.game.add.image(0, 0, 'bg1');
    bg.scale.set(1.1);
    // bg.anchor.set(0.5);
    this.game.physics.startSystem(Phaser.Physics.Arcade);
    this.game.renderer.renderSession.roundPixels = true;
    this.hitSound = this.game.add.audio('hit');
    this.hit2Sound = this.game.add.audio('hit2');
    this.BGM = this.game.add.audio('bgm');
    this.BGM.loopFull();

    this.game.

    //render target
    this.target = this.game.add.sprite(100, 120, 'target');
    this.target.anchor.set(0.5);
    this.target.scale.set(0.15);

    //users list

    this.nameBanner = this.game.add.text(30, 15, constants.GAME_WELCOME_MESSAGE+constants.GAME_NAME, {
      font: '26px Schoolbell',
      fill: '#ffffff'
    })
    this.nameBannerSubtitle = this.game.add.text(30, 45, constants.GAME_INSTRUCTION, {
      font: '22px Schoolbell',
      fill: '#ffffff'
    })
    this.namesList = new NamesList(this.game, 700, 50, '')

    // this.namesList = this.game.make.bitmapData(800, 600)
    // this.namesList.context.font = '22px Asul'
    // this.namesList.context.lineSpacing = 20
    // this.namesList.context.fillStyle = '#ffffff'
    // this.namesList.addToWorld()


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
    this.game.load.image('blueTarget', 'img/blue-target.png');
    this.game.load.image('broken_target', 'img/broken_target.png');
    this.game.load.image('bg1', 'img/game-background-p2-1.jpg');
    this.game.load.image('bg2', 'img/game-background-p2-2.jpg');
    this.game.load.image('bg3', 'img/game-background-p2-3.jpg');
    this.game.load.image('bg4', 'img/game-background-p2-4.jpg');
    this.game.load.image('bg5', 'img/game-background-p2-5.jpg');

    this.game.load.image('broken_target_enemy', 'img/blue-target-broken.png');

    //items
    this.game.load.image('bomb', 'img/bomb.png');
    this.game.load.image('timer', 'img/timer.png');
    this.game.load.image('bonus', 'img/bonus.png');


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
      if(data.target.bonus) {
        console.info('bonus!');
        this.target.loadTexture('blueTarget');
      } else {
        this.target.loadTexture('target');
      }

      this.setTargetPosition(data.target);
    });
  }
}

export default GameState
