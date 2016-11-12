class GameState extends Phaser.State {
  create() {
    this.game.stage.backgroundColor = '#3498DB';
    this.game.physics.startSystem(Phaser.Physics.Arcade);
    this.game.renderer.renderSession.roundPixels = true;

    const backspace = this.game.input.keyboard.addKey(Phaser.KeyCode.BACKSPACE)
    backspace.onDown.add(deleteCharFromName, this)

    const enter = this.game.input.keyboard.addKey(Phaser.KeyCode.ENTER)
    enter.onDown.add(saveName, this)

    var target = this.game.add.sprite(100, 120, 'target');
    target.anchor.set(0.5);
    target.scale.set(0.2);
    this.game.physics.arcade.enable(target);
    target.inputEnabled = true;
    target.events.onInputDown.add(shoot, this);
    target.enableBody = true;

    target.body.bounce.x = true;
    target.body.bounce.y = true;

    target.body.velocity.x = 600 * Math.random();
    target.body.velocity.y = 600 * Math.random();
    target.body.collideWorldBounds = true;

    this.namesList = this.game.make.bitmapData(800, 600)
    this.namesList.context.font = '16px Arial'
    this.namesList.context.fillStyle = '#ffffff'
    this.namesList.addToWorld()

    this.nameMsg = this.game.make.bitmapData(800, 200)
    this.nameMsg.context.font = '32px Arial'
    this.nameMsg.context.fillStyle = '#ffffff'
    this.nameMsg.context.fillText(constants.ENTER_NAME_MSG, 64, 64)
    this.nameMsg.addToWorld()

    this.bmd = this.game.make.bitmapData(800,200)
    this.bmd.context.font = '64px Arial'
    this.bmd.context.fillStyle = '#ffffff'
    this.bmd.context.fillText(username, 64, 128)
    this.bmd.addToWorld()

    this.game.input.keyboard.addCallbacks(this, null, null, keyPress)
  }

  preload() {

  }
}