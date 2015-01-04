!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.PinkNoise=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var generateWhiteNoise = require('openmusic-white-noise');

// Adapted from https://github.com/zacharydenton/noise.js/blob/master/noise.js
module.exports = function(size) {

	var out = generateWhiteNoise(size);
	var b0, b1, b2, b3, b4, b5, b6;
	
	b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;

	for (var i = 0; i < size; i++) {

		var white = out[i];

		b0 = 0.99886 * b0 + white * 0.0555179;
		b1 = 0.99332 * b1 + white * 0.0750759;
		b2 = 0.96900 * b2 + white * 0.1538520;
		b3 = 0.86650 * b3 + white * 0.3104856;
		b4 = 0.55000 * b4 + white * 0.5329522;
		b5 = -0.7616 * b5 - white * 0.0168980;
		out[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
		out[i] *= 0.11; // (roughly) compensate for gain
		b6 = white * 0.115926;

	}

	return out;
	
};

},{"openmusic-white-noise":2}],2:[function(require,module,exports){
module.exports = function(size) {

	var out = [];
	for(var i = 0; i < size; i++) {
		out.push(Math.random() * 2 - 1);
	}
	return out;

};

},{}],3:[function(require,module,exports){
var generatePinkNoise = require('openmusic-pink-noise');

/**
 * A pink noise source
 *
 * **Outputs**
 *
 * - Pink noise
 *
 * @constructor
 * @extends AudioletNode
 * @param {Audiolet} audiolet The audiolet object.
 */
var PinkNoise = function(audiolet) {
    AudioletNode.call(this, audiolet, 0, 1);
};
extend(PinkNoise, AudioletNode);

/**
 * Process samples
 */
PinkNoise.prototype.generate = function() {
    this.outputs[0].samples[0] = generatePinkNoise(1);
};

/**
 * toString
 *
 * @return {String} String representation.
 */
PinkNoise.prototype.toString = function() {
    return 'Pink Noise';
};

module.exports = PinkNoise;
},{"openmusic-pink-noise":1}]},{},[3])(3)
});