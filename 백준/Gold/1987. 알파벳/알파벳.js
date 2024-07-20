let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

const [R, C] = input.shift().split(' ').map(Number);

let board = [];
input.forEach((value) => board.push(value.split('')));

let isVisit = new Array(26).fill(false);

const dX = [-1, 1, 0, 0];
const dY = [0, 0, -1, 1];
let ans = 0;

function DFS(x, y, count) {
    ans = Math.max(ans, count);

    for(let i = 0; i < 4; i += 1) {
        const [aX, aY] = [x + dX[i], y + dY[i]];

        if(aX >= 0 && aX < R && aY >= 0 && aY < C) {
            if(isVisit[board[aX][aY].charCodeAt() - 65] === false) {
                isVisit[board[aX][aY].charCodeAt() - 65] = true;
                DFS(aX, aY, count + 1);
                isVisit[board[aX][aY].charCodeAt() - 65] = false;
            }
        }
    }
}

isVisit[board[0][0].charCodeAt() - 65] = true;
DFS(0, 0, 1);
console.log(ans);
