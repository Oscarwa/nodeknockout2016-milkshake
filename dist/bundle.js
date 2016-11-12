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

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _GameState = __webpack_require__(!(function webpackMissingModule() { var e = new Error(\"Cannot find module \\\"states/GameState\\\"\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\n\nvar _GameState2 = _interopRequireDefault(_GameState);\n\nvar _sockets = __webpack_require__(4);\n\nvar _globals = __webpack_require__(6);\n\nvar _globals2 = _interopRequireDefault(_globals);\n\nvar _constants = __webpack_require__(7);\n\nvar _constants2 = _interopRequireDefault(_constants);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar MainMenuState = function (_Phaser$State) {\n  _inherits(MainMenuState, _Phaser$State);\n\n  function MainMenuState() {\n    _classCallCheck(this, MainMenuState);\n\n    return _possibleConstructorReturn(this, (MainMenuState.__proto__ || Object.getPrototypeOf(MainMenuState)).apply(this, arguments));\n  }\n\n  _createClass(MainMenuState, [{\n    key: 'create',\n    value: function create() {\n      _globals2.default.username = '';\n\n      var backspace = this.game.input.keyboard.addKey(Phaser.KeyCode.BACKSPACE);\n      backspace.onDown.add(this.deleteCharFromName, this);\n\n      var enter = this.game.input.keyboard.addKey(Phaser.KeyCode.ENTER);\n      enter.onDown.add(this.saveName, this);\n\n      this.namesList = this.game.make.bitmapData(800, 600);\n      this.namesList.context.font = '16px Arial';\n      this.namesList.context.fillStyle = '#ffffff';\n      this.namesList.addToWorld();\n\n      this.nameMsg = this.game.make.bitmapData(800, 200);\n      this.nameMsg.context.font = '32px Arial';\n      this.nameMsg.context.fillStyle = '#ffffff';\n      this.nameMsg.context.fillText(_constants2.default.ENTER_NAME, 64, 64);\n      this.nameMsg.addToWorld();\n\n      this.bmd = this.game.make.bitmapData(800, 200);\n      this.bmd.context.font = '64px Arial';\n      this.bmd.context.fillStyle = '#ffffff';\n      this.bmd.context.fillText('', 64, 128);\n      this.bmd.addToWorld();\n\n      this.game.input.keyboard.addCallbacks(this, null, null, this.keyPress);\n\n      this.game.state.add('game', _GameState2.default);\n    }\n  }, {\n    key: 'deleteCharFromName',\n    value: function deleteCharFromName() {\n      _globals2.default.username = _globals2.default.username.slice(0, _globals2.default.username.length - 1);\n      this.bmd.cls();\n      this.bmd.context.fillText(_globals2.default.username, 64, 128);\n    }\n  }, {\n    key: 'keyPress',\n    value: function keyPress(char) {\n      _globals2.default.username += char;\n      this.bmd.cls();\n      this.bmd.context.fillText(_globals2.default.username, 64, 128);\n    }\n  }, {\n    key: 'saveName',\n    value: function saveName() {\n      alert('Saved your name as:' + _globals2.default.username);\n      (0, _sockets.socketEvent)('saveName', _globals2.default.username);\n      this.bmd.cls();\n      this.nameMsg.cls();\n      this.game.state.start('game');\n    }\n  }]);\n\n  return MainMenuState;\n}(Phaser.State);\n\nexports.default = MainMenuState;\n\n//////////////////\n// WEBPACK FOOTER\n// ./public/js/states/MainMenuState.js\n// module id = 2\n// module chunks = 0\n//# sourceURL=webpack:///./public/js/states/MainMenuState.js?");

/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar socket = io();\n\nvar socketEvent = exports.socketEvent = function socketEvent(eventName, data) {\n  socket.emit(eventName, data);\n};\n\nvar sendShootData = exports.sendShootData = function sendShootData(data) {\n  socketEvent('shoot', data);\n};\n\nvar sendTargetData = exports.sendTargetData = function sendTargetData(data) {\n  socketEvent('targetClicked', data);\n};\n\nvar socketListen = exports.socketListen = function socketListen(eventName, callback) {\n  socket.on(eventName, callback);\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./public/js/utils/sockets.js\n// module id = 4\n// module chunks = 0\n//# sourceURL=webpack:///./public/js/utils/sockets.js?");

/***/ },
/* 5 */,
/* 6 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = {};\n\n//////////////////\n// WEBPACK FOOTER\n// ./public/js/utils/globals.js\n// module id = 6\n// module chunks = 0\n//# sourceURL=webpack:///./public/js/utils/globals.js?");

/***/ },
/* 7 */
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = {\n  ENTER_NAME: 'Please enter a name'\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./public/js/utils/constants.js\n// module id = 7\n// module chunks = 0\n//# sourceURL=webpack:///./public/js/utils/constants.js?");

/***/ }
/******/ ]);