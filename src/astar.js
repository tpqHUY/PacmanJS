
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
    console.log(map);
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
  //console.log(path);*/

  // Helper function to calculate the distance between two points
/*function distance(pointA, pointB) {
  const dx = pointB[0] - pointA[0];
  const dy = pointB[1] - pointA[1];
  return Math.sqrt(dx * dx + dy * dy);
}

// A* algorithm function
export function astar(map, start, end) {
  const openSet = [start];
  const cameFrom = {};
  const gScore = { [start]: 0 };
  const fScore = { [start]: distance(start, end) };

  while (openSet.length > 0) {
    let current = openSet[0];
    for (let i = 1; i < openSet.length; i++) {
      if (fScore[openSet[i]] < fScore[current]) {
        current = openSet[i];
      }
    }

    if (current[0] === end[0] && current[1] === end[1]) {
      const path = [current];
      while (cameFrom[current]) {
        current = cameFrom[current];
        path.push(current);
      }
      return path.reverse();
    }

    openSet.splice(openSet.indexOf(current), 1);
    const neighbors = getNeighbors(map, current);
    for (const neighbor of neighbors) {
      const tentativeGScore = gScore[current] + distance(current, neighbor);
      if (tentativeGScore < (gScore[neighbor] || Infinity)) {
        cameFrom[neighbor] = current;
        gScore[neighbor] = tentativeGScore;
        fScore[neighbor] = tentativeGScore + distance(neighbor, end);
        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        }
      }
    }
  }

  return []; // No path found
}

// Helper function to get neighboring nodes
function getNeighbors(map, [x, y]) {
  const neighbors = [];
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // Possible movement directions: up, down, left, right
  for (const [dx, dy] of directions) {
    const newX = x + dx;
    const newY = y + dy;
    if (newX >= 0 && newX < map.length && newY >= 0 && newY < map[0].length && (map[newX][newY] === 0 || map[newX][newY] === 5)) {
      neighbors.push([newX, newY]);
    }
  }
  return neighbors;
}*/

  