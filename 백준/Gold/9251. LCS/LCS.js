let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');
const str1 = input.shift().split('');
const str2 = input.shift().split('');
const N = str1.length;
const M = str2.length;

let board = Array.from({length: N+1}, () => Array(M+1).fill(0));

for(let i = 1; i <= N; i += 1) {
    for(let j = 1; j <= M; j += 1) {
        if(str1[i-1] === str2[j-1]) {
            board[i][j] = board[i-1][j-1] + 1;
        }
        else board[i][j] = Math.max(board[i][j-1], board[i-1][j]);
    }
}

console.log(board[N][M]);