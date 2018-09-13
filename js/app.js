// Enemies our player must avoid
const Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y + 55;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.horizontal = 100 + Math.floor(Math.random() * 256);
    this.offscreen = this.horizontal * 5;
    this.resetBug = -101;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.horizontal * dt;

    // reset enemies to the left hand side of the screen
    if(this.x < this.offscreen) {
      this.x += 200 * dt;
    } else {
      this.x = this.resetBug;
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
    this.sprite = 'images/char-boy.png';
    this.vertical = 83;
    this.horizontal = 101;
    this.startY = (this.vertical * 5) + 55;
    this.startX = (this.horizontal * 2);
    this.x = this.startX;
    this.y = this.startY;
    this.success = false;

  }

  render() {ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(input) {
    switch(input) {
      case 'left':
        if(this.x > 0) {
          this.x -= this.horizontal;
        }
        break;
      case 'up':
        if(this.y > this.vertical) {
        this.y -= this.vertical;
      }
        break;
      case 'right':
        if(this.x < this.horizontal * 4) {
          this.x += this.horizontal;
        }
        break;
      case 'down':
        if(this.y < this.vertical * 4) {
            this.y += this.vertical;
        }

        break;
    }
  }

  update() {
    for(let enemy of allEnemies) {

      // check for collisons

      if (this.y === enemy.y && (enemy.x + enemy.horizontal/5 > this.x &&
      enemy.x < this.x + this.horizontal/5)) {
        this.reset();
      }
    }

    if(this.y === 55) {
      this.success = true;
    }


  }

  // reset game
  reset() {
    this.y = this.startY;
    this.x = this.startX;
  }



} // closes Hero class









// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const bug1 = new Enemy(-101, 0);
const bug2 = new Enemy(-101, 0);
const bug3 = new Enemy(-101*2.5, 83);
const bug4 = new Enemy(-101*1.5, 83);
const bug5 = new Enemy(-101, 166);
const bug6 = new Enemy(-101*2, 249)
const allEnemies = [];
allEnemies.push(bug1, bug2, bug3, bug4, bug5, bug6);

// Place the player object in a variable called player
const player = new Hero();


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
