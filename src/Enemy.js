import MovingDirection from "./MovingDirection.js";
import {pacman} from "./Game.js"

export default class Enemy{
  constructor(x,y,tileSize,velocity,tileMap){
    this.x =x;
    this.y = y;
    this.velocity = velocity;
    this.tileMap = tileMap;
    this.tileSize = tileSize;

    this.#loadImages();
    this.movingDirection = Math.floor(Math.random() * Object.keys(MovingDirection).length);

    this.directionTimerdefault = this.#random(10,50);
    this.directionTimer = this.directionTimerdefault;

    this.scaredAboutToExpireTimerDefault = 10;
    this.scaredAboutToExpireTimer = this.scaredAboutToExpireTimerDefault;
  }
  draw(ctx,pause,pacman){
    if (!pause) {
      this.#move();
      this.FollowPacman();;
    }
    this.#setImage(ctx, pacman);
  }

  collideWith(pacman) {
    const size = this.tileSize / 2;
    if (
      this.x < pacman.x + size &&
      this.x + size > pacman.x &&
      this.y < pacman.y + size &&
      this.y + size > pacman.y
    ) {
      return true;
    } else {
      return false;
    }
  }


  //algorithm 
  FollowPacman(){
    const pacX = pacman.x; //vi tri pac
    const pacY = pacman.y;

    const distanceX = this.x - pacX;  // vi tri ghost
    const distanceY = this.y - pacY;

    this.directionTimer--;
    let newMoveDirection = null;
    if(this.directionTimer == 0){
      this.directionTimer = this.directionTimerdefault;

    if(distanceX < 0 && distanceY === 0) newMoveDirection = MovingDirection.right;
    if(distanceX > 0 && distanceY === 0) newMoveDirection = MovingDirection.left;

    if(distanceX === 0 && distanceY > 0) newMoveDirection = MovingDirection.up;
    if(distanceX === 0 && distanceY < 0) newMoveDirection = MovingDirection.down;

    if(distanceX > 0 && distanceY > 0){
      if(distanceX < distanceY) newMoveDirection = MovingDirection.up;
      else newMoveDirection = MovingDirection.left;
    }

    if(distanceX > 0 && distanceY < 0){
      if(distanceX < distanceY) newMoveDirection = MovingDirection.down;
      else newMoveDirection = MovingDirection.left;
    }

    if(distanceX < 0 && distanceY > 0){
      if(distanceX < distanceY) newMoveDirection = MovingDirection.up;
      else newMoveDirection = MovingDirection.right;
    }

    if(distanceX < 0 && distanceY < 0){
      if(distanceX < distanceY) this.movingDirection = MovingDirection.down;
      else this.movingDirection = MovingDirection.right;
    }
  }

    if(newMoveDirection != null && this.movingDirection != newMoveDirection ){
      if(
        Number.isInteger(this.x / this.tileSize) &&
        Number.isInteger(this.y/ this.tileSize)
      ){
        if(!this.tileMap.didCollideWithEnvironment(this.x,
          this.y,
           newMoveDirection))
           {
          this.movingDirection = newMoveDirection;
        }
      }
    }
  }




  #setImage(ctx, pacman) {
    if (pacman.powerDotActive) {
      this.#setImageWhenPowerDotIsActive(pacman);
    } else {
      this.image = this.normalGhost;
    }
    ctx.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize);
  }

  #setImageWhenPowerDotIsActive(pacman) {
    if (pacman.powerDotAboutToExpire) {
      this.scaredAboutToExpireTimer--;
      if (this.scaredAboutToExpireTimer === 0) {
        this.scaredAboutToExpireTimer = this.scaredAboutToExpireTimerDefault;
        if (this.image === this.scaredGhost) {
          this.image = this.scaredGhost2;
        } else {
          this.image = this.scaredGhost;
        }
      }
    } else {
      this.image = this.scaredGhost;
    }
  }

  #changeDirection(){
    this.directionTimer--;
    let newMoveDirection = null;
    if(this.directionTimer == 0){
      this.directionTimer = this.directionTimerdefault;
        newMoveDirection = Math.floor(
          Math.random() * Object.keys(MovingDirection).length
        );
    }

      if(newMoveDirection != null && this.movingDirection != newMoveDirection ){
        if(
          Number.isInteger(this.x / this.tileSize) &&
          Number.isInteger(this.y/ this.tileSize)
        ){
          if(!this.tileMap.didCollideWithEnvironment(this.x,
            this.y,
             newMoveDirection))
             {
            this.movingDirection = newMoveDirection;
          }
        }
      }

  }


  #random(min,max){
    return Math.floor(Math.random()*(max - min + 1)) + min;
  }

  #move(){
    if(!this.tileMap.didCollideWithEnvironment(this.x, this.y,this.movingDirection)){
      switch(this.movingDirection){
        case MovingDirection.up:
          this.y -= this.velocity;
          break;
        case MovingDirection.down:
         this.y += this.velocity;
          break;
        case MovingDirection.left:
          this.x -= this.velocity;
          break;
        case MovingDirection.right:
          this.x += this.velocity;
          break;

      }
    }
  }



  #loadImages(){
    this.normalGhost = new Image();
    this.normalGhost.src = '../images/blinky.png';


    this.scaredGhost = new Image();
    this.scaredGhost.src = '../images/blue_ghost.png';


    this.scaredGhost2 = new Image();
    this.scaredGhost2.src = '../images/3.png';


    this.image = this.normalGhost;

  }
}