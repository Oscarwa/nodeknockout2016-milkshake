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

	eval("__webpack_require__(1);\nmodule.exports = __webpack_require__(2);\n\n\n//////////////////\n// WEBPACK FOOTER\n// multi main\n// module id = 0\n// module chunks = 0\n//# sourceURL=webpack:///multi_main?");

/***/ },
/* 1 */
/***/ function(module, exports) {

	eval("\nconst preload = () => {\n  game.load.image('target', 'img/target.png');\n}\n\nconst create = () => {\n  var target1 = game.add.sprite(100, 120, 'target');\n  target1.anchor.set(0.5);\n  target1.scale.set(0.2);\n}\n\nconst update = () => {\n}\n\nvar game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });\n\n//////////////////\n// WEBPACK FOOTER\n// ./public/js/app.js\n// module id = 1\n// module chunks = 0\n//# sourceURL=webpack:///./public/js/app.js?");

/***/ },
/* 2 */
/***/ function(module, exports) {

	eval("var socket = io();\n\nsocket.emit('online', {online:true});\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./public/js/rt.js\n// module id = 2\n// module chunks = 0\n//# sourceURL=webpack:///./public/js/rt.js?");

/***/ }
/******/ ]);