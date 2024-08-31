const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N, M] = input.shift().split(' ').map(Number);
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

let existTomato = new Queue();

for(let i = 0; i < M; i += 1) {
    for(let j = 0; j < N; j += 1) {
        if(board[i][j] === 1) existTomato.push([i, j]);
    }
}

let count = 0;
const dX = [-1, 1, 0, 0];
const dY = [0, 0, -1, 1];

while(existTomato.size()) {
    let date = existTomato.size();

    for(let i = 0; i < date; i += 1) {
        const [X, Y] = existTomato.popLeft();
        board[X][Y] = 1;

        for(let j = 0; j < 4; j += 1) {
            const [aX, aY] = [X + dX[j], Y + dY[j]];

            if(aX >= 0 && aX < M && aY >= 0 && aY < N && board[aX][aY] === 0) {
                board[aX][aY] = 1;
                existTomato.push([aX, aY]);
            }
            else continue;
        }
    }
    count += 1;
}


for(let i = 0; i < M; i += 1) {
    for(let j = 0; j < N; j += 1) {
        if(board[i][j] !== 1 && board[i][j] !== -1) {
            console.log(-1);
            return;
        }
    }
}
console.log(count - 1);