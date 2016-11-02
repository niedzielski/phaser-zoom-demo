/* eslint-disable node/no-unpublished-require,node/no-missing-require */

// https://github.com/photonstorm/phaser#browserify--cjs
// imports are hoisted and cannot be used here
window.PIXI = require('phaser/build/custom/pixi')
window.p2 = require('phaser/build/custom/p2')
window.Phaser = require('phaser/build/custom/phaser-split')

module.exports = require('phaser')