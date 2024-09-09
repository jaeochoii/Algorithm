let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = input.shift().split(' ').map(Number);
let board = Array.from({length:N}, () => Array(M).fill(0));

const INFO = input.shift().split(' ').map(Number);

// 물이 고이기 전 상태 세팅
for(let i = 0; i < M; i += 1) {
    for(let j = 0; j < INFO.length; j += 1) {
        const LENGTH = INFO[j];
        for(let k = N-1; k >= N - LENGTH; k -= 1) {
            board[k][j] = 1;
        }
    }
}

// 물이 고이는 곳 체크
let stack = [];

for(let i = 0; i < N; i += 1) {
    let cnt = 0;
    let isTrue = false;

    for(let j = 0; j < M; j += 1) {
        if(board[i][j] === 1 && !isTrue) isTrue = true;

        else if(board[i][j] === 1 && isTrue) {
            isTrue = false;
            cnt = 0;
            isTrue = true;
        }

        else if(board[i][j] === 0 && isTrue) {
            stack.push([i, j]);
            cnt += 1;
        }
    }

    for(let j = 0; j < cnt; j += 1) {
        stack.pop();
    }
}

console.log(stack.length);