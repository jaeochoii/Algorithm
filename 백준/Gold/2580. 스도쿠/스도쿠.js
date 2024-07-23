const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let board = [];
input.forEach((value) => board.push(value.split(' ').map(Number)));

function solution() {
    const zeroList = findZero();
    const LEN = zeroList.length;
    sudoku(0);

// 빈 칸에 알맞은 숫자 넣는 기능
    function sudoku(count) {
        if(count === LEN) {
            for(let i = 0; i < 9; i += 1) {
                console.log(board[i].join(' '));
            }
            process.exit(0);
        }

        const [X, Y] = zeroList[count];
        for(let i = 1; i <= 9; i += 1) {
            if(isPossible(X, Y, i)) {
                board[X][Y] = i;
                sudoku(count + 1);
                board[X][Y] = 0;
            }
        }
    }

// 0이 들어있는 좌표 확인하는 기능
    function findZero() {
        const zeroList = [];

        for(let i = 0; i < 9; i += 1) {
            for(let j = 0; j < 9; j += 1) {
                if(board[i][j] === 0) zeroList.push([i, j]);
            }
        }

        return zeroList;
    }

// 수도쿠에 적합한지 확인하는 기능
    function isPossible(x, y, value) {
        // 가로축 확인
        for(let i = 0; i < 9; i += 1) {
            if(board[x][i] === value) return false;
        }

        // 세로축 확인
        for(let i = 0; i < 9; i += 1) {
            if(board[i][y] === value) return false;
        }

        // 3x3 박스 확인
        const [X, Y] = [Math.floor(x / 3) * 3, Math.floor(y / 3) * 3];

        for(let i = X; i < X+3; i += 1) {
            for(let j = Y; j < Y+3; j += 1) {
                if(board[i][j] === value) return false;
            }
        }

        return true;
    }
}

console.log(solution());
