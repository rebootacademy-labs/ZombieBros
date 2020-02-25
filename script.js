const CANVAS = document.getElementById('canvas');

let hero = {
  html: document.getElementById('hero'),
  pos: 100,
  posJump: 400,
  goingUp: true,
  animated: null,
  lifes: 4,
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
  switch (event.code) {
    case "Space":
    case "ArrowUp":
      hero.jump();
      break;
    case "Enter":
      GAME.start();
      break;
    case "Escape":
      GAME.stop();
  }
});

function Enemy(id, src, pos) {
  this.id = id;
  this.src = src;
  this.pos = pos;
  this.killer = false;
  this.dead = false;

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
    if (this.timerId == null) {
      this.timerId = setInterval(function () {
        this.enemies.forEach(function (enemy) {
          enemy.move();
          if (enemy.pos+80 > 1060 && enemy.pos < 1140 && hero.pos < 220 && !enemy.killer) {
            hero.lifes --;
            enemy.killer = true;
          }
          else if (enemy.pos+80 > 1060 && enemy.pos < 1140 && hero.pos < 220 && hero.lifes === 0 && !enemy.dead){
            alert('You Loss');
            enemy.dead = true;
            GAME.stop();
          }
        }) 
      }.bind(this), 30)
    }
  },
  stop: function () {
    clearInterval(this.timerId);
    this.timerId = null;
  }
}

// Marcador y vidas
var scoreCount = 0;

setInterval(function (){
  scoreCount ++;
},200);



GAME.init();
