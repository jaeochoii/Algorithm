const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(input.shift());
let board = [];
input.forEach((value) => board.push(value.split(' ').map(Number)));
let visited = Array.from({length: N}, () => Array(N).fill(false));

let [currentX, currentY] = [Math.floor(N/2), Math.floor(N/2)];
const moveLeft = [[0, -1], [0, -3, 0.05], [-1, -2, 0.1], [1, -2, 0.1], [-2, -1, 0.02], [-1, -1, 0.07], [1, -1, 0.07], [2, -1, 0.02], [-1, 0, 0.01], [1, 0, 0.01]];
const moveDown = [[1, 0], [0, -1, 0.01], [0, 1, 0.01], [1, -2, 0.02], [1, -1, 0.07], [1, 1, 0.07], [1, 2, 0.02], [2, -1, 0.1], [2, 1, 0.1], [3, 0, 0.05]];
const moveRight = [[0, 1], [0, 3, 0.05], [-1, 2, 0.1], [1, 2, 0.1], [-2, 1, 0.02], [-1, 1, 0.07], [1, 1, 0.07], [2, 1, 0.02], [-1, 0, 0.01], [1, 0, 0.01]];
const moveUp = [[-1, 0], [0, -1, 0.01], [0, 1, 0.01], [-1, -2, 0.02], [-1, -1, 0.07], [-1, 1, 0.07], [-1, 2, 0.02], [-2, -1, 0.1], [-2, 1, 0.1], [-3, 0, 0.05]];

const DIRECTION = [moveLeft, moveDown, moveRight, moveUp];

let outOfRange = 0;
let currentDirection = 0;

while(true) {
    if(currentX === 0 && currentY === 0) break;
    visited[currentX][currentY] = true;
    const [dX, dY] = [currentX + DIRECTION[currentDirection%4][0][0], currentY + DIRECTION[currentDirection%4][0][1]];

    let standardMount = board[dX][dY];
    board[dX][dY] = 0;
    let spreadMount = 0;

    for(let i = 1; i < 10; i += 1) {

        const [aX, aY] = [currentX + DIRECTION[currentDirection%4][i][0], currentY + DIRECTION[currentDirection%4][i][1]];

        if(aX < 0 || aX >= N || aY < 0 || aY >= N) outOfRange += Math.floor(standardMount * DIRECTION[currentDirection%4][i][2]);

        else board[aX][aY] += Math.floor(standardMount * DIRECTION[currentDirection%4][i][2]);

        spreadMount += Math.floor(standardMount * DIRECTION[currentDirection%4][i][2]);

    }
    const [pX, pY] = [dX + DIRECTION[currentDirection%4][0][0], dY + DIRECTION[currentDirection%4][0][1]];
    if(pX >= 0 && pX < N && pY >= 0 && pY < N) board[pX][pY] += standardMount - spreadMount;
    else outOfRange += standardMount - spreadMount;

    if(!visited[dX + DIRECTION[(currentDirection+1)%4][0][0]][dY + DIRECTION[(currentDirection+1)%4][0][1]]) {
        [currentX, currentY] = [dX, dY];
        currentDirection = (currentDirection+1)%4;
    }
    else {
        [currentX, currentY] = [dX, dY];
    }
}

console.log(outOfRange);
