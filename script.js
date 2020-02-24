const CANVAS = document.getElementById('canvas');

let hero = {
  html: document.getElementById('hero'),
  pos: 100, // Distancia del botton del canvas eje y
  posJump: 400,
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

function Enemy(id, src, pos) {
  this.id = id;
  this.src = src;
  this.pos = pos;

  var htmlEnemy = document.createElement('img');
  htmlEnemy.id = id;
  htmlEnemy.src = src;
  htmlEnemy.style.right = `${pos}px`;
  htmlEnemy.classList.add('enemy');
  CANVAS.appendChild(htmlEnemy);

  this.move = function () {
    this.pos += 10;
    document.getElementById(this.id).style.right = `${this.pos}px`;
  }
};

const GAME = {
  enemies: [],
  numEnemies: 10,
  posVariability: 200,
  enemyDistance: 1000,
  timerId: null,
  init: function () {
    for (let i = 0; i < this.numEnemies; i++) {
      var rightPos = Math.floor(Math.random() * this.posVariability) - (this.enemyDistance * i);
      if (Math.random() > 0.5) {
        var img = "/images/zombie-hand.png";
      } else {
        var img = "/images/zombie.png";
      }
      this.enemies.push(new Enemy(`enemy-${i + 1}`, img, rightPos));
    }
  },
  start: function () {
   // var x = 60;
   // var y = 496;
    if (this.timerId == null) {
      this.timerId = setInterval(function () {
        this.enemies.forEach(function (enemy) {
          enemy.move();
          if (hero.x < enemy.x + enemy.width && hero.x + hero.width > enemy.x){ alert('COLISSION!!') }
        }) 
      }.bind(this), 30)
    }
  },
  stop: function () {
    clearInterval(this.timerId);
    this.timerId = null;
  }
}

GAME.init();
