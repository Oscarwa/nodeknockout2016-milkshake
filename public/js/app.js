const constants = {
  ENTER_NAME_MSG: 'Please enter your name'
}

// socket.io events and handles
const socket = io();
let USERNAME = ''

const socketEvent = (eventName, data) => {
  socket.emit(eventName, data);
}

socket.on('shoot', (data) => {
  console.log(data);
});

// Phaser io events and handles
const preload = () => {
  game.load.image('target', 'img/target.png');
}

const create = () => {
  const target = game.add.sprite(100, 120, 'target');
  target.anchor.set(0.5);
  target.scale.set(0.2);
  target.inputEnabled = true;
  target.events.onInputDown.add(shoot, this);

  this.bmd = game.make.bitmapData(800, 200)
  this.bmd.context.font = '64px Arial'
  this.bmd.context.fillStyle = '#ffffff'
  this.bmd.context.fillText(USERNAME, 64, 64)
  this.bmd.addToWorld()

  game.input.keyboard.addCallbacks(this, null, null, keyPress)
}

const keyPress = (char) => {
  USERNAME+=char
  this.bmd.cls()
  this.bmd.context.fillText(USERNAME, 64, 64)
}

const update = () => {

}

const render = () => {
  //console.info(game.input.activePointer);
  //game.debug.pointer( game.input.activePointer );
}

const shoot = () => {
  socketEvent('shoot', {player: 'me'});
};

const game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
