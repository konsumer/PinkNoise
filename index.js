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