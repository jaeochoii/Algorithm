const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = Number(input.shift());
const LENGTH = Number(input.shift());
let board = Array.from({length: N}, () => Array(N).fill(Infinity));
let array = [];
input.forEach((value) => array.push(value.split(' ').map(Number)));

for(let i = 0; i < LENGTH; i += 1) {
    board[array[i][0] - 1][array[i][1] - 1] = Math.min(array[i][2], board[array[i][0] - 1][array[i][1] - 1]);
}

for(let i = 0; i < N; i += 1) {
    board[i][i] = 0;
}

for(let i = 0; i < N; i += 1) {
    for(let j = 0; j < N; j += 1) {
        for(let k = 0; k < N; k += 1) {
            board[j][k] = Math.min(board[j][i] + board[i][k], board[j][k]);
        }
    }
}

for(let i = 0; i < N; i += 1) {
    for(let j = 0; j < N; j += 1) {
        if(board[i][j] === Infinity) board[i][j] = 0;
    }
}

for(let i = 0; i < N; i += 1) {
    console.log(board[i].join(' '));
}