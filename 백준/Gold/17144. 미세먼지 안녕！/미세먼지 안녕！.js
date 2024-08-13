const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [R, C, T] = input.shift().split(' ').map(Number);
let board = [];
input.forEach((value) => board.push(value.split(' ').map(Number)));
let visited = Array.from({length: R}, () => Array(C).fill(0));
let location;

for(let i = 0; i < R; i += 1) {
    for(let j = 0; j < C; j += 1) {
        if(board[i][j] === -1) location = i;
    }
}

class Queue {
    constructor() {
        this.store = {};
        this.front = 0;
        this.rear = 0;
    }

    size() {
        if(this.store[this.rear] === undefined) return 0;
        else return this.rear - this.front + 1;
    }

    push(value) {
        if(this.size() === 0) this.store['0'] = value;
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

let queue = new Queue();

for(let k = 0; k < T; k += 1) {

    for(let i = 0; i < R; i += 1) {
        for(let j = 0; j < C; j += 1) {
            if(board[i][j] !== -1 && board[i][j] !== 0) queue.push([i, j]);
        }
    }

    const LENGTH = queue.size();

    for(let i = 0; i < LENGTH; i += 1) {
        const [X, Y] = queue.popLeft();
        const dX = [-1, 1, 0, 0];
        const dY = [0, 0, -1, 1];
        let count = 0;

        for(let j = 0; j < 4; j += 1) {
            const [aX, aY] = [X + dX[j], Y + dY[j]];

            if(aX >= 0 && aX < R && aY >= 0 && aY < C && board[aX][aY] !== -1) {
                visited[aX][aY] += Math.floor(board[X][Y] / 5);
                count += 1;
            }
        }
        visited[X][Y] += board[X][Y] - (Math.floor(board[X][Y] / 5) * count);
    }

    upperCleaner(location);
    downCleaner(location);

    for(let i = 0; i < R; i += 1) {
        for(let j = 0; j < C; j += 1) {
            if(i === location-1 && j === 0 || i === location && j === 0) board[i][j] = -1;
            else {
                board[i][j] = visited[i][j];
            }
        }
    }

    visited = Array.from({length: R}, () => Array(C).fill(0));
}

function upperCleaner(loc) {
    let store = 0;

    for(let i = 0; i < C; i += 1) {
        let temp = visited[loc-1][i];
        visited[loc-1][i] = store;
        store = temp;
    }

    for(let i = loc-2; i > 0; i -= 1) {
        let temp = visited[i][C-1];
        visited[i][C-1] = store;
        store = temp;
    }

    for(let i = C-1; i > 0; i -= 1) {
        let temp = visited[0][i];
        visited[0][i] = store;
        store = temp;
    }

    for(let i = 0; i < loc-1; i += 1) {
        let temp = visited[i][0];
        visited[i][0] = store;
        store = temp;
    }
}

function downCleaner(loc) {
    let store = 0;

    for(let i = 0; i < C; i += 1) {
        let temp = visited[loc][i];
        visited[loc][i] = store;
        store = temp;
    }

    for(let i = loc+1; i < R; i += 1) {
        let temp = visited[i][C-1];
        visited[i][C-1] = store;
        store = temp;
    }

    for(let i = C-2; i > 0; i -= 1) {
        let temp = visited[R-1][i];
        visited[R-1][i] = store;
        store = temp;
    }

    for(let i = R-1; i > loc; i -= 1) {
        let temp = visited[i][0];
        visited[i][0] = store;
        store = temp;
    }
}

let count = 0;

for(let i = 0; i < R; i += 1) {
    for(let j = 0; j < C; j += 1) {
        count += board[i][j];
    }
}

console.log(count+2);