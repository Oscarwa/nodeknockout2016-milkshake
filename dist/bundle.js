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

	eval("'use strict';\n\nvar _MainMenuState = __webpack_require__(2);\n\nvar _MainMenuState2 = _interopRequireDefault(_MainMenuState);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Game = function (_Phaser$Game) {\n  _inherits(Game, _Phaser$Game);\n\n  function Game() {\n    _classCallCheck(this, Game);\n\n    var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, 800, 600, Phaser.AUTO, 'content', null));\n\n    _this.state.add('MainMenuState', _MainMenuState2.default, false);\n    _this.state.start('MainMenuState');\n    return _this;\n  }\n\n  return Game;\n}(Phaser.Game);\n\nnew Game();\n\n//////////////////\n// WEBPACK FOOTER\n// ./public/js/index.js\n// module id = 1\n// module chunks = 0\n//# sourceURL=webpack:///./public/js/index.js?");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _MainState = __webpack_require__(3);\n\nvar _MainState2 = _interopRequireDefault(_MainState);\n\nvar _sockets = __webpack_require__(4);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar constants = {\n  ENTER_NAME_MSG: 'Please enter your name'\n};\n\nvar MainMenuState = function (_Phaser$State) {\n  _inherits(MainMenuState, _Phaser$State);\n\n  function MainMenuState() {\n    _classCallCheck(this, MainMenuState);\n\n    return _possibleConstructorReturn(this, (MainMenuState.__proto__ || Object.getPrototypeOf(MainMenuState)).apply(this, arguments));\n  }\n\n  _createClass(MainMenuState, [{\n    key: 'create',\n    value: function create() {\n      this.username = '';\n\n      var backspace = this.game.input.keyboard.addKey(Phaser.KeyCode.BACKSPACE);\n      backspace.onDown.add(this.deleteCharFromName, this);\n\n      var enter = this.game.input.keyboard.addKey(Phaser.KeyCode.ENTER);\n      enter.onDown.add(this.saveName, this);\n\n      this.namesList = this.game.make.bitmapData(800, 600);\n      this.namesList.context.font = '16px Arial';\n      this.namesList.context.fillStyle = '#ffffff';\n      this.namesList.addToWorld();\n\n      this.nameMsg = this.game.make.bitmapData(800, 200);\n      this.nameMsg.context.font = '32px Arial';\n      this.nameMsg.context.fillStyle = '#ffffff';\n      this.nameMsg.context.fillText(constants.ENTER_NAME_MSG, 64, 64);\n      this.nameMsg.addToWorld();\n\n      this.bmd = this.game.make.bitmapData(800, 200);\n      this.bmd.context.font = '64px Arial';\n      this.bmd.context.fillStyle = '#ffffff';\n      this.bmd.context.fillText('me', 64, 128);\n      this.bmd.addToWorld();\n\n      this.game.input.keyboard.addCallbacks(this, null, null, this.keyPress);\n\n      this.game.state.add('main', _MainState2.default);\n    }\n  }, {\n    key: 'deleteCharFromName',\n    value: function deleteCharFromName() {\n      this.username = this.username.slice(0, this.username.length - 1);\n      this.bmd.cls();\n      this.bmd.context.fillText(this.username, 64, 128);\n    }\n  }, {\n    key: 'keyPress',\n    value: function keyPress(char) {\n      this.username += char;\n      this.bmd.cls();\n      this.bmd.context.fillText(this.username, 64, 128);\n    }\n  }, {\n    key: 'saveName',\n    value: function saveName() {\n      this.name = this.username;\n      alert('Saved your name as:' + this.name);\n      (0, _sockets.socketEvent)('saveName', this.name);\n      this.bmd.cls();\n      this.nameMsg.cls();\n      this.game.state.start('main');\n    }\n  }]);\n\n  return MainMenuState;\n}(Phaser.State);\n\nexports.default = MainMenuState;\n\n//////////////////\n// WEBPACK FOOTER\n// ./public/js/states/MainMenuState.js\n// module id = 2\n// module chunks = 0\n//# sourceURL=webpack:///./public/js/states/MainMenuState.js?");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _sockets = __webpack_require__(4);\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar MainState = function (_Phaser$State) {\n  _inherits(MainState, _Phaser$State);\n\n  function MainState() {\n    _classCallCheck(this, MainState);\n\n    return _possibleConstructorReturn(this, (MainState.__proto__ || Object.getPrototypeOf(MainState)).apply(this, arguments));\n  }\n\n  _createClass(MainState, [{\n    key: 'create',\n    value: function create() {\n      this.game.stage.backgroundColor = '#3498DB';\n      this.game.physics.startSystem(Phaser.Physics.Arcade);\n      this.game.renderer.renderSession.roundPixels = true;\n\n      //render target\n      this.target = this.game.add.sprite(100, 120, 'target');\n      this.target.anchor.set(0.5);\n      this.target.scale.set(0.2);\n\n      //target physics\n      this.game.physics.arcade.enable(this.target);\n      this.target.inputEnabled = true;\n      this.target.events.onInputDown.add(this.shoot, this);\n      this.target.enableBody = true;\n      this.target.body.bounce.x = true;\n      this.target.body.bounce.y = true;\n      this.target.body.collideWorldBounds = true;\n      //this.setTargetPosition();\n      this.initTarget();\n    }\n  }, {\n    key: 'shoot',\n    value: function shoot() {\n      (0, _sockets.socketEvent)('shoot', { player: this.username });\n      //this.setTargetPosition();\n    }\n  }, {\n    key: 'setTargetPosition',\n    value: function setTargetPosition(data) {\n      this.target.reset(data.startPosition.x, data.startPosition.y);\n      this.target.body.velocity.x = data.velocity.x;\n      this.target.body.velocity.y = data.velocity.y;\n    }\n  }, {\n    key: 'preload',\n    value: function preload() {\n      this.game.load.image('target', 'img/target.png');\n    }\n  }, {\n    key: 'initTarget',\n    value: function initTarget() {\n      var _this2 = this;\n\n      (0, _sockets.socketEvent)('init');\n\n      (0, _sockets.socketListen)('init', function (data) {\n        _this2.setTargetPosition(data);\n      });\n\n      (0, _sockets.socketListen)('shoot', function (data) {\n        //console.log(data);\n        _this2.setTargetPosition(data.target);\n      });\n    }\n  }]);\n\n  return MainState;\n}(Phaser.State);\n\nexports.default = MainState;\n\n//////////////////\n// WEBPACK FOOTER\n// ./public/js/states/MainState.js\n// module id = 3\n// module chunks = 0\n//# sourceURL=webpack:///./public/js/states/MainState.js?");

/***/ },
/* 4 */
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar socket = io();\n\nvar socketEvent = exports.socketEvent = function socketEvent(eventName, data) {\n  socket.emit(eventName, data);\n  console.log('emitted', eventName, 'with Data', data);\n};\n\nvar socketListen = exports.socketListen = function socketListen(eventName, callback) {\n  socket.on(eventName, callback);\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./public/js/utils/sockets.js\n// module id = 4\n// module chunks = 0\n//# sourceURL=webpack:///./public/js/utils/sockets.js?");

/***/ }
/******/ ]);