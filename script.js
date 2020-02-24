let hero = {
  html: document.getElementById('hero'),
  pos: 100,
  posJump: 300,
  goingUp: true,
  animated: null,
  move: function () {
    // Detect TOP position
    if (this.pos == this.posJump) {
      this.goingUp = false;
    }
    // Detect END of movement
    if (this.pos == 100 && !this.goingUp) {
      this.goingUp = true;
      clearInterval(this.animated);
      this.animated = null;
    }
    // Calculate new position
    if (this.goingUp) {
      this.pos += 5;
    } else {
      this.pos -= 5;
    }
    // Update HTML
    this.html.style.bottom = `${this.pos}px`
  },
  jump: function () {
    if (this.animated == null) {
      this.animated = setInterval(this.move.bind(this), 10);
    }
  }
}

document.addEventListener("keydown", function (event) {
  if (event.code === "Space" || event.code === "ArrowUp") {
    hero.jump();
  }
});

var parent = document.getElementById('canvas');
var firstChild = document.getElementById('floor');
var addNewChar = `<img id="${hero}" src="${image}" alt="${alt}"></img>`;

const hand = new Enemy("hand", "/images/zombie-hand.png", "mano zombie");
const zombie = new Enemy("zombie", "/images/zombie.png", "zombie");

function NewChar(id, src, alt) {
  this.id = id;
  this.src = src;
  this.alt = alt;
};

function Enemy() {};

Newchar.prototype=Object.create(Enemy(NewChar, id, src, atl));
Enemy.prototype.constructor=Enemy;

console.log(hand);