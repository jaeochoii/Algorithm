let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');
const N = Number(input.shift());
let board = [];
input.forEach((value) => board.push(value.split(' ').map(Number)));
let sumBoard = Array.from({length: N}, () => Array(3).fill(0));

[sumBoard[0][0], sumBoard[0][1], sumBoard[0][2]] = [board[0][0], board[0][1], board[0][2]];

for(let i = 1; i < N; i += 1) {
    for(let j = 0; j < 3; j += 1) {
        sumBoard[i][j] = board[i][j] + Math.min(sumBoard[i-1][(j+1) % 3], sumBoard[i-1][(j+2) % 3]);
    }
}

console.log(Math.min(...sumBoard[N-1]));