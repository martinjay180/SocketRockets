var assert = require('assert');
var string = require('../src/js/asteroid.js
require('../bower_components/phaser/build/phaser.min.js')

var game = new Phaser.Game(1200, 800, Phaser.CANVAS, 'phaser-example', {
            preload: preload,
            create: create,
            update: update,
            render: render
        });

describe('Asteroid', function () {
    it('should load new rocket', function () {
        asteroid = new Asteroid(game);
    });
});