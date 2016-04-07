function Asteroid(game) {
    this.game = game;
    this.sprite = null;
    this.init();
}

Asteroid.prototype = {
    constructor: Asteroid,
    init: function () {
        this.sprite = this.game.add.sprite(256, 256, 'asteroid');
        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.immovable = false;
        this.sprite.body.setSize(256 - 48 - 48, 256 - 48 - 48, 48, 48);
        this.sprite.body.bounce = new Phaser.Point(.5, 1);
    }
}