let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');
const [N, M] = input.shift().split(' ').map(Number);
let board = [];
input.forEach((value) => board.push(value.split(' ').map(Number)));
let TTR = Array.from({length: N+6}, () => Array(M+6).fill(0));

let result = [];

for(let i = 3; i <= N+2; i += 1) {
    for(let j = 3; j <= M+2; j += 1) {
        TTR[i][j] = board[i-3][j-3];
    }
}

for(let i = 3; i <= N+2; i += 1) {
    for(let j = 3; j <= M+2; j += 1) {
        result.push(TTR[i][j] + Math.max(TTR[i+1][j] + TTR[i+1][j+1] + TTR[i][j+1], TTR[i+1][j] + TTR[i+1][j+1] + TTR[i+2][j+1], TTR[i+1][j] + TTR[i+1][j-1] + TTR[i][j+1],
            TTR[i][j+1] + TTR[i+1][j+1] + TTR[i+1][j+2], TTR[i+1][j] + TTR[i+1][j-1] + TTR[i+2][j-1], TTR[i][j+1] + TTR[i][j+2] + TTR[i][j+3], TTR[i+1][j] + TTR[i+2][j] + TTR[i+3][j],
            TTR[i-1][j] + TTR[i-1][j+1] + TTR[i-1][j+2], TTR[i][j+1] + TTR[i][j+2] + TTR[i+1][j+2], TTR[i+1][j] + TTR[i+2][j] + TTR[i+2][j+1], TTR[i][j+1] + TTR[i+1][j+1] + TTR[i+2][j+1],
            TTR[i-1][j] + TTR[i][j+1] + TTR[i][j+2], TTR[i][j+1] + TTR[i][j+2] + TTR[i-1][j+2], TTR[i+1][j] + TTR[i+2][j] + TTR[i+2][j-1], TTR[i][j+1] + TTR[i+1][j] + TTR[i+2][j],
            TTR[i][j+1] + TTR[i-1][j+1] + TTR[i][j+2], TTR[i][j+1] + TTR[i+1][j+1] + TTR[i][j+2], TTR[i][j+1] + TTR[i+1][j+1] + TTR[i-1][j+1], TTR[i-1][j] + TTR[i-1][j+1] + TTR[i-2][j]));
    }
}

console.log(Math.max(...result));