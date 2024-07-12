let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');
const N = Number(input.shift());
let board = [];
input.forEach((value) => board.push(value.split(' ').map(Number)));


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

let sharkSize = 2;
let sharkGaze = 0;
let timeCount = 0;

let currentX, currentY;

for(let i = 0; i < N; i += 1) {
    for(let j = 0; j < N; j += 1) {
        if(board[i][j] === 9) {
            [currentX, currentY] = [i, j];
            break;
        }
    }
}

let array = [];
let result = 0;
array.push([currentX, currentY]);

const dX = [-1, 1, 0, 0];
const dY = [0, 0, -1, 1];

while(array.length) {
    const [X, Y] = array.pop();
    board[X][Y] = 0;

    const queue = new Queue();
    queue.push([X, Y]);

    let basket = [];
    let visited = Array.from(Array(N), () => Array(N).fill(0));
    visited[X][Y] = 1;

    // BFS를 활용한 최단거리에 위치한 물고기 찾기
    while(queue.size()) {
        let LENGTH = queue.size();

        for(let j = 0; j < LENGTH; j += 1) {
            const [x, y] = queue.popLeft();

            for(let i = 0; i < 4; i += 1) {
                const [aX, aY] = [x + dX[i], y + dY[i]];

                if(aX < 0 || aX >= N || aY < 0 || aY >= N || board[aX][aY] > sharkSize || visited[aX][aY]) continue;

                else {
                    if(board[aX][aY] < sharkSize && board[aX][aY] !== 0) {
                        basket.push([aX, aY]);
                        visited[aX][aY] = visited[x][y] + 1;
                        result = visited[aX][aY] - 1;
                    }

                    else {
                        queue.push([aX, aY]);
                        visited[aX][aY] = visited[x][y] + 1;
                    }
                }
            }
        }
        if(basket.length !== 0) break;
    }

    // 가장 위 왼쪽에 근접한 물고기를 큐에 넣기
    let sortArr = basket.sort((a, b) => {
        if(b[0] === a[0]) return b[1] - a[1];
        else return b[0] - a[0];
    });

    if(sortArr.length !== 0) {
        let [reX, reY] = sortArr.pop();
        timeCount += result;
        array.push([reX, reY]);
        sharkGaze += 1;
    }

    if(sharkGaze === sharkSize) {
        sharkSize += 1;
        sharkGaze = 0;
    }

}

console.log(timeCount);
