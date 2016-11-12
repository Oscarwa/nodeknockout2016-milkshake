import hello from 'x'
var socket = io();
const socketEvent = (eventName, data) => {
  socket.emit(eventName, data);
}
socket.on('shoot', (data) => {
  console.log(data);
});

socket.on('namesUpdated', (names) => {
  console.log('Users List', names)
  game.showNames(names)
})
const constants = {
  ENTER_NAME_MSG: 'Please enter your name'
}



var mainState = {
  username: '',
  //Helper functions
  keyPress: function(char) {
    this.username+=char
    this.bmd.cls()
    this.bmd.context.fillText(this.username, 64, 128)
  },

  deleteCharFromName: function() {
    this.username = this.username.slice(0, this.username.length-1)
    this.bmd.cls()
    this.bmd.context.fillText(this.username, 64, 128)
  },

  saveName: function() {
    this.name = this.username
    alert(`Saved your name as:${this.name}`)
    socketEvent('saveName', this.name)
    this.bmd.cls()
    this.nameMsg.cls()
  },

  showNames: (names) => {

  },

  // Phaser io events and handles
  createTarget: function() {

  },

  preload: () => {
    game.load.image('target', 'img/target.png');
  },

  create: function() {
    game.stage.backgroundColor = '#3498DB';
    game.physics.startSystem(Phaser.Physics.Arcade);
    game.renderer.renderSession.roundPixels = true;

    const backspace = game.input.keyboard.addKey(Phaser.KeyCode.BACKSPACE)
    backspace.onDown.add(this.deleteCharFromName, this)

    const enter = game.input.keyboard.addKey(Phaser.KeyCode.ENTER)
    enter.onDown.add(this.saveName, this)

    this.target = game.add.sprite(100, 120, 'target');
    this.target.anchor.set(0.5);
    this.target.scale.set(0.2);
    game.physics.arcade.enable(this.target);
    this.target.inputEnabled = true;
    this.target.events.onInputDown.add(this.shoot, this);
    this.target.enableBody = true;
    this.target.body.bounce.x = true;
    this.target.body.bounce.y = true;
    this.target.body.collideWorldBounds = true;
    this.setTargetPosition();

    this.namesList = game.make.bitmapData(800, 600)
    this.namesList.context.font = '16px Arial'
    this.namesList.context.fillStyle = '#ffffff'
    this.namesList.addToWorld()

    this.nameMsg = game.make.bitmapData(800, 200)
    this.nameMsg.context.font = '32px Arial'
    this.nameMsg.context.fillStyle = '#ffffff'
    this.nameMsg.context.fillText(constants.ENTER_NAME_MSG, 64, 64)
    this.nameMsg.addToWorld()

    this.bmd = game.make.bitmapData(800,200)
    this.bmd.context.font = '64px Arial'
    this.bmd.context.fillStyle = '#ffffff'
    this.bmd.context.fillText(this.username, 64, 128)
    this.bmd.addToWorld()

    game.input.keyboard.addCallbacks(this, null, null, this.keyPress)
  },

  update: function() {
    //this.createTarget();
  },

  render: () => {
    //console.info(game.input.activePointer);
    //game.debug.pointer( game.input.activePointer );
  },

  shoot: function() {
    socketEvent('shoot', {player: this.username});
    this.setTargetPosition();
    // Score = score + 10
  },
  setTargetPosition: function() {
    this.target.reset(800 * Math.random(), 600 * Math.random());
    this.target.body.velocity.x = 600 * Math.random();
    this.target.body.velocity.y = 600 * Math.random();
  }
}

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
game.state.add('main', mainState);

game.state.start('main');
