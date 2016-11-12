// socket.io events and handles
var socket = io();

var socketEvent = (eventName, data) => {
  socket.emit(eventName, data);
}

socket.on('targetShoot', (data) => {
  console.log(data);
});

// Phaser io events and handles
const preload = () => {
  game.load.image('target', 'img/target.png');
}

const create = () => {
  var target = game.add.sprite(100, 120, 'target');
  target.anchor.set(0.5);
  target.scale.set(0.2);
  target.inputEnabled = true;
  target.events.onInputDown.add(shoot, this);
}

const update = () => {
}

const render = () => {
  //console.info(game.input.activePointer);
  //game.debug.pointer( game.input.activePointer );
}

var shoot = () => {
  socketEvent('shoot', {player: 'me'});
};

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
