var rocket;
var asteroid;
var cursors;
var jumpButton;
var bg;

var game = new Phaser.Game(1200, 800, Phaser.CANVAS, 'phaser-example', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

function preload() {
    game.stage.disableVisibilityChange = true;
    game.load.spritesheet('dude', 'img/dude.png', 32, 48);
    game.load.spritesheet('rocket', 'img/rocket.png', 48, 48);
    game.load.image('background', 'img/space.jpg');
    game.load.image('asteroid', 'img/asteroid.png');

}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.time.desiredFps = 30;
    bg = game.add.tileSprite(0, 0, 1200, 800, 'background');
    game.physics.arcade.gravity.y = 100;
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    rocket = new Rocket(game, cursors, jumpButton);
    asteroid = new Asteroid(game);
}

function update() {
    game.physics.arcade.collide(rocket.sprite, asteroid.sprite);
    rocket.maneuver();
}

function render() {
    game.debug.text(game.time.suggestedFps, 32, 32);
    game.debug.text(game.time.physicsElapsed, 64, 32);
}