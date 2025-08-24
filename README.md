# Pacman A* with JS
<img src="https://static.wikia.nocookie.net/pacman/images/2/24/Pac-Man-0.png/revision/latest/scale-to-width-down/1200?cb=20190526005949" align="right"
      width="430" height="400">
Pacman code by JS, HTML, CSS. Using path-finding algorithms: A*

[Try Demo Here](https://github.com/KengG1M/PacmanJS.git)

# About
This project was implemented by:

   * Tran Phuong Quang Huy - ITCSIU21071
   
   * Nguyen Tran Hoang Ha  - ITITIU21127
   
   * Trinh Le Bich Hang    - ITDSIU21084
   
at the International University following instruction of Advisor Tran Thanh Tung and Tran Huu Nghia.

# Screenshot
### Wait screen when starting game
![A* Pacman](https://i.imgur.com/H7njko3.png)
### Win state screen
![A* Pacman](https://i.imgur.com/dFx3Tb3.png)

# Abstract
This project focuses on developing a real-time AI pathfinder, a crucial component in some applications like gepgraphical mapping, IP routing, telephone networks,etc..

The AI, unlike a standard enemy-player tracker, will utilize various search algorithms to dynamically find the shortest path to the player, completely navigating through blocks( obstables).

Our goal is to make a pathfinder that is not only  efficient in determining the shortest path but also can be adaptable to changing target and obstacles.
## Getting Started

You can simply double click on `menu.html` or click straight to `index.html`  and use the app.

The game supports multiple map layouts. The second argument to the `TileMap` constructor selects the map number, e.g. `new TileMap(tileSize, 2)` loads the new map design.

## Why is A*?
A* is chosen for pathfinding in this scenario because it is more efficient than BFS, especially in large and complex environments. A* uses a heuristic to direct its search towards the target, leading to faster solutions. Additionally, it guarantees an optimal path if one exists, unlike BFS which is less efficient in large search spaces.

## UML
![A* Pacman](https://i.imgur.com/JIiznAA.png)
## Design and Implementation
* TileMap and Visualize TileMap
* Pacman's Moving, Animation and Eating features
* Ghost collision and it when scare (PowerDotActive)
* PowerDot and HeartBuff

## Acknowledgments

* Inspiration: [Step-by-step explanation of A* pathfinding algorithm in Java](https://www.youtube.com/watch?v=2JNEme00ZFA&t=615s)
  

  

