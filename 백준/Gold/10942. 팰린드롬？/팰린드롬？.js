let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = Number(input.shift());
let compareNumber = input.shift().split(' ').map(Number);
compareNumber.unshift(0);

let board = Array.from({length: N+1}, () => Array(N+1).fill(0));

// 한개짜리 비교
for(let i = 1; i <= N; i += 1) {
    board[i][i] = 1;
}

// 두개짜리 비교
for(let i = 1; i < N; i += 1) {
    if(compareNumber[i] === compareNumber[i+1]) board[i][i+1] = 1;
}

// 3개이상 비교
for(let i = 3; i <= N; i += 1) {
    for(let j = 1; j <= N-i+1; j += 1) {
        let k = j + i - 1;
        if(compareNumber[j] === compareNumber[k]) {
            if(board[j+1][k-1]) board[j][k] = 1;
        }
    }
}

const T = Number(input.shift());
let answer = [];
for(let i = 0; i < T; i += 1) {
    const [start, end] = input[i].split(' ').map(Number);

    answer.push(board[start][end]);
}

console.log(answer.join('\n'));