/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/static/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("module.exports = __webpack_require__(1);\n\n\n//////////////////\n// WEBPACK FOOTER\n// multi main\n// module id = 0\n// module chunks = 0\n//# sourceURL=webpack:///multi_main?");

/***/ },
/* 1 */
/***/ function(module, exports) {

	eval("const constants = {\n  ENTER_NAME_MSG: 'Please enter your name'\n}\n\n// socket.io events and handles\nconst socket = io();\nvar target;\nlet username = '';\n\nconst socketEvent = (eventName, data) => {\n  socket.emit(eventName, data);\n}\n\nsocket.on('shoot', (data) => {\n  console.log(data);\n});\n\n// Phaser io events and handles\nfunction createTarget() {\n  var target = game.add.sprite(100, 120, 'target');\n  target.anchor.set(0.5);\n  target.scale.set(0.2);\n  game.physics.arcade.enable(target);\n  target.inputEnabled = true;\n  target.events.onInputDown.add(shoot, this);\n  target.enableBody = true;\n\n  target.body.bounce.x = true;\n  target.body.bounce.y = true;\n\n  target.body.velocity.x = 600 * Math.random();\n  target.body.velocity.y = 600 * Math.random();\n  target.body.collideWorldBounds = true;\n\n};\n\nconst preload = () => {\n  game.load.image('target', 'img/target.png');\n}\n\nconst create = () => {\n  game.stage.backgroundColor = '#3498DB';\n  game.physics.startSystem(Phaser.Physics.Arcade);\n  game.renderer.renderSession.roundPixels = true;\n\n  const backspace = game.input.keyboard.addKey(Phaser.KeyCode.BACKSPACE)\n  backspace.onDown.add(deleteCharFromName, this)\n\n  const enter = game.input.keyboard.addKey(Phaser.KeyCode.ENTER)\n  enter.onDown.add(saveName, this)\n\n  var target = game.add.sprite(100, 120, 'target');\n  target.anchor.set(0.5);\n  target.scale.set(0.2);\n  game.physics.arcade.enable(target);\n  target.inputEnabled = true;\n  target.events.onInputDown.add(shoot, this);\n  target.enableBody = true;\n\n  target.body.bounce.x = true;\n  target.body.bounce.y = true;\n\n  target.body.velocity.x = 600 * Math.random();\n  target.body.velocity.y = 600 * Math.random();\n  target.body.collideWorldBounds = true;\n\n  this.nameMsg = game.make.bitmapData(800,200)\n  this.nameMsg.context.font = '32px Arial'\n  this.nameMsg.context.fillStyle = '#ffffff'\n  this.nameMsg.context.fillText(constants.ENTER_NAME_MSG, 64, 64)\n  this.nameMsg.addToWorld()\n\n  this.bmd = game.make.bitmapData(800,200)\n  this.bmd.context.font = '64px Arial'\n  this.bmd.context.fillStyle = '#ffffff'\n  this.bmd.context.fillText(username, 64, 128)\n  this.bmd.addToWorld()\n\n  game.input.keyboard.addCallbacks(this, null, null, keyPress)\n}\n\nconst keyPress = (char) => {\n  username+=char\n  this.bmd.cls()\n  this.bmd.context.fillText(username, 64, 128)\n}\nconst deleteCharFromName = () => {\n  username = username.slice(0, username.length-1)\n  this.bmd.cls()\n  this.bmd.context.fillText(username, 64, 128)\n}\n\nconst saveName = () => {\n  this.name = username\n  alert(`Saved your name as:${this.name}`)\n  this.bmd.cls()\n  this.nameMsg.cls()\n}\n\nconst update = () => {\n\n}\n\nconst render = () => {\n  //console.info(game.input.activePointer);\n  //game.debug.pointer( game.input.activePointer );\n}\n\nconst shoot = () => {\n  socketEvent('shoot', {player: USERNAME});\n};\n\nconst game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./public/js/app.js\n// module id = 1\n// module chunks = 0\n//# sourceURL=webpack:///./public/js/app.js?");

/***/ }
/******/ ]);