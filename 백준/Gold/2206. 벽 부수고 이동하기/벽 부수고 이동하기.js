let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');
const [N, M] = input.shift().split(' ').map(Number);
let board = [];
let result = [];
input.forEach((value) => board.push(value.split('').map(Number)));
let visited = Array.from({length: N}, () => Array.from({length: M}, () => Array(2).fill(0)));

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

function BFS() {
    let queue = new Queue();
    queue.push([0, 0, 0]);
    visited[0][0][0] = 1;

    while(queue.size()) {
        const [X, Y, isBreak] = queue.popLeft();

        if(X === N-1 && Y === M-1) return visited[X][Y][isBreak];

        const dX = [-1, 1, 0, 0];
        const dY = [0, 0, -1, 1];

        for(let i = 0; i < 4; i += 1) {

            const [aX, aY] = [X + dX[i], Y + dY[i]];

            if(aX >= 0 && aX < N && aY >= 0 && aY < M) {

                // 다음이 벽이 아니고 방문한 적이 없는 경우
                if(board[aX][aY] === 0 && visited[aX][aY][isBreak] === 0) {
                    visited[aX][aY][isBreak] = visited[X][Y][isBreak] + 1;
                    queue.push([aX, aY, isBreak]);
                }

                // 다음이 벽이고 방문한 적이 없는 경우
                else if(board[aX][aY] === 1 && visited[aX][aY][isBreak] === 0) {
                    if(isBreak === 0) {
                        visited[aX][aY][1] = visited[X][Y][isBreak] + 1;
                        queue.push([aX, aY, 1]);
                    }
                    else if(isBreak === 1) continue;
                }
            }
        }
    }
    return -1;
}

console.log(BFS());
