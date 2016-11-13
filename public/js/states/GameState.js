import { socketEvent, sendTargetData, sendShootData, socketListen } from 'utils/sockets'
import globals from 'utils/globals'
import constants from 'utils/constants'

class GameState extends Phaser.State {

  create() {
    //physics & setup
    var bg = this.game.add.image(0, 0, 'bg');
    bg.scale.set(1.1);
    // bg.anchor.set(0.5);
    this.game.physics.startSystem(Phaser.Physics.Arcade);
    this.game.renderer.renderSession.roundPixels = true;
    this.hitSound = this.game.add.audio('hit');
    this.BGM = this.game.add.audio('bgm');
    this.BGM.loopFull();

    //render target
    this.target = this.game.add.sprite(100, 120, 'target');
    this.target.anchor.set(0.5);
    this.target.scale.set(0.15);

    //users list
    this.namesList = this.game.add.text(850, 40, '', {
      font: '26px Schoolbell',
      fill: '#ffffff'
    })
    this.nameBanner = this.game.add.text(30, 15, constants.GAME_WELCOME_MESSAGE+constants.GAME_NAME, {
      font: '26px Schoolbell',
      fill: '#ffffff'
    })
    this.nameBannerSubtitle = this.game.add.text(30, 45, constants.GAME_INSTRUCTION, {
      font: '22px Schoolbell',
      fill: '#ffffff'
    })
    // this.namesList = this.game.make.bitmapData(800, 600)
    // this.namesList.context.font = '22px Asul'
    // this.namesList.context.lineSpacing = 20
    // this.namesList.context.fillStyle = '#ffffff'
    // this.namesList.addToWorld()


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

//   WebFontConfig = {
//
//     //  'active' means all requested fonts have finished loading
//     //  We set a 1 second delay before calling 'createText'.
//     //  For some reason if we don't the browser cannot render the text the first time it's created.
//     active: function() { this.game.time.events.add(Phaser.Timer.SECOND, createText, this); },
//
//     //  The Google Fonts we want to load (specify as many as you like in the array)
//     google: {
//       families: ['Schoolbell']
//     }
//
// };
// function createText() {
//
//     this.text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "web fonts");
//     this.text.anchor.setTo(0.5);
//
//     this.text.font = 'Schoolbell';
//     this.text.fontSize = 60;
//
//     //  x0, y0 - x1, y1
//     this.grd = this.text.context.createLinearGradient(0, 0, 0, this.text.canvas.height);
//     this.grd.addColorStop(0, '#8ED6FF');
//     this.grd.addColorStop(1, '#004CB3');
//     this.text.fill = grd;
//
//     this.text.align = 'center';
//     this.text.stroke = '#000000';
//     this.text.strokeThickness = 2;
//     this.text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
//
//     this.text.inputEnabled = true;
//     this.text.input.enableDrag();
//
//     this.text.events.onInputOver.add(over, this);
//     this.text.events.onInputOut.add(out, this);
//
// }

  shoot(pointer) {
    this.hitSound.play();
    sendShootData({ player: globals.username });
    this.emitter = this.game.add.emitter(this.game.world.centerX, 200);

    this.emitter.makeParticles('broken_target');

    // this.emitter.setXSpeed(-200, 200);
    // this.emitter.setYSpeed(-150, -250);

    this.emitter.bringToTop = true;
    //this.emitter.setAlpha(0.1, 1, 500);
    this.emitter.minParticleScale = 0.13;
    this.emitter.maxParticleScale = 0.13;
    //this.emitter.setScale(-2, 2, 1, 1, 3000, Phaser.Easing.Sinusoidal.InOut, true);
    this.emitter.gravity = 1000;
    this.emitter.x = pointer.x;
    this.emitter.y = pointer.y;

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
    this.game.load.image('bg', 'img/game-background-p2-1.jpg');
    this.game.load.audio('bgm', 'sound/bgm.mp3');
    this.game.load.audio('hit', 'sound/crash.ogg');
    this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js');
  }

  initTarget() {
    socketEvent('init');

    socketListen('init', (data) => {
      this.setTargetPosition(data.target);
      this.updateList(data.users)
    });

    socketListen('shoot', (data) => {
      this.setTargetPosition(data.target);
    });
  }
}

export default GameState
