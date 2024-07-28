let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString();
const NUMBER = Number(input);

let board = [];
let count = 0;

function isPossible(row) {
    for(let i = 0; i < row; i += 1) {
        if(board[row] === board[i]) return true;

        if(Math.abs(board[row] - board[i]) === row - i) return true;

    }
    return false;
}
function backTracking(row) {
    if(row === NUMBER) {
        count += 1;
        return;
    }

    for(let i = 0; i < NUMBER; i += 1) {
        board[row] = i;
        if(!isPossible(row)) backTracking(row + 1);
    }
}

backTracking(0);
console.log(count);