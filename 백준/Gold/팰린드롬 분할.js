let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let compareString = input.shift().split('');
compareString.unshift('');
const N = compareString.length;
let dp = Array(N).fill(0);
let board = Array.from({length: N}, () => Array(N).fill(0));

// 한개짜리 비교
for(let i = 1; i < N; i += 1) {
    board[i][i] = 1;
}

// 두개짜리 비교
for(let i = 1; i < N-1; i += 1) {
    if(compareString[i] === compareString[i+1]) board[i][i+1] = 1;
}

// 3개이상 비교
for(let i = 3; i < N; i += 1) {
    for(let j = 1; j <= N-i+1; j += 1) {
        let k = j + i - 1;
        if(compareString[j] === compareString[k]) {
            if(board[j+1][k-1]) board[j][k] = 1;
        }
    }
}

for(let i = 1; i < N; i++){
    dp[i] = 2147483647;
    for(let j = 1; j <= i; j++){
        if (board[j][i]) dp[i] = Math.min(dp[i], dp[j - 1] + 1);
    }
}
console.log(dp[N-1]);
