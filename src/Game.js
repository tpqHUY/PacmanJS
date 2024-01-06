import TileMap from "./TileMap.js";


const tileSize = 32;
const velocity = 2;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreEl= document.getElementById("scoreEl");
console.log(scoreEl)

const tileMap = new TileMap(tileSize); //create object to describe

const pacman = tileMap.getPacman(velocity);
const enemies = tileMap.getEnemies(velocity);

let gameOver = false;
let gameWin = false;
let score=0;


// sound
const gameOverSound = new Audio("sounds/gameOver.wav");
const gameWinSound = new Audio("sounds/gameWin.wav");

function gameLoop(){ // redraw the screen certain number of times every 1 second
    tileMap.draw(ctx);
    drawGameEnd();
    pacman.draw(ctx, pause(), enemies);
    enemies.forEach((enemy) => enemy.draw(ctx, pause(), pacman));
    upgradeScore();
    checkGameOver();
    checkGameWin();
    
}

function checkGameWin() {
    if (!gameWin) {
      gameWin = tileMap.didWin();
      if (gameWin) {
        gameWinSound.play();
      }
    }
  }
  
  function checkGameOver() {
    if (!gameOver) {
      gameOver = isGameOver();
      if (gameOver) {
        gameOverSound.play();
      }
    }
  }
  
  function isGameOver() {
    return enemies.some(
      (enemy) => !pacman.powerDotActive && enemy.collideWith(pacman)
    );
  }
  
  function pause() {
    return !pacman.madeFirstMove || gameOver || gameWin;
  }

  

  async function upgradeScore() {
    if(tileMap.eated){
      score+=10;
      scoreEl.innerHTML = score;
      tileMap.eated = false;
    }
  }


  
  function drawGameEnd() {
    if (gameOver || gameWin) {
      let text = " YOU WIN!";
      if (gameOver) {
        text = "GAME OVER";
      }
  
      ctx.fillStyle = "black";
      ctx.fillRect(0, canvas.height / 3.2, canvas.width, 80);
  
      ctx.font = "60px arial";
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop("0", "yellow");
      gradient.addColorStop("0.5", "red");
      gradient.addColorStop("1.0", "red");
  
      ctx.fillStyle = gradient;
      ctx.fillText(text, 10, canvas.height / 2);
    }
  }
  
tileMap.setCanvasSize(canvas);
setInterval(gameLoop, 1000 / 75); //call the funtion every x periods of times (milliseconds) (1000 millseconds = 1 seconds / 75 )
// call this method 75 times every 1 second to redraw the screen 

