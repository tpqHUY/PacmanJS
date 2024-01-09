import Pacman from "./Pacman.js";
import Enemy from "./Enemy.js";
import MovingDirection from "./MovingDirection.js";


export default class TileMap { //By exporting the class as default, it can be imported and used in other modules or files.
  constructor(tileSize) {
    this.tileSize = tileSize; //"this" point to object where it belongs

    this.eated = false;
    
    // goc trai
    this.pipeCorner1 = new Image();
    this.pipeCorner1.src = "images/pipeCorner1.png";

    this.pipeCorner2 = new Image();
    this.pipeCorner2.src = "images/pipeCorner2.png";

    this.pipeCorner3 = new Image();
    this.pipeCorner3.src = "images/pipeCorner3.png";

    this.pipeCorner4 = new Image();
    this.pipeCorner4.src = "images/pipeCorner4.png";

    this.pipeHorizontal = new Image();
    this.pipeHorizontal.src = "images/pipeHorizontal.png";

    this.pipeVertical = new Image();
    this.pipeVertical.src = "images/pipeVertical.png";

    this.capBottom = new Image();
    this.capBottom.src = "images/capBottom.png";

    this.capLeft = new Image();
    this.capLeft.src = "images/capLeft.png";

    this.capRight = new Image();
    this.capRight.src = "images/capRight.png";

    this.capTop = new Image();
    this.capTop.src = "images/capTop.png";


    this.yellowDot = new Image();
    this.yellowDot.src = "images/dot9 (1).png";

    this.pinkDot = new Image();
    this.pinkDot.src = "images/dot9 (3).png";

    this.wall = new Image();
    this.wall.src = "images/wall.png";

    this.heartRed = new Image();
    this.heartRed.src = "images/heart.png";

    this.heartGreen = new Image();
    this.heartGreen.src = "images/heart_green.png";

    this.heart = this.heartRed;

    this.heartAnimationTimerDefault = 10;
    this.heartAnimationTimer = this.heartAnimationTimerDefault;

    this.powerDot = this.pinkDot;
    this.powerDotAnmationTimerDefault = 30;
    this.powerDotAnmationTimer = this.powerDotAnmationTimerDefault;
  }

  //1 - wall
  //0 - dots
  //4 - pacman
  //5 - empty space
  //6 - enemy
  //7 - power dot


  //2 pipe corner 1 - top left
  //3 pipe corner 2 - top right
  //9 pipe corner 3 - bottom right
  //11 - corner bottom left

  //12 pipe horizontal - pipe ngang
  //13 pipe horizontal - pipe doc

  //14 cap bottom 
  //15 cap left
  //16 cap right
  //17 captop
  //18 heart

  map = [
    [2, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 3],
    [13, 7, 0,   0,  4,  0,  0, 0, 0, 0, 0, 7, 13],
    [13, 0, 2, 12, 12, 12, 12, 12, 16, 0, 17, 0, 13],
    [13, 0, 13, 6, 0, 0, 0, 0, 0, 0, 13, 0, 13],
    [13, 0, 13, 7, 2, 12, 16, 0, 17, 0, 13, 0, 13],
    [13, 0, 13, 0, 13, 0, 0, 0, 13, 0, 13, 0, 13],
    [13, 0, 13, 0, 13, 0, 17, 0, 13, 0, 13, 0, 13],
    [13, 0, 13, 0, 13, 0, 13, 0, 14, 0, 13, 0, 13],
    [13, 0, 14, 18, 14, 0, 14, 0, 0, 0, 14, 0, 13],
    [13, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 13],
    [11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 9],
  ];

  draw(ctx) {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        let tile = this.map[row][column];
        if (tile === 1) {
          this.#drawWall(ctx, column, row, this.tileSize);
        } else if (tile === 0) {
          this.#drawDot(ctx, column, row, this.tileSize);
        } else if (tile == 7) {
          this.#drawPowerDot(ctx, column, row, this.tileSize);
        } else if (tile == 2)
        {
          this.#drawCorner1(ctx, column, row, this.tileSize);
        }
        else if (tile == 3)
        {
          this.#drawCorner2(ctx, column, row, this.tileSize);
        }
        else if (tile == 9)
        {
          this.#drawCorner3(ctx, column, row, this.tileSize);
        }
      
        else if (tile == 11)
        {
          this.#drawCorner4(ctx, column, row, this.tileSize);
        }

        else if (tile == 12)
        {
          this.#drawHorizontal(ctx, column, row, this.tileSize);
        }
        

        else if (tile == 13)
        {
          this.#drawVertical(ctx, column, row, this.tileSize);
        }

        else if (tile == 14)
        {
          this.#drawBottom(ctx, column, row, this.tileSize);
        }

        else if (tile == 15)
        {
          this.#drawLeft(ctx, column, row, this.tileSize);
        }

        else if (tile == 16)
        {
          this.#drawRight(ctx, column, row, this.tileSize);
        }

        else if (tile == 17)
        {
          this.#drawTop(ctx, column, row, this.tileSize);
        }
        else if (tile == 18){
          this.#drawHeart(ctx, column, row, this.tileSize);
        }

        else {
          this.#drawBlank(ctx, column, row, this.tileSize);
        }

        // ctx.strokeStyle = "yellow";
        // ctx.strokeRect(
        //   column * this.tileSize,
        //   row * this.tileSize,
        //   this.tileSize,
        //   this.tileSize
        // );
      }
    }
  }

  #drawDot(ctx, column, row, size) {
    ctx.drawImage(
      this.yellowDot,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    );
  }

  #drawCorner1(ctx, column, row, size) {
    ctx.drawImage(
      this.pipeCorner1,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    );
  }


  #drawCorner2(ctx, column, row, size) {
    ctx.drawImage(
      this.pipeCorner2,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    );
  }

  #drawCorner3(ctx, column, row, size) {
    ctx.drawImage(
      this.pipeCorner3,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    );
  }

  #drawCorner4(ctx, column, row, size) {
    ctx.drawImage(
      this.pipeCorner4,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    );
  }

  #drawHorizontal(ctx, column, row, size) {
    ctx.drawImage(
      this.pipeHorizontal,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    );
  }


  #drawVertical(ctx, column, row, size) {
    ctx.drawImage(
      this.pipeVertical,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    );
  }


  #drawBottom(ctx, column, row, size) {
    ctx.drawImage(
      this.capBottom,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    );
  }

  #drawLeft(ctx, column, row, size) {
    ctx.drawImage(
      this.capLeft,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    );
  }

  #drawRight(ctx, column, row, size) {
    ctx.drawImage(
      this.capRight,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    );
  }

  #drawTop(ctx, column, row, size) {
    ctx.drawImage(
      this.capTop,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    );
  }






  #drawPowerDot(ctx, column, row, size) {
    this.powerDotAnmationTimer--;
    if (this.powerDotAnmationTimer === 0) {
      this.powerDotAnmationTimer = this.powerDotAnmationTimerDefault;
      if (this.powerDot == this.pinkDot) {
        this.powerDot = this.yellowDot;
      } else {
        this.powerDot = this.pinkDot;
      }
    }
    ctx.drawImage(this.powerDot, column * size, row * size, size, size);
  }

  #drawWall(ctx, column, row, size) {
    ctx.drawImage(
      this.wall,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    );
  }

  #drawBlank(ctx, column, row, size) {
    ctx.fillStyle = "black";
    ctx.fillRect(column * this.tileSize, row * this.tileSize, size, size);
  }

  #drawHeart(ctx, column, row, size){
    this.heartAnimationTimer--;
    if (this.heartAnimationTimer === 0) {
      this.heartAnimationTimer = this.heartAnimationTimerDefault;
      if (this.heart == this.heartRed) {
        this.heart = this.heartGreen;
      } else {
        this.heart = this.heartRed;
      }
    }
    ctx.drawImage(this.heart, column * size, row * size, size, size);


  }

  getPacman(velocity) {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        let tile = this.map[row][column];
        if (tile === 4) {
          this.map[row][column] = 0;
          return new Pacman(
            column * this.tileSize,
            row * this.tileSize,
            this.tileSize,
            velocity,
            this
          );
        }
      }
    }
  }

  getEnemies(velocity) {
    const enemies = [];

    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        const tile = this.map[row][column];
        if (tile == 6) {
          this.map[row][column] = 0;
          enemies.push(
            new Enemy(
              column * this.tileSize,
              row * this.tileSize,
              this.tileSize,
              velocity,
              this
            )
          );
        }
      }
    }
    return enemies;
  }

  setCanvasSize(canvas) {
    canvas.width = this.map[0].length * this.tileSize;
    canvas.height = this.map.length * this.tileSize;
  }

  didCollideWithEnvironment(x, y, direction) {
    if (direction == null) {
      return;
    }

    if (
      Number.isInteger(x / this.tileSize) &&
      Number.isInteger(y / this.tileSize)
    ) {
      let column = 0;
      let row = 0;
      let nextColumn = 0;
      let nextRow = 0;

      switch (direction) {
        case MovingDirection.right:
          nextColumn = x + this.tileSize;
          column = nextColumn / this.tileSize;
          row = y / this.tileSize;
          break;
        case MovingDirection.left:
          nextColumn = x - this.tileSize;
          column = nextColumn / this.tileSize;
          row = y / this.tileSize;
          break;
        case MovingDirection.up:
          nextRow = y - this.tileSize;
          row = nextRow / this.tileSize;
          column = x / this.tileSize;
          break;
        case MovingDirection.down:
          nextRow = y + this.tileSize;
          row = nextRow / this.tileSize;
          column = x / this.tileSize;
          break;
      }
      const tile = this.map[row][column];
      if (tile === 2) {
        return true;
      }
      else if (tile === 3) {
        return true;
      }
      else if (tile === 9) {
        return true;
      }
      else if (tile === 11) {
        return true;
      }
      else if (tile === 12) {
        return true;
      }
      else if (tile === 13) {
        return true;
      }
      else if (tile === 14) {
        return true;
      }
      else if (tile === 15) {
        return true;
      }
      else if (tile === 16) {
        return true;
      }
      else if (tile === 17) {
        return true;
      }
    }
    return false;
  }

  didWin() {
    return this.#dotsLeft() === 0;
  }

  #dotsLeft() {
    return this.map.flat().filter((tile) => tile === 0).length;
  }

 async eatDot(x, y) {
    
    const row = y / this.tileSize;
    const column = x / this.tileSize;
    if (Number.isInteger(row) && Number.isInteger(column)) {
      // console.log(x, y);
      if (this.map[row][column] === 0) {
        //console.log("true");
        this.map[row][column] = 5;
        // return true;
        this.eated = true;
      }
    }
    // return false;
  }

  eatPowerDot(x, y) {
    const row = y / this.tileSize;
    const column = x / this.tileSize;
    if (Number.isInteger(row) && Number.isInteger(column)) {
      const tile = this.map[row][column];
      if (tile === 7) {
        this.map[row][column] = 5;
        return true;
      }
    }
    return false;
  }
  eatHeart(x,y){
    const row = y / this.tileSize;
    const column = x / this.tileSize;
    if (Number.isInteger(row) && Number.isInteger(column)) {
      const tile = this.map[row][column];
      if (tile === 18) {
        this.map[row][column] = 5;
        return true;
      }
    }
    return false;

  }
}