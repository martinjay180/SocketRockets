function Rocket(game, cursors, jumpButton) {
    this.game = game;
    this.sprite = null;
    this.facing = 'left';
    this.cursors = cursors;
    this.jumpButton = jumpButton;
    this.jumpTimer = 0;
    this.init();
}

Rocket.prototype = {
    constructor: Rocket,
    init: function () {
        this.sprite = this.game.add.sprite(48, 48, 'rocket');
        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.bounce.y = 0.2;
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.setSize(20, 32, 5, 16);
        this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
        this.sprite.animations.add('turn', [4], 20, true);
        this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
    },
    maneuver: function () {
        if (this.cursors.left.isDown) {
            this.sprite.body.velocity.x = -150;
            if (this.facing != 'left') {
                this.sprite.animations.play('left');
                this.facing = 'left';
            }
        } else if (this.cursors.up.isDown) {
            this.sprite.body.velocity.y = -150;
        } else if (this.cursors.right.isDown) {
            this.sprite.body.velocity.x = 150;

            if (this.facing != 'right') {
                this.sprite.animations.play('right');
                this.facing = 'right';
            }
        } else if (this.cursors.down.isDown) {
            this.sprite.body.velocity.y = 150;
        } else {
            if (this.facing != 'idle') {
                this.sprite.animations.stop();

                if (this.facing == 'left') {
                    this.sprite.frame = 0;
                } else {
                    this.sprite.frame = 5;
                }

                this.facing = 'idle';
            }
        }

        if (this.jumpButton.isDown && this.sprite.body.onFloor() && this.game.time.now > this.jumpTimer) {
            this.sprite.body.velocity.y = -250;
            this.jumpTimer = this.game.time.now + 750;
        }

        // if (player.body.velocity.x != 0 || player.body.velocity.y != 0) {
        //     rocket.position = player.body.position;
        //     socket.emit("updatePosition", rocket);
        // }
    }
}