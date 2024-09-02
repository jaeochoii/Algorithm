const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = Number(input.shift());
let board = [];
input.forEach((value) => board.push(value.split('')));
let visited = Array.from({ length: N }, () => Array(N).fill(false));

const dX = [-1, 1, 0, 0];
const dY = [0, 0, -1, 1];
let countR = 0;
let countRG = 0;

class Queue {
    constructor() {
        this.store = {};
        this.front = 0;
        this.rear = 0;
    }

    size() {
        if (this.store[this.rear] === undefined) {
            return 0;
        } else {
            return this.rear - this.front + 1;
        }
    }

    push(value) {
        if (this.size() === 0) {
            this.store['0'] = value;
        } else {
            this.rear += 1;
            this.store[this.rear] = value;
        }
    }

    popLeft() {
        let temp;
        if (this.front === this.rear) {
            temp = this.store[this.front];
            delete this.store[this.front];
            this.front = 0;
            this.rear = 0;
            return temp;
        } else {
            temp = this.store[this.front];
            delete this.store[this.front];
            this.front += 1;
            return temp;
        }
    }
}

function bfs(startX, startY, target, checkVisited) {
    let queue = new Queue();
    queue.push([startX, startY]);

    while (queue.size()) {
        const [X, Y] = queue.popLeft();
        const v = board[X][Y];
        checkVisited[X][Y] = true;

        for (let k = 0; k < 4; k += 1) {
            const [aX, aY] = [X + dX[k], Y + dY[k]];

            if (
                aX >= 0 &&
                aX < N &&
                aY >= 0 &&
                aY < N &&
                board[aX][aY] === v &&
                !checkVisited[aX][aY]
            ) {
                queue.push([aX, aY]);
                checkVisited[aX][aY] = true;
            }
            else continue;
        }
    }
}

for (let i = 0; i < N; i += 1) {
    for (let j = 0; j < N; j += 1) {
        if (!visited[i][j]) {
            bfs(i, j, board[i][j], visited);
            countR += 1;
        }
    }
}

// Reset board for 'G' to 'R' conversion
board = board.map(row => row.map(cell => (cell === 'G' ? 'R' : cell)));

for (let i = 0; i < N; i += 1) {
    for (let j = 0; j < N; j += 1) {
        visited[i][j] = false;
    }
}

for (let i = 0; i < N; i += 1) {
    for (let j = 0; j < N; j += 1) {
        if (!visited[i][j]) {
            bfs(i, j, board[i][j], visited);
            countRG += 1;
        }
    }
}

console.log(countR + ' ' + countRG);