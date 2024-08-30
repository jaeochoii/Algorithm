const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N, M, H] = input.shift().split(' ').map(Number);

const dX = [-1, 1, 0, 0, -M, +M];
const dY = [0, 0, -1, 1, 0, 0];

let visited = Array.from({length: M * H}, () => Array(N).fill(false));
let board = [];
input.forEach((value) => board.push(value.split(' ').map(Number)));

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

let queue = new Queue();

for(let i = 0; i < M * H; i += 1) {
    for(let j = 0; j < N; j += 1) {
        if(board[i][j] === 1) {
            queue.push([i, j]);
        }
    }
}

let count = 0;

while(queue.size()) {
    const LENGTH = queue.size();

    for(let i = 0; i < LENGTH; i += 1) {
        const [X, Y] = queue.popLeft();
        visited[X][Y] = true;

        for(let j = 0; j < 6; j += 1) {
            const [aX, aY] = [X + dX[j], Y + dY[j]];

            if(dX[j] === 1) {
                if(X % M === M-1 && aX % M === 0) continue;
            }

            if(dX[j] === -1) {
                if(X % M === 0 && aX % M === M-1) continue;
            }

            if(aX >= 0 && aX < M*H && aY >= 0 && aY < N && board[aX][aY] === 0 && !visited[aX][aY]) {
                board[aX][aY] = 1;
                queue.push([aX, aY]);
                visited[aX][aY] = true;
            }
        }
    }
    count += 1;
}

for(let i = 0; i < M*H; i += 1) {
    for(let j = 0; j < N; j += 1) {
        if(board[i][j] === 0) {
            console.log(-1);
            return;
        }
    }
}

console.log(count - 1);