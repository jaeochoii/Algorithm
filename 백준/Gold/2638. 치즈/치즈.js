let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');
const [N, M] = input.shift().split(' ').map(Number);
let board = [];
input.forEach((value) => board.push(value.split(' ').map(Number)));


// Queue 기능 구현
class Queue {
    constructor() {
        this.store = {};
        this.front = 0;
        this.rear = 0;
    }

    size() {
        if (this.store[this.rear] === undefined) return 0;
        else return this.rear - this.front + 1;
    }

    push(value) {
        if(this.size() === 0) {
            this.store['0'] = value;
        }

        else {
            this.rear += 1;
            this.store[this.rear] = value;
        }
    }

    popLeft() {
        let temp;
        if(this.front === this.rear) {
            temp = this.store[this.front];
            delete this.store[this.front];
            this.front = 0;
            this.rear = 0;
            return temp;
        }

        else {
            temp = this.store[this.front];
            delete this.store[this.front];
            this.front += 1;
            return temp;
        }
    }
}

// BFS 함수 기능 구현
function BFS() {
    let queue = new Queue();
    let visited = Array.from({length: N}, () => Array(M).fill(0));
    queue.push([0, 0]);
    board[0][0] = 2;
    visited[0][0] = 1;

    while(queue.size()) {
        const [X, Y] = queue.popLeft();

        const dX = [-1, 1, 0, 0];
        const dY = [0, 0, -1, 1];

        for(let i = 0; i < 4; i += 1) {
            const [aX, aY] = [X + dX[i], Y + dY[i]];

            if(aX < 0 || aX >= N || aY < 0 || aY >= M || visited[aX][aY] || board[aX][aY] === 1) continue;

            else {
                visited[aX][aY] = 1;
                board[aX][aY] = 2;
                queue.push([aX, aY]);
            }
        }
    }
}
// 외부 공기로 인한 바깥 치즈 제거하는 기능 구현
let count = 0;

while(true) {
    BFS();
    let blockCount = 0;

    for(let i = 0; i < N; i += 1) {
        for(let j = 0; j < M; j += 1) {
            if(board[i][j] === 2) blockCount += 1;
        }
    }

    if(blockCount === N*M) break;

    for(let i = 0; i < N; i += 1) {
        for(let j = 0; j < M; j += 1) {
            if(board[i][j] === 1) {
                if(board[i-1][j] === 2 && board[i][j-1] === 2) board[i][j] = 3;
                else if(board[i][j-1] === 2 && board[i+1][j] === 2) board[i][j] = 3;
                else if(board[i+1][j] === 2 && board[i][j+1] === 2) board[i][j] = 3;
                else if(board[i][j+1] === 2 && board[i-1][j] === 2) board[i][j] = 3;
                else if(board[i-1][j] === 2 && board[i+1][j] === 2) board[i][j] = 3;
                else if(board[i][j-1] === 2 && board[i][j+1] === 2) board[i][j] = 3;
            }
        }
    }

    let time = 0;

    for(let i = 0; i < N; i += 1) {
        for(let j = 0; j < M; j += 1) {
            if(board[i][j] === 3) {
                board[i][j] = 2;
                time += 1;
            }
        }
    }

    time > 0 ? count += 1 : count += 0;
}

console.log(count);
