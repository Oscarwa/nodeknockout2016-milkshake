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

	eval("'use strict';\n\nvar _MainMenuState = __webpack_require__(2);\n\nvar _MainMenuState2 = _interopRequireDefault(_MainMenuState);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Game = function (_Phaser$Game) {\n  _inherits(Game, _Phaser$Game);\n\n  function Game() {\n    _classCallCheck(this, Game);\n\n    var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, 1020, 600, Phaser.AUTO, 'content', null));\n\n    _this.state.add('MainMenuState', _MainMenuState2.default, false);\n    _this.state.start('MainMenuState');\n    return _this;\n  }\n\n  return Game;\n}(Phaser.Game);\n\nnew Game();\n\n//////////////////\n// WEBPACK FOOTER\n// ./public/js/index.js\n// module id = 1\n// module chunks = 0\n//# sourceURL=webpack:///./public/js/index.js?");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _LobbyState = __webpack_require__(3);\n\nvar _LobbyState2 = _interopRequireDefault(_LobbyState);\n\nvar _GameState = __webpack_require__(4);\n\nvar _GameState2 = _interopRequireDefault(_GameState);\n\nvar _sockets = __webpack_require__(5);\n\nvar _globals = __webpack_require__(6);\n\nvar _globals2 = _interopRequireDefault(_globals);\n\nvar _constants = __webpack_require__(7);\n\nvar _constants2 = _interopRequireDefault(_constants);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar MainMenuState = function (_Phaser$State) {\n  _inherits(MainMenuState, _Phaser$State);\n\n  function MainMenuState() {\n    _classCallCheck(this, MainMenuState);\n\n    return _possibleConstructorReturn(this, (MainMenuState.__proto__ || Object.getPrototypeOf(MainMenuState)).apply(this, arguments));\n  }\n\n  _createClass(MainMenuState, [{\n    key: 'create',\n    value: function create() {\n      _globals2.default.username = '';\n\n      // GAME MENU BACKGROUND\n      var splashMenu = this.game.add.image(0, 0, 'splashMenu');\n\n      var backspace = this.game.input.keyboard.addKey(Phaser.KeyCode.BACKSPACE);\n      backspace.onDown.add(this.deleteCharFromName, this);\n\n      var enter = this.game.input.keyboard.addKey(Phaser.KeyCode.ENTER);\n      enter.onDown.add(this.onEnter, this);\n\n      // GAME NAME TEXT\n      this.gameName = this.game.make.bitmapData(800);\n      this.gameName.context.font = '64px Asul';\n      this.gameName.context.fillStyle = '#ffffff';\n      this.gameName.context.fillText(_constants2.default.GAME_NAME, 320, 80);\n      this.gameName.addToWorld();\n\n      // GAME SUBTITLE TEXT\n      this.gameName = this.game.make.bitmapData(800);\n      this.gameName.context.font = '30px Asul';\n      this.gameName.context.fillStyle = '#ffffff';\n      this.gameName.context.fillText(_constants2.default.GAME_SUBTITLE, 390, 110);\n      this.gameName.addToWorld();\n\n      // ENTER NAME TEXT\n      this.nameMsg = this.game.make.bitmapData(800, 500);\n      this.nameMsg.context.font = '32px Asul';\n      this.nameMsg.context.fillStyle = '#ffffff';\n      this.nameMsg.context.fillText(_constants2.default.ENTER_NAME, 90, 220);\n      this.nameMsg.addToWorld();\n\n      // PLAYER NAME\n      this.bmd = this.game.make.bitmapData(800, 600);\n      this.bmd.context.font = '64px Asul';\n      this.bmd.context.fillStyle = '#ffffff';\n      this.bmd.context.fillText('', 100, 320);\n      this.bmd.addToWorld();\n\n      //Ready button\n      this.button = this.game.add.button(this.game.world.centerX + 200, 280, 'button', this.onGo, this, 2, 1, 0);\n      this.button.visible = false;\n\n      this.game.input.keyboard.addCallbacks(this, null, null, this.keyPress);\n\n      this.game.state.add('lobby', _LobbyState2.default);\n      this.game.state.add('game', _GameState2.default);\n    }\n  }, {\n    key: 'deleteCharFromName',\n    value: function deleteCharFromName() {\n      _globals2.default.username = _globals2.default.username.slice(0, _globals2.default.username.length - 1);\n      this.bmd.cls();\n      this.bmd.context.fillText(_globals2.default.username, 100, 320);\n    }\n  }, {\n    key: 'keyPress',\n    value: function keyPress(char) {\n      _globals2.default.username += char;\n      this.bmd.cls();\n      this.bmd.context.fillText(_globals2.default.username, 100, 320);\n    }\n  }, {\n    key: 'onEnter',\n    value: function onEnter() {\n      this.game.state.start('lobby');\n    }\n  }, {\n    key: 'preload',\n    value: function preload() {\n      this.game.load.image('splashMenu', 'img/splash.png');\n      this.game.load.image('button', 'img/ready-btn.png');\n      this.game.load.spritesheet('button', 'img/go-btn.png', 149, 75);\n    }\n  }]);\n\n  return MainMenuState;\n}(Phaser.State);\n\nexports.default = MainMenuState;\n\n//////////////////\n// WEBPACK FOOTER\n// ./public/js/states/MainMenuState.js\n// module id = 2\n// module chunks = 0\n//# sourceURL=webpack:///./public/js/states/MainMenuState.js?");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _GameState = __webpack_require__(4);\n\nvar _GameState2 = _interopRequireDefault(_GameState);\n\nvar _sockets = __webpack_require__(5);\n\nvar _NamesList = __webpack_require__(8);\n\nvar _NamesList2 = _interopRequireDefault(_NamesList);\n\nvar _globals = __webpack_require__(6);\n\nvar _globals2 = _interopRequireDefault(_globals);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar LobbyState = function (_Phaser$State) {\n  _inherits(LobbyState, _Phaser$State);\n\n  function LobbyState() {\n    var _ref;\n\n    var _temp, _this, _ret;\n\n    _classCallCheck(this, LobbyState);\n\n    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LobbyState.__proto__ || Object.getPrototypeOf(LobbyState)).call.apply(_ref, [this].concat(args))), _this), _this.startGame = function () {\n      _this.lobbyNamesList.destroy(true);\n      _this.game.state.start('game');\n    }, _temp), _possibleConstructorReturn(_this, _ret);\n  }\n\n  _createClass(LobbyState, [{\n    key: 'create',\n    value: function create() {\n      this.game.add.image(0, 0, 'lobby');\n\n      var enter = this.game.input.keyboard.addKey(Phaser.KeyCode.ENTER);\n      enter.onDown.add(this.onEnter, this);\n\n      this.lobbyMsg = this.game.add.text(64, 64, 'Lobby', {\n        font: '26px Schoolbell',\n        fill: '#ffffff'\n      });\n      this.playersMsg = this.game.add.text(64, 130, 'Players Ready:', {\n        font: '30px Schoolbell',\n        fill: '#ffffff'\n      });\n\n      this.lobbyNamesList = new _NamesList2.default(this.game, 64, 200, '');\n\n      this.game.state.add('game', _GameState2.default);\n\n      (0, _sockets.socketListen)('gameStarting', this.startGame);\n      (0, _sockets.sendName)(_globals2.default.username);\n\n      //instructions\n      this.target = this.game.add.sprite(600, 120, 'target');\n      this.target.anchor.set(0.5);\n      this.target.scale.set(0.15);\n      this.game.add.text(700, 105, 'Normal target', {\n        font: '26px Schoolbell',\n        fill: '#ffffff'\n      });\n\n      this.target = this.game.add.sprite(600, 220, 'blueTarget');\n      this.target.anchor.set(0.5);\n      this.target.scale.set(0.15);\n      this.game.add.text(700, 205, 'Bonus target', {\n        font: '26px Schoolbell',\n        fill: '#ffffff'\n      });\n\n      this.game.add.sprite(570, 280, 'bomb').scale.set(0.8);\n      this.game.add.text(700, 280, 'Bomb', {\n        font: '26px Schoolbell',\n        fill: '#ffffff'\n      });\n      this.game.add.text(700, 310, 'Explodes on enemies taking \\ndown their score', {\n        font: '16px Schoolbell',\n        fill: '#ffffff'\n      });\n\n      this.game.add.sprite(565, 370, 'timer').scale.set(0.8);\n      this.game.add.text(700, 365, 'Timer', {\n        font: '26px Schoolbell',\n        fill: '#ffffff'\n      });\n      this.game.add.text(700, 395, 'Slow down your target\\'s speed\\nfor the next 10 targets', {\n        font: '16px Schoolbell',\n        fill: '#ffffff'\n      });\n\n      this.game.add.sprite(570, 440, 'bonus').scale.set(0.8);\n      this.game.add.text(700, 450, 'Score++', {\n        font: '26px Schoolbell',\n        fill: '#ffffff'\n      });\n      this.game.add.text(700, 480, 'Gives you some extra score points', {\n        font: '16px Schoolbell',\n        fill: '#ffffff'\n      });\n\n      this.game.add.sprite(565, 520, 'lighting').scale.set(0.8);\n      this.game.add.text(700, 520, 'Lighting', {\n        font: '26px Schoolbell',\n        fill: '#ffffff'\n      });\n      this.game.add.text(700, 550, 'Speed up your enemies target\\'s speed\\nfor the next 5 targets', {\n        font: '16px Schoolbell',\n        fill: '#ffffff'\n      });\n    }\n  }, {\n    key: 'preload',\n    value: function preload() {\n      this.game.load.image('lobby', 'img/lobby.jpg');\n\n      this.game.load.image('bomb', 'img/bombs.png');\n      this.game.load.image('timer', 'img/timer.png');\n      this.game.load.image('bonus', 'img/bonus.png');\n      this.game.load.image('lighting', 'img/lighting.png');\n\n      this.game.load.image('target', 'img/target.png');\n      this.game.load.image('blueTarget', 'img/blue-target.png');\n    }\n  }, {\n    key: 'onEnter',\n    value: function onEnter() {\n      (0, _sockets.sendStartGame)();\n    }\n  }]);\n\n  return LobbyState;\n}(Phaser.State);\n\nexports.default = LobbyState;\n\n//////////////////\n// WEBPACK FOOTER\n// ./public/js/states/LobbyState.js\n// module id = 3\n// module chunks = 0\n//# sourceURL=webpack:///./public/js/states/LobbyState.js?");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _sockets = __webpack_require__(5);\n\nvar _globals = __webpack_require__(6);\n\nvar _globals2 = _interopRequireDefault(_globals);\n\nvar _constants = __webpack_require__(7);\n\nvar _constants2 = _interopRequireDefault(_constants);\n\nvar _NamesList = __webpack_require__(8);\n\nvar _NamesList2 = _interopRequireDefault(_NamesList);\n\nvar _GameOverState = __webpack_require__(9);\n\nvar _GameOverState2 = _interopRequireDefault(_GameOverState);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar GameState = function (_Phaser$State) {\n  _inherits(GameState, _Phaser$State);\n\n  function GameState() {\n    var _ref;\n\n    var _temp, _this, _ret;\n\n    _classCallCheck(this, GameState);\n\n    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = GameState.__proto__ || Object.getPrototypeOf(GameState)).call.apply(_ref, [this].concat(args))), _this), _this.finishGame = function () {\n      _this.BGM.stop();\n      _this.game.state.start('gameover');\n    }, _this.updateList = function (names) {\n      var usersList = names.reduce(function (prev, next) {\n        return '' + prev + next.name + '  ' + next.points + '\\n';\n      }, '');\n      _this.namesList.setText(usersList);\n    }, _temp), _possibleConstructorReturn(_this, _ret);\n  }\n\n  _createClass(GameState, [{\n    key: 'create',\n    value: function create() {\n      //physics & setup\n      var bgIndex = Math.floor(Math.random() * 5) + 1;\n      var bg = this.game.add.image(0, 0, 'bg' + bgIndex);\n      bg.scale.set(1.1);\n      // bg.anchor.set(0.5);\n      this.game.physics.startSystem(Phaser.Physics.Arcade);\n      this.game.renderer.renderSession.roundPixels = true;\n      this.hitSound = this.game.add.audio('hit');\n      this.hit2Sound = this.game.add.audio('hit2');\n      this.BGM = this.game.add.audio('bgm');\n      this.BGM.loopFull();\n\n      this.fx = this.game.add.audio('sfx');\n      this.fx.addMarker('item', 1, 1.0);\n      this.fx.addMarker('boss hit', 3, 0.5);\n      this.fx.addMarker('escape', 4, 3.2);\n      this.fx.addMarker('meow', 8, 0.5);\n      this.fx.addMarker('numkey', 9, 0.1);\n      this.fx.addMarker('ping', 10, 1.0);\n      this.fx.addMarker('death', 12, 4.2);\n      this.fx.addMarker('shot', 17, 1.0);\n      this.fx.addMarker('squit', 19, 0.3);\n\n      this.bonus = this.game.add.sprite(970, 550, 'blank');\n      this.bonus.anchor.set(0.5);\n      // this.bonus.scale.set(0.2);\n\n      //render target\n      this.target = this.game.add.sprite(100, 120, 'target');\n      this.target.anchor.set(0.5);\n      this.target.scale.set(0.15);\n      this.nameBanner = this.game.add.text(30, 15, _constants2.default.GAME_WELCOME_MESSAGE + _constants2.default.GAME_NAME, {\n        font: '26px Schoolbell',\n        fill: '#ffffff'\n      });\n      this.nameBannerSubtitle = this.game.add.text(30, 45, _constants2.default.GAME_INSTRUCTION, {\n        font: '22px Schoolbell',\n        fill: '#ffffff'\n      });\n\n      //socketListen('namesUpdated', this.updateList)\n      this.namesList = new _NamesList2.default(this.game, 700, 50, '');\n\n      //target physics\n      this.game.physics.arcade.enable(this.target);\n      this.target.inputEnabled = true;\n      this.target.events.onInputDown.add(this.shoot, this);\n      this.target.enableBody = true;\n      this.target.body.bounce.x = true;\n      this.target.body.bounce.y = true;\n      this.target.body.collideWorldBounds = true;\n      //this.setTargetPosition();\n      this.initTarget();\n\n      this.counter = 90;\n      this.timer = this.game.add.text(680, 560, 'Time Remaining: ' + this.counter, {\n        font: '26px Schoolbell',\n        fill: '#000'\n      });\n      this.game.time.events.loop(Phaser.Timer.SECOND, this.updateTimeCounter, this);\n      (0, _sockets.socketListen)('gameOver', this.finishGame);\n      this.game.state.add('gameover', _GameOverState2.default);\n    }\n  }, {\n    key: 'updateTimeCounter',\n    value: function updateTimeCounter() {\n      this.counter--;\n      this.timer.setText('Time Remaining: ' + this.counter);\n      // if(this.counter === 0) {\n      //   this.finishGame()\n      // }\n    }\n  }, {\n    key: 'gotBonus',\n    value: function gotBonus() {\n      var bonuses = ['bomb', 'timer', 'bonus', 'lighting'];\n\n      this.item = {\n        canUse: true,\n        type: bonuses[Math.floor(Math.random() * bonuses.length)]\n      };\n\n      this.bonus.loadTexture(this.item.type);\n    }\n  }, {\n    key: 'shoot',\n    value: function shoot(pointer) {\n      this.hitSound.play();\n      (0, _sockets.sendShootData)({ player: _globals2.default.username });\n      this.emitter = this.game.add.emitter(this.game.world.centerX, 200);\n      if (this.isBonusTarget) {\n        this.emitter.makeParticles('broken_target_enemy');\n      } else {\n        this.emitter.makeParticles('broken_target');\n      }\n      this.emitter.bringToTop = true;\n      this.emitter.minParticleScale = 0.13;\n      this.emitter.maxParticleScale = 0.13;\n      this.emitter.gravity = 1000;\n      this.emitter.x = this.target.position.x;\n      this.emitter.y = this.target.position.y;\n      this.emitter.start(true, 2000, null, 5);\n\n      //bonus\n      if (this.isBonusTarget) {\n        this.gotBonus();\n      }\n    }\n  }, {\n    key: 'setTargetPosition',\n    value: function setTargetPosition(data) {\n      this.target.reset(data.startPosition.x, data.startPosition.y);\n      this.target.body.velocity.x = data.velocity.x;\n      this.target.body.velocity.y = data.velocity.y;\n\n      this.slowTimer--;\n      this.lightingTimer--;\n      if (this.slowTimer > 0) {\n        this.target.body.velocity.x /= 2;\n        this.target.body.velocity.y /= 2;\n      }\n      if (this.lightingTimer > 0) {\n        this.target.body.velocity.x *= 2;\n        this.target.body.velocity.y *= 2;\n      }\n    }\n  }, {\n    key: 'update',\n    value: function update() {\n      if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {\n        if (!!this.item && this.item.canUse) {\n          console.info('bonus used');\n          this.fx.play('item');\n          (0, _sockets.socketEvent)('bonus', this.item.type);\n          this.item.canUse = false;\n          this.item.type = 'blank';\n          this.bonus.loadTexture(this.item.type);\n        }\n      }\n    }\n  }, {\n    key: 'preload',\n    value: function preload() {\n      this.game.load.image('target', 'img/target.png');\n      this.game.load.image('blueTarget', 'img/blue-target.png');\n      this.game.load.image('broken_target', 'img/broken_target.png');\n      this.game.load.image('bg1', 'img/game-background-p2-1.jpg');\n      this.game.load.image('bg2', 'img/game-background-p2-2.jpg');\n      this.game.load.image('bg3', 'img/game-background-p2-3.jpg');\n      this.game.load.image('bg4', 'img/game-background-p2-4.jpg');\n      this.game.load.image('bg5', 'img/game-background-p2-5.jpg');\n      this.game.load.image('broken_target_enemy', 'img/blue-target-broken.png');\n\n      //items\n      this.game.load.image('bomb', 'img/bombs.png');\n      this.game.load.image('timer', 'img/timer.png');\n      this.game.load.image('bonus', 'img/bonus.png');\n      this.game.load.image('lighting', 'img/lighting.png');\n      this.game.load.image('blank', 'img/blank.png');\n\n      this.game.load.audio('bgm', 'sound/bgm.mp3');\n      this.game.load.audio('hit', 'sound/crash.ogg');\n      this.game.load.audio('hit2', 'sound/blop.mp3');\n      this.game.load.audio('sfx', 'sound/fx.mp3');\n\n      this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js');\n    }\n  }, {\n    key: 'initTarget',\n    value: function initTarget() {\n      var _this2 = this;\n\n      (0, _sockets.socketEvent)('init');\n\n      (0, _sockets.socketListen)('init', function (data) {\n        _this2.setTargetPosition(data.target);\n        _this2.updateList(data.users);\n      });\n\n      (0, _sockets.socketListen)('shoot', function (data) {\n        if (_globals2.default.username !== data.data.player) {\n          _this2.hit2Sound.play();\n          _this2.emitter = _this2.game.add.emitter(_this2.game.world.centerX, 200);\n          if (_this2.isBonusTarget) {\n            _this2.emitter.makeParticles('broken_target_enemy');\n          } else {\n            _this2.emitter.makeParticles('broken_target');\n          }\n          _this2.emitter.bringToTop = true;\n          _this2.emitter.minParticleScale = 0.13;\n          _this2.emitter.maxParticleScale = 0.13;\n          _this2.emitter.gravity = 1000;\n          _this2.emitter.x = _this2.target.position.x;\n          _this2.emitter.y = _this2.target.position.y;\n          _this2.emitter.start(true, 2000, null, 5);\n        }\n        if (data.target.bonus) {\n          _this2.target.loadTexture('blueTarget');\n        } else {\n          _this2.target.loadTexture('target');\n        }\n        _this2.isBonusTarget = data.target.bonus;\n        _this2.setTargetPosition(data.target);\n      });\n\n      (0, _sockets.socketListen)('bonus', function (type) {\n        switch (type) {\n          case 'lighting':\n            _this2.lightingTimer = 5;\n            _this2.slowTimer = 0;\n            _this2.target.body.velocity.x *= 2;\n            _this2.target.body.velocity.y *= 2;\n            break;\n          case 'timer':\n            _this2.slowTimer = 10;\n            _this2.lightingTimer = 0;\n            _this2.target.body.velocity.x /= 2;\n            _this2.target.body.velocity.y /= 2;\n            break;\n        }\n      });\n    }\n  }]);\n\n  return GameState;\n}(Phaser.State);\n\nexports.default = GameState;\n\n//////////////////\n// WEBPACK FOOTER\n// ./public/js/states/GameState.js\n// module id = 4\n// module chunks = 0\n//# sourceURL=webpack:///./public/js/states/GameState.js?");

/***/ },
/* 5 */
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar socket = io();\n\nvar socketEvent = exports.socketEvent = function socketEvent(eventName, data) {\n  socket.emit(eventName, data);\n};\n\nvar sendShootData = exports.sendShootData = function sendShootData(data) {\n  socketEvent('shoot', data);\n};\n\nvar sendTargetData = exports.sendTargetData = function sendTargetData(data) {\n  socketEvent('targetClicked', data);\n};\n\nvar sendName = exports.sendName = function sendName(data) {\n  socketEvent('nameChanged', data);\n};\n\nvar sendGameOver = exports.sendGameOver = function sendGameOver() {\n  socketEvent('gameOver');\n};\n\nvar sendStartGame = exports.sendStartGame = function sendStartGame() {\n  socketEvent('startGame');\n};\n\nvar socketListen = exports.socketListen = function socketListen(eventName, callback) {\n  socket.on(eventName, callback);\n};\n\nexports.default = socket;\n\n//////////////////\n// WEBPACK FOOTER\n// ./public/js/utils/sockets.js\n// module id = 5\n// module chunks = 0\n//# sourceURL=webpack:///./public/js/utils/sockets.js?");

/***/ },
/* 6 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = {};\n\n//////////////////\n// WEBPACK FOOTER\n// ./public/js/utils/globals.js\n// module id = 6\n// module chunks = 0\n//# sourceURL=webpack:///./public/js/utils/globals.js?");

/***/ },
/* 7 */
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.default = {\n\tGAME_NAME: 'Milkshake',\n\tGAME_SUBTITLE: 'A Multiplayer Game',\n\tENTER_NAME: 'Enter a name then [Press Enter]',\n\tGAME_WELCOME_MESSAGE: 'Welcome to ',\n\tGAME_INSTRUCTION: 'Hit the target to get points\\nPress [SPACE] to use items'\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./public/js/utils/constants.js\n// module id = 7\n// module chunks = 0\n//# sourceURL=webpack:///./public/js/utils/constants.js?");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _sockets = __webpack_require__(5);\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar NamesList = function (_Phaser$Text) {\n  _inherits(NamesList, _Phaser$Text);\n\n  function NamesList(game, x, y, text) {\n    _classCallCheck(this, NamesList);\n\n    var _this = _possibleConstructorReturn(this, (NamesList.__proto__ || Object.getPrototypeOf(NamesList)).call(this, game, x, y, text, {\n      font: '26px Schoolbell',\n      fill: '#ffffff' }));\n\n    _this.updateList = function (names) {\n      var usersList = names.reduce(function (prev, next) {\n        return '' + prev + next.name + '  ' + next.points + '\\n';\n      }, '');\n      _this.setText(usersList);\n    };\n\n    _this.game.stage.addChild(_this);\n    (0, _sockets.socketListen)('pointsUpdated', _this.updateList);\n    (0, _sockets.socketListen)('namesUpdated', _this.updateList);\n    (0, _sockets.socketListen)('newUser', _this.updateList);\n    return _this;\n  }\n\n  return NamesList;\n}(Phaser.Text);\n\nexports.default = NamesList;\n\n//////////////////\n// WEBPACK FOOTER\n// ./public/js/objects/NamesList.js\n// module id = 8\n// module chunks = 0\n//# sourceURL=webpack:///./public/js/objects/NamesList.js?");

/***/ },
/* 9 */
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar GameOverState = function (_Phaser$State) {\n  _inherits(GameOverState, _Phaser$State);\n\n  function GameOverState() {\n    _classCallCheck(this, GameOverState);\n\n    return _possibleConstructorReturn(this, (GameOverState.__proto__ || Object.getPrototypeOf(GameOverState)).apply(this, arguments));\n  }\n\n  _createClass(GameOverState, [{\n    key: 'create',\n    value: function create() {\n      var center = {\n        x: this.game.world.centerX,\n        y: this.game.world.centerY\n      };\n      this.gameoverMsg = this.game.add.text(center.x, center.y - 50, 'Game Over', {\n        font: '100px Schoolbell',\n        fill: '#fff'\n      });\n      this.restart = this.game.add.text(center.x, center.y + 60, 'Restart?', {\n        font: '50px Schoolbell',\n        fill: '#fff'\n      });\n      this.gameoverMsg.anchor.setTo(0.5, 0.5);\n      this.restart.anchor.setTo(0.5, 0.5);\n    }\n  }]);\n\n  return GameOverState;\n}(Phaser.State);\n\nexports.default = GameOverState;\n\n//////////////////\n// WEBPACK FOOTER\n// ./public/js/states/GameOverState.js\n// module id = 9\n// module chunks = 0\n//# sourceURL=webpack:///./public/js/states/GameOverState.js?");

/***/ }
/******/ ]);