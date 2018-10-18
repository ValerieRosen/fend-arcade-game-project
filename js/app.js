'use strict';
// Enemies our player must avoid
let Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y + 55;
    this.speed = speed;
    this.step = 101;
    this.sprite = 'images/enemy-bug.png';
    this.boundary = this.step * 5;
    this.resetPOS = -this.step;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x < this.boundary) {
            this.x += this.speed * dt;
        } else {
             this.x = this.resetPos;
             this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Hero {
    constructor() {
        this.sprite = 'images/char-princess-girl.png';
        this.step = 101;
        this.jump = 83;
        this.startX = this.step * 2;
        this.startY = (this.jump * 4) + 55;
        this.x = this.startX;
        this.y = this.startY;
        this.victory = false;
    }
        update() {
            //Checking for collision
            for(let enemy of allEnemies) {

                //Did hero x and y collide with enemy?
                if (this.y === enemy.y && (enemy.x + enemy.step/1.5 > this.x && enemy.x < this.x + this.step/1.5)) {
                this.reset();
            }
        }
        
        if(this.y === 55) {
            this.victory = true;
        }
    }

    //Draw hero sprite on x and y coord
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    /** Update hero's x and y property according to input
     * @param {string} input - Direction to travel
     */
    handleInput(input) {
        switch(input) {
            case 'left':
                if (this.x > 0) {
                    this.x -= this.step;
                }
                break;
            case 'up':
                if (this.y > this.jump) {
                this.y -= this.jump;
                }
                break;
            case 'right':
                if (this.x < this.step * 4) {
                    this.x += this.step;
                }
                break;
            case 'down':
                if (this.y < this.jump * 4) {
                this.y += this.jump;
                }
                break;
        }

    }
//Reset hero
        reset() {
            this.y = this.startY;
            this.x = this.startX;
        }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
        const player = new Hero();
        const allEnemies = [
         new Enemy(-101, 0, 150),
         new Enemy(-101, 83, 250),
         new Enemy((-101 * 2.5), 83, 225),
         new Enemy((-101 * 1.5), 166, 200),
         new Enemy((-101 * 3.5), 166, 200),
        ];
        allEnemies.push();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
