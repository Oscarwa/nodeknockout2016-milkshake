// socket.io events and handles
const socket = io();
const WORD = 'hello'

const socketEvent = (eventName, data) => {
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
  const target = game.add.sprite(100, 120, 'target');
  target.anchor.set(0.5);
  target.scale.set(0.2);
  target.inputEnabled = true;
  target.events.onInputDown.add(shoot, this);

  const bmd = game.make.bitmapData(800, 200)
  bmd.context.font = '64px Arial'
  bmd.context.fillStyle = '#ffffff'
  bmd.context.fillText(WORD, 64, 64)
  bmd.addToWorld()

  game.input.keyboard.addCallbacks(this, null, null, keyPress)
}

const keyPress = (char) => {
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
