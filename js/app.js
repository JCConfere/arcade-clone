class Enemy {
  constructor(x,y) {
    this.x = x;
    this.y = y + 55;
    this.sprite='images/enemy-bug.png';
    this.horizontal = 100 + Math.floor(Math.random() * 256);
    this.offscreen = this.horizontal * 5;
    this.resetBug = -101;
  }

  update(dt) {
    this.x += this.horizontal * dt;

    if(this.x < this.offscreen) {
      this.x += 200 * dt;
    } else {
      this.x = this.resetBug
    }

  }

  render() {ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }


} //  closes Enemy class


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
this.y = allEnemies[Math.floor(Math.random() * allEnemies.length)];

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
