/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./animation-demo.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./animation-demo.js":
/*!***************************!*\
  !*** ./animation-demo.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _animation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animation.js */ \"./animation.js\");\n/* harmony import */ var _ease__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ease */ \"./ease.js\");\n\n\nvar t1 = new _animation_js__WEBPACK_IMPORTED_MODULE_0__[\"Timeline\"]();\nt1.start();\nt1.add(new _animation_js__WEBPACK_IMPORTED_MODULE_0__[\"Animation\"](document.querySelector('#el').style, 'transform', 0, 500, 2000, 0, _ease__WEBPACK_IMPORTED_MODULE_1__[\"ease\"], function (v) {\n  return \"translateX(\".concat(v, \"px)\");\n}));\ndocument.querySelector('#pause-btn').addEventListener('click', function (evt) {\n  t1.pause();\n});\ndocument.querySelector('#resume-btn').addEventListener('click', function (evt) {\n  t1.resume();\n});\n\n//# sourceURL=webpack:///./animation-demo.js?");

/***/ }),

/***/ "./animation.js":
/*!**********************!*\
  !*** ./animation.js ***!
  \**********************/
/*! exports provided: Timeline, Animation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Timeline\", function() { return Timeline; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Animation\", function() { return Animation; });\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar TICK = Symbol('tick');\nvar TICK_HANDLER = Symbol('tick-handler');\nvar ANIMATIONS = Symbol('animations');\nvar START_TIME = Symbol('start-time');\nvar PAUSE_START = Symbol('pause-start');\nvar PAUSE_END = Symbol('pause-end');\nvar PAUSE_TIME = Symbol('pause-time');\nvar Timeline = /*#__PURE__*/function () {\n  function Timeline() {\n    _classCallCheck(this, Timeline);\n\n    // TICK唯一性\n    this[ANIMATIONS] = new Set();\n    this[START_TIME] = new Map();\n  }\n\n  _createClass(Timeline, [{\n    key: \"start\",\n    value: function start() {\n      var _this = this;\n\n      var startTime = Date.now();\n      this[PAUSE_TIME] = 0;\n\n      this[TICK] = function () {\n        var now = Date.now();\n\n        var _iterator = _createForOfIteratorHelper(_this[ANIMATIONS]),\n            _step;\n\n        try {\n          for (_iterator.s(); !(_step = _iterator.n()).done;) {\n            var animation = _step.value;\n            var t = void 0;\n            if (_this[START_TIME].get(animation) < startTime) t = now - startTime - _this[PAUSE_TIME] - animation.delay;else t = now - _this[START_TIME].get(animation) - _this[PAUSE_TIME] - animation.delay;\n\n            if (animation.duration < t) {\n              _this[ANIMATIONS][\"delete\"](animation);\n\n              t = animation.duration;\n            }\n\n            if (t > 0) animation.receive(t);\n          }\n        } catch (err) {\n          _iterator.e(err);\n        } finally {\n          _iterator.f();\n        }\n\n        _this[TICK_HANDLER] = requestAnimationFrame(_this[TICK]);\n      };\n\n      this[TICK]();\n    } // 暂停\n\n  }, {\n    key: \"pause\",\n    value: function pause() {\n      this[PAUSE_START] = Date.now();\n      cancelAnimationFrame(this[TICK_HANDLER]);\n    } // 恢复\n\n  }, {\n    key: \"resume\",\n    value: function resume() {\n      this[PAUSE_TIME] += Date.now() - this[PAUSE_START];\n      this[TICK]();\n    } // 重启\n\n  }, {\n    key: \"reset\",\n    value: function reset() {}\n  }, {\n    key: \"add\",\n    value: function add(animation, startTime) {\n      if (arguments.length < 2) {\n        startTime = Date.now();\n      }\n\n      this[ANIMATIONS].add(animation);\n      this[START_TIME].set(animation, startTime);\n    }\n  }]);\n\n  return Timeline;\n}();\nvar Animation = /*#__PURE__*/function () {\n  function Animation(object, property, startValue, endValue, duration, delay, timingFunction, template) {\n    _classCallCheck(this, Animation);\n\n    timingFunction = timingFunction || function (v) {\n      return v;\n    };\n\n    template = template || function (v) {\n      return v;\n    };\n\n    this.object = object;\n    this.property = property;\n    this.startValue = startValue;\n    this.endValue = endValue;\n    this.duration = duration;\n    this.timingFunction = timingFunction;\n    this.delay = delay;\n    this.template = template;\n  }\n\n  _createClass(Animation, [{\n    key: \"receive\",\n    value: function receive(time) {\n      var range = this.endValue - this.startValue;\n      var progress = this.timingFunction(time / this.duration);\n      this.object[this.property] = this.template(this.startValue + range * progress);\n    }\n  }]);\n\n  return Animation;\n}();\n\n//# sourceURL=webpack:///./animation.js?");

/***/ }),

/***/ "./ease.js":
/*!*****************!*\
  !*** ./ease.js ***!
  \*****************/
/*! exports provided: ease, easeIn, easeOut, easeInOut */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ease\", function() { return ease; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easeIn\", function() { return easeIn; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easeOut\", function() { return easeOut; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easeInOut\", function() { return easeInOut; });\n/**\n * https://github.com/gre/bezier-easing\n * BezierEasing - use bezier curve for transition easing function\n * by Gaëtan Renaudeau 2014 - 2015 – MIT License\n */\n// These values are established by empiricism with tests (tradeoff: performance VS precision)\nvar NEWTON_ITERATIONS = 4;\nvar NEWTON_MIN_SLOPE = 0.001;\nvar SUBDIVISION_PRECISION = 0.0000001;\nvar SUBDIVISION_MAX_ITERATIONS = 10;\nvar kSplineTableSize = 11;\nvar kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);\nvar float32ArraySupported = typeof Float32Array === 'function';\n\nfunction A(aA1, aA2) {\n  return 1.0 - 3.0 * aA2 + 3.0 * aA1;\n}\n\nfunction B(aA1, aA2) {\n  return 3.0 * aA2 - 6.0 * aA1;\n}\n\nfunction C(aA1) {\n  return 3.0 * aA1;\n} // Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.\n\n\nfunction calcBezier(aT, aA1, aA2) {\n  return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;\n} // Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.\n\n\nfunction getSlope(aT, aA1, aA2) {\n  return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);\n}\n\nfunction binarySubdivide(aX, aA, aB, mX1, mX2) {\n  var currentX,\n      currentT,\n      i = 0;\n\n  do {\n    currentT = aA + (aB - aA) / 2.0;\n    currentX = calcBezier(currentT, mX1, mX2) - aX;\n\n    if (currentX > 0.0) {\n      aB = currentT;\n    } else {\n      aA = currentT;\n    }\n  } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);\n\n  return currentT;\n}\n\nfunction newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {\n  for (var i = 0; i < NEWTON_ITERATIONS; ++i) {\n    var currentSlope = getSlope(aGuessT, mX1, mX2);\n\n    if (currentSlope === 0.0) {\n      return aGuessT;\n    }\n\n    var currentX = calcBezier(aGuessT, mX1, mX2) - aX;\n    aGuessT -= currentX / currentSlope;\n  }\n\n  return aGuessT;\n}\n\nfunction LinearEasing(x) {\n  return x;\n}\n\nfunction bezier(mX1, mY1, mX2, mY2) {\n  if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {\n    throw new Error('bezier x values must be in [0, 1] range');\n  }\n\n  if (mX1 === mY1 && mX2 === mY2) {\n    return LinearEasing;\n  } // Precompute samples table\n\n\n  var sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);\n\n  for (var i = 0; i < kSplineTableSize; ++i) {\n    sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);\n  }\n\n  function getTForX(aX) {\n    var intervalStart = 0.0;\n    var currentSample = 1;\n    var lastSample = kSplineTableSize - 1;\n\n    for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {\n      intervalStart += kSampleStepSize;\n    }\n\n    --currentSample; // Interpolate to provide an initial guess for t\n\n    var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);\n    var guessForT = intervalStart + dist * kSampleStepSize;\n    var initialSlope = getSlope(guessForT, mX1, mX2);\n\n    if (initialSlope >= NEWTON_MIN_SLOPE) {\n      return newtonRaphsonIterate(aX, guessForT, mX1, mX2);\n    } else if (initialSlope === 0.0) {\n      return guessForT;\n    } else {\n      return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);\n    }\n  }\n\n  return function BezierEasing(x) {\n    // Because JavaScript number are imprecise, we should guarantee the extremes are right.\n    if (x === 0 || x === 1) {\n      return x;\n    }\n\n    return calcBezier(getTForX(x), mY1, mY2);\n  };\n}\n\n;\nvar ease = bezier(.25, .1, .25, .1);\nvar easeIn = bezier(.42, 0, 1, 1);\nvar easeOut = bezier(0, 0, .58, 1);\nvar easeInOut = bezier(.42, 0, .58, 1);\n\n//# sourceURL=webpack:///./ease.js?");

/***/ })

/******/ });