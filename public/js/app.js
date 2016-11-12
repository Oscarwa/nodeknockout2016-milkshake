
const preload = () => {
  game.load.image('target', 'img/target.png');
}

const create = () => {
  var target1 = game.add.sprite(100, 120, 'target');
  target1.anchor.set(0.5);
  target1.scale.set(0.2);
}

const update = () => {
}

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });