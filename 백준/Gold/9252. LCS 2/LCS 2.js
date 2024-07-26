let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

const str1 = input.shift().split('');
const str2 = input.shift().split('');

let board = Array.from({length: str1.length + 1}, () => Array(str2.length + 1).fill(0));

for(let i = 1; i <= str1.length; i += 1) {
    for(let j = 1; j <= str2.length; j += 1) {
        if(str1[i-1] === str2[j-1]) board[i][j] = board[i-1][j-1] + 1;
        else board[i][j] = Math.max(board[i-1][j], board[i][j-1]);
    }
}

console.log(board[str1.length][str2.length]);

// 공통되는 수열 찾기
let result = [];
let X = str1.length;
let Y = str2.length;

while(X > 0 && Y > 0) {
    const NUMBER = board[X][Y];

    if(NUMBER === board[X-1][Y]) X -= 1;

    else if(NUMBER === board[X][Y-1]) Y -= 1;

    else {
        result.push(str1[X-1]);
        X -= 1;
        Y -= 1;
    }
}

console.log(result.reverse().join(''));