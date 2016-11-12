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
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar _x = __webpack_require__(2);\n\nvar _x2 = _interopRequireDefault(_x);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar socket = io();\nvar socketEvent = function socketEvent(eventName, data) {\n  socket.emit(eventName, data);\n};\nsocket.on('shoot', function (data) {\n  console.log(data);\n  mainState.setTargetPosition(data.target);\n});\n\nsocket.on('init', function (data) {\n  console.log(data);\n  mainState.setTargetPosition(data);\n});\n\nsocket.on('namesUpdated', function (names) {\n  console.log('Users List', names);\n  mainState.showNames(names);\n});\n\n//Connect and sync game\n\nvar constants = {\n  ENTER_NAME_MSG: 'Please enter your name'\n};\n\nvar mainState = {\n  username: '',\n  //Helper functions\n  keyPress: function keyPress(char) {\n    this.username += char;\n    this.bmd.cls();\n    this.bmd.context.fillText(this.username, 64, 128);\n  },\n\n  deleteCharFromName: function deleteCharFromName() {\n    this.username = this.username.slice(0, this.username.length - 1);\n    this.bmd.cls();\n    this.bmd.context.fillText(this.username, 64, 128);\n  },\n\n  saveName: function saveName() {\n    this.name = this.username;\n    alert('Saved your name as:' + this.name);\n    socketEvent('saveName', this.name);\n    this.bmd.cls();\n    this.nameMsg.cls();\n    //this.setTargetPosition();\n    socket.emit('init');\n  },\n\n  showNames: function showNames(names) {},\n\n  // Phaser io events and handles\n  createTarget: function createTarget() {},\n\n  preload: function preload() {\n    game.load.image('target', 'img/target.png');\n  },\n\n  create: function create() {\n    game.stage.backgroundColor = '#3498DB';\n    game.physics.startSystem(Phaser.Physics.Arcade);\n    game.renderer.renderSession.roundPixels = true;\n\n    game.load.onLoadComplete.add(function () {\n      socket.emit('init');\n    }, this);\n\n    var backspace = game.input.keyboard.addKey(Phaser.KeyCode.BACKSPACE);\n    backspace.onDown.add(this.deleteCharFromName, this);\n\n    var enter = game.input.keyboard.addKey(Phaser.KeyCode.ENTER);\n    enter.onDown.add(this.saveName, this);\n\n    this.target = game.add.sprite(400, 300, 'target');\n    this.target.anchor.set(0.5);\n    this.target.scale.set(0.2);\n    game.physics.arcade.enable(this.target);\n    this.target.inputEnabled = true;\n    this.target.events.onInputDown.add(this.shoot, this);\n    this.target.enableBody = true;\n    this.target.body.bounce.x = true;\n    this.target.body.bounce.y = true;\n    this.target.body.collideWorldBounds = true;\n    //this.setTargetPosition();\n\n    this.namesList = game.make.bitmapData(800, 600);\n    this.namesList.context.font = '16px Arial';\n    this.namesList.context.fillStyle = '#ffffff';\n    this.namesList.addToWorld();\n\n    this.nameMsg = game.make.bitmapData(800, 200);\n    this.nameMsg.context.font = '32px Arial';\n    this.nameMsg.context.fillStyle = '#ffffff';\n    this.nameMsg.context.fillText(constants.ENTER_NAME_MSG, 64, 64);\n    this.nameMsg.addToWorld();\n\n    this.bmd = game.make.bitmapData(800, 200);\n    this.bmd.context.font = '64px Arial';\n    this.bmd.context.fillStyle = '#ffffff';\n    this.bmd.context.fillText(this.username, 64, 128);\n    this.bmd.addToWorld();\n\n    game.input.keyboard.addCallbacks(this, null, null, this.keyPress);\n  },\n\n  update: function update() {\n    //this.createTarget();\n  },\n\n  render: function render() {\n    //console.info(game.input.activePointer);\n    //game.debug.pointer( game.input.activePointer );\n  },\n\n  shoot: function shoot() {\n    socketEvent('shoot', { player: this.username });\n    //this.setTargetPosition();\n    // Score = score + 10\n  },\n  setTargetPosition: function setTargetPosition(data) {\n    this.target.reset(data.startPosition.x, data.startPosition.y);\n    this.target.body.velocity.x = data.velocity.x;\n    this.target.body.velocity.y = data.velocity.y;\n  }\n};\n\nvar game = new Phaser.Game(800, 600, Phaser.AUTO, '');\ngame.state.add('main', mainState);\n\ngame.state.start('main');\n\n//////////////////\n// WEBPACK FOOTER\n// ./public/js/app.js\n// module id = 1\n// module chunks = 0\n//# sourceURL=webpack:///./public/js/app.js?");

/***/ },
/* 2 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nfunction hello() {\n  return true;\n}\n\nexports.default = hello;\n\n//////////////////\n// WEBPACK FOOTER\n// ./public/js/x.js\n// module id = 2\n// module chunks = 0\n//# sourceURL=webpack:///./public/js/x.js?");

/***/ }
/******/ ]);