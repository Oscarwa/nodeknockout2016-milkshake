import { sendTargetData, sendShootData } from 'utils/sockets'
import globals from 'utils/globals'

class MainState extends Phaser.State {
  create() {
    //physics & setup
    this.game.stage.backgroundColor = '#3498DB';
    this.game.physics.startSystem(Phaser.Physics.Arcade);
    this.game.renderer.renderSession.roundPixels = true;

    //render target
    this.target = this.game.add.sprite(100, 120, 'target');
    this.target.anchor.set(0.5);
    this.target.scale.set(0.2);

    //target physics
    this.game.physics.arcade.enable(this.target);
    this.target.inputEnabled = true;
    this.target.events.onInputDown.add(this.shoot, this);
    this.target.enableBody = true;
    this.target.body.bounce.x = true;
    this.target.body.bounce.y = true;
    this.target.body.collideWorldBounds = true;
    this.setTargetPosition();
  }

  shoot() {
    sendShootData({ player: globals.username });
    this.setTargetPosition();
  }

  setTargetPosition() {
    const newTarget = {
      x: 800 * Math.random(),
      y: 600 * Math.random(),
      velocity: {
        x: 600 * Math.random(),
        y: 600 * Math.random()
      }
    }
    sendTargetData(newTarget)
    this.target.reset(newTarget.x, newTarget.y);
    this.target.body.velocity.x = newTarget.velocity.x;
    this.target.body.velocity.y = newTarget.velocity.y;
  }

  preload() {
    this.game.load.image('target', 'img/target.png');
  }
}

export default MainState