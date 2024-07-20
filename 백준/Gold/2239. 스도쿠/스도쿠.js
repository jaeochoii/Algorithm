let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

let board = [];
input.forEach((value) => board.push(value.split('').map(Number)));

function isComplete() {
    for(let i = 0; i < 9; i += 1) {
        for(let j = 0; j < 9; j += 1) {
            if(board[i][j] === 0) return false;
        }
    }
    return true;
}


function isPossible(x, y, number) {
    // 가로 라인 금지
    if(board[x].includes(number)) return false;

    // 세로 라인 금지
    for(let i = 0; i < 9; i += 1) {
        if(board[i][y] === number) return false;
    }

    // 9개의 박스 금지
    const aX = x % 3;
    const aY = y % 3;

    for(let i = x - aX; i < x - aX + 3; i += 1) {
        for(let j = y - aY; j < y - aY + 3; j += 1) {
            if(board[i][j] === number) return false;
        }
    }

    return true;
}


function backTracking(index) {
    for(let i = index; i < 9; i += 1) {
        for(let j = 0; j < 9; j += 1) {
            if(board[i][j] === 0) {
                for(let k = 1; k <= 9; k += 1) {
                    if(isPossible(i, j, k)) {
                        board[i][j] = k;
                        backTracking(i);
                        if(isComplete()) return;
                        board[i][j] = 0;
                    }
                }
                return;
            }
        }
    }
}

backTracking(0);
for(let i = 0; i < 9; i += 1) {
    console.log(board[i].join(''));
}
