const constants = {
  ENTER_NAME_MSG: 'Please enter your name'
}

// socket.io events and handles
const socket = io();
var target;
let username = '';

const socketEvent = (eventName, data) => {
  socket.emit(eventName, data);
}

socket.on('shoot', (data) => {
  console.log(data);
});

// Phaser io events and handles
function createTarget() {
  var target = game.add.sprite(100, 120, 'target');
  target.anchor.set(0.5);
  target.scale.set(0.2);
  game.physics.arcade.enable(target);
  target.inputEnabled = true;
  target.events.onInputDown.add(shoot, this);
  target.enableBody = true;

  target.body.bounce.x = true;
  target.body.bounce.y = true;

  target.body.velocity.x = 600 * Math.random();
  target.body.velocity.y = 600 * Math.random();
  target.body.collideWorldBounds = true;

};

const preload = () => {
  game.load.image('target', 'img/target.png');
}

const create = () => {
  game.stage.backgroundColor = '#3498DB';
  game.physics.startSystem(Phaser.Physics.Arcade);
  game.renderer.renderSession.roundPixels = true;

  const backspace = game.input.keyboard.addKey(Phaser.KeyCode.BACKSPACE)
  backspace.onDown.add(deleteCharFromName, this)

  const enter = game.input.keyboard.addKey(Phaser.KeyCode.ENTER)
  enter.onDown.add(saveName, this)

  var target = game.add.sprite(100, 120, 'target');
  target.anchor.set(0.5);
  target.scale.set(0.2);
  game.physics.arcade.enable(target);
  target.inputEnabled = true;
  target.events.onInputDown.add(shoot, this);
  target.enableBody = true;

  target.body.bounce.x = true;
  target.body.bounce.y = true;

  target.body.velocity.x = 600 * Math.random();
  target.body.velocity.y = 600 * Math.random();
  target.body.collideWorldBounds = true;

  this.nameMsg = game.make.bitmapData(800,200)
  this.nameMsg.context.font = '32px Arial'
  this.nameMsg.context.fillStyle = '#ffffff'
  this.nameMsg.context.fillText(constants.ENTER_NAME_MSG, 64, 64)
  this.nameMsg.addToWorld()

  this.bmd = game.make.bitmapData(800,200)
  this.bmd.context.font = '64px Arial'
  this.bmd.context.fillStyle = '#ffffff'
  this.bmd.context.fillText(username, 64, 128)
  this.bmd.addToWorld()

  game.input.keyboard.addCallbacks(this, null, null, keyPress)
}

const keyPress = (char) => {
  username+=char
  this.bmd.cls()
  this.bmd.context.fillText(username, 64, 128)
}
const deleteCharFromName = () => {
  username = username.slice(0, username.length-1)
  this.bmd.cls()
  this.bmd.context.fillText(username, 64, 128)
}

const saveName = () => {
  this.name = username
  alert(`Saved your name as:${this.name}`)
  this.bmd.cls()
  this.nameMsg.cls()
}

const update = () => {

}

const render = () => {
  //console.info(game.input.activePointer);
  //game.debug.pointer( game.input.activePointer );
}

const shoot = () => {
  socketEvent('shoot', {player: USERNAME});
};

const game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
