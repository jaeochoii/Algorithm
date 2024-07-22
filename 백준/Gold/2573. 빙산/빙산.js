let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = input.shift().split(' ').map(Number);

let board = [];
input.forEach((value) => board.push(value.split(' ').map(Number)));

let count = 0;
let isVisited = Array.from({length: N}, ()=> Array(M).fill(false));

const dX = [-1, 1, 0, 0];
const dY = [0, 0, -1, 1];

// Queue 기능 구현
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

// 빙산이 몇등분 되었는지 확인하는 함수
function BFS(x, y, visited) {

    let queue = new Queue();
    queue.push([x, y]);
    visited[x][y] = true;

    while(queue.size()) {
        const [X, Y] = queue.popLeft();

        for(let i = 0; i < 4; i += 1) {
            const [aX, aY] = [X + dX[i], Y + dY[i]];
            if(aX < 0 || aX >= N || aY < 0 || aY >= M || visited[aX][aY] || board[aX][aY] === 0) continue;
            else {
                queue.push([aX, aY]);
                visited[aX][aY] = true;
            }
        }
    }
}

let day = 0;

while(count < 2) {
    let countSize = Array.from({length: N}, () => Array(M).fill(0));

    for(let i = 0; i < N; i += 1) {
        for(let j = 0; j < M; j += 1){
            if(board[i][j] === 0) continue;
            else {
                for(let k = 0; k < 4; k += 1) {
                    if(board[i + dX[k]][j + dY[k]] === 0) countSize[i][j] += 1;
                }
            }
        }
    }

    for(let i = 0; i < N; i += 1) {
        for(let j = 0; j < M; j += 1) {
            const newValue = board[i][j] - countSize[i][j];
            newValue <= 0 ? board[i][j] = 0 : board[i][j] = newValue;
        }
    }

    // 0이 아닌 곳을 중심으로 순회
    for(let i = 0; i < N; i += 1) {
        for(let j = 0; j < M; j += 1) {
            if(board[i][j] === 0 || isVisited[i][j]) continue;

            else {
                BFS(i, j, isVisited);
                count += 1;
            }
        }
    }

    day += 1;

    if(count >= 2) {
        console.log(day);
        break;
    }

    for(let i = 0; i < N; i += 1) {
        for(let j = 0; j < M; j += 1) {
            isVisited[i][j] = false;
        }
    }

    let cnt = 0;

    for(let i = 0; i < N; i += 1) {
        for(let j = 0; j < M; j += 1) {
            if(board[i][j] === 0) cnt += 1;
        }
    }

    if(cnt === N*M) {
        console.log(0);
        break;
    }

    count = 0;
}