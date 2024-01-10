
import TileMap from "./TileMap.js";



class Node {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.g = 0;
      this.h = 0;
      this.f = 0;
      this.parent = null;
    }
  }
  
  export function astar(map, start, end) {
    let openList = [];
    let closedList = [];
    let width = map[0].length;
    let height = map.length;
  
    let startNode = new Node(start[0], start[1]);
    let endNode = new Node(end[0], end[1]);
  
    openList.push(startNode);
  
    while (openList.length > 0) {
      let currentNode = openList[0];
      let currentIndex = 0;
  
      for (let i = 1; i < openList.length; i++) {
        if (openList[i].f < currentNode.f) {
          currentNode = openList[i];
          currentIndex = i;
        }
      }
  
      openList.splice(currentIndex, 1);
      closedList.push(currentNode);
  
      if (currentNode.x === endNode.x && currentNode.y === endNode.y) {
        let path = [];
        let current = currentNode;
        while (current !== null) {
          path.push([current.x, current.y]);
          current = current.parent;
        }
        return path.reverse();
      }
  
      let neighbors = [];
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue;
          let x = currentNode.x + i;
          let y = currentNode.y + j;
          if (x > -1 && x < width && y > -1 && y < height && map[y][x] !== 1) {
            neighbors.push(new Node(x, y));
          }
        }
      }
  
      for (let neighbor of neighbors) {
        if (closedList.find(node => node.x === neighbor.x && node.y === neighbor.y)) {
          continue;
        }
  
        neighbor.g = currentNode.g + 1;
        neighbor.h = Math.abs(neighbor.x - endNode.x) + Math.abs(neighbor.y - endNode.y);
        neighbor.f = neighbor.g + neighbor.h;
  
        if (openList.find(node => node.x === neighbor.x && node.y === neighbor.y && neighbor.g >= node.g)) {
          continue;
        }
  
        neighbor.parent = currentNode;
        openList.push(neighbor);
      }
    }
  
    return [];
  }
  
  //let start = [1, 10]; // Enemy start position
  //let end = [1, 4]; // Pacman position
  
  //let path = astar(map, start, end);
  //console.log(path);
  