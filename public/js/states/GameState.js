import {
  socketEvent,
  sendTargetData,
  sendShootData,
  sendGameOver,
  socketListen } from 'utils/sockets'
import globals from 'utils/globals'
import constants from 'utils/constants'
import NamesList from 'objects/NamesList'

import GameOverState from 'states/GameOverState'

class GameState extends Phaser.State {

  create() {
    //physics & setup
    var bgIndex = Math.floor(Math.random() * 5) + 1;
    var bg = this.game.add.image(0, 0, 'bg' + bgIndex);
    bg.scale.set(1.1);
    // bg.anchor.set(0.5);
    this.game.physics.startSystem(Phaser.Physics.Arcade);
    this.game.renderer.renderSession.roundPixels = true;
    this.hitSound = this.game.add.audio('hit');
    this.hit2Sound = this.game.add.audio('hit2');
    this.BGM = this.game.add.audio('bgm');
    this.BGM.loopFull();

    this.fx = this.game.add.audio('sfx');
    this.fx.addMarker('item', 1, 1.0);
  	this.fx.addMarker('boss hit', 3, 0.5);
  	this.fx.addMarker('escape', 4, 3.2);
  	this.fx.addMarker('meow', 8, 0.5);
  	this.fx.addMarker('numkey', 9, 0.1);
  	this.fx.addMarker('ping', 10, 1.0);
  	this.fx.addMarker('death', 12, 4.2);
    this.fx.addMarker('shot', 17, 1.0);
  	this.fx.addMarker('squit', 19, 0.3);

    this.bonus = this.game.add.sprite(970, 550, 'blank');
    this.bonus.anchor.set(0.5);
    // this.bonus.scale.set(0.2);

    //render target
    this.target = this.game.add.sprite(100, 120, 'target');
    this.target.anchor.set(0.5);
    this.target.scale.set(0.15);
    this.nameBanner = this.game.add.text(30, 15, constants.GAME_WELCOME_MESSAGE+constants.GAME_NAME, {
      font: '26px Schoolbell',
      fill: '#ffffff'
    })

    //socketListen('namesUpdated', this.updateList)
    this.namesList = new NamesList(this.game, 700, 50, '')

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

    this.counter = 90
    this.timer = this.game.add.text(680, 560, `Time Remaining: ${this.counter}`, {
      font: '26px Schoolbell',
      fill: '#000'
    })

    this.item = {};
    this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.game.time.events.loop(Phaser.Timer.SECOND, this.updateTimeCounter, this)
    socketListen('gameOver', this.finishGame)
    this.game.state.add('gameover', GameOverState)
  }

  updateTimeCounter() {
    this.counter--
    this.timer.setText(`Time Remaining: ${this.counter}`)
    // if(this.counter === 0) {
    //   this.finishGame()
    // }
  }

  finishGame = () => {
    this.BGM.stop()
    this.target.destroy(true)
    this.game.state.start('gameover')
  }

  gotBonus() {
    var bonuses = ['bonus_down', 'bomb', 'timer', 'bonus', 'lighting']

    this.item = {
      canUse: true,
      type: bonuses[Math.floor(Math.random() * bonuses.length)]
    }

    this.bonus.loadTexture(this.item.type);
  }

  shoot(pointer) {
    this.hitSound.play();
    sendShootData({ player: globals.username });
    this.emitter = this.game.add.emitter(this.game.world.centerX, 200);
    if(this.isBonusTarget) {
      this.emitter.makeParticles('broken_target_enemy');
    } else {
      this.emitter.makeParticles('broken_target');
    }
    this.emitter.bringToTop = true;
    this.emitter.minParticleScale = 0.13;
    this.emitter.maxParticleScale = 0.13;
    this.emitter.gravity = 1000;
    this.emitter.x = this.target.position.x;
    this.emitter.y = this.target.position.y;
    this.emitter.start(true, 2000, null, 5);

    //bonus
    if (this.isBonusTarget && !this.item.canUse) {
      this.gotBonus();
    }
  }

  updateList = (names) => {
    const usersList = names.reduce((prev, next) =>`${prev}${next.name}  ${next.points}\n`, '')
    this.namesList.setText(usersList)
  }

  setTargetPosition(data) {
    this.target.reset(data.startPosition.x, data.startPosition.y);
    this.target.body.velocity.x = data.velocity.x;
    this.target.body.velocity.y = data.velocity.y;

    this.slowTimer--;
    this.lightingTimer--;
    if(this.slowTimer > 0) {
      this.target.body.velocity.x /= 2;
      this.target.body.velocity.y /= 2;
    }
    if(this.lightingTimer > 0) {
      this.target.body.velocity.x *= 2;
      this.target.body.velocity.y *= 2;
    }
  }

  update() {
    if (this.spaceKey.downDuration(1)) {
      if(!!this.item && this.item.canUse) {
        this.fx.play('item')
        socketEvent('bonus', this.item.type)
        this.item.canUse = false;
        this.item.type = 'blank'
        this.bonus.loadTexture(this.item.type);
      }
    }
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
    this.game.load.image('bomb', 'img/bombs.png');
    this.game.load.image('timer', 'img/timer.png');
    this.game.load.image('bonus', 'img/bonus.png');
    this.game.load.image('bonus_down', 'img/bonus_down.png');
    this.game.load.image('lighting', 'img/lighting.png');
    this.game.load.image('blank', 'img/blank.png');


    this.game.load.audio('bgm', 'sound/bgm.mp3');
    this.game.load.audio('hit', 'sound/crash.ogg');
    this.game.load.audio('hit2', 'sound/blop.mp3');
    this.game.load.audio('sfx', 'sound/fx.mp3');

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
        if(this.isBonusTarget) {
          this.emitter.makeParticles('broken_target_enemy');
        } else {
          this.emitter.makeParticles('broken_target');
        }
        this.emitter.bringToTop = true;
        this.emitter.minParticleScale = 0.13;
        this.emitter.maxParticleScale = 0.13;
        this.emitter.gravity = 1000;
        this.emitter.x = this.target.position.x;
        this.emitter.y = this.target.position.y;
        this.emitter.start(true, 2000, null, 5);
      }
      if(data.target.bonus) {
        this.target.loadTexture('blueTarget');
      } else {
        this.target.loadTexture('target');
      }
      this.isBonusTarget = data.target.bonus;
      this.setTargetPosition(data.target);
    });

    socketListen('bonus', (type) => {
      switch (type) {
        case 'lighting':
          this.lightingTimer = 5;
          this.slowTimer = 0;
          this.target.body.velocity.x *= 2;
          this.target.body.velocity.y *= 2;
          break;
        case 'timer':
          this.slowTimer = 10;
          this.lightingTimer = 0;
          this.target.body.velocity.x /= 2;
          this.target.body.velocity.y /= 2;
          break;
        case 'bomb':
          this.shoot();
          break;
      }
    })
  }
}

export default GameState
