let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = input.shift().split(' ').map(Number);
let board = [];
input.forEach((value) => board.push(value.split(' ').map(Number)));

// 큐 기능 구현
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
// BFS 구현으로 치즈 모서리 찾기
function BFS() {
    let queue = new Queue();
    queue.push([0, 0]);

    let visited = Array.from({length: N}, () => Array(M).fill(false));
    visited[0][0] = true;

    const dX = [-1, 1, 0, 0];
    const dY = [0, 0, -1, 1];

    while(queue.size()) {
        const [X, Y] = queue.popLeft();

        for(let i = 0; i < 4; i += 1) {
            const [aX, aY] = [X + dX[i], Y + dY[i]];

            if(aX >= 0 && aX < N && aY >= 0 && aY < M && !visited[aX][aY]) {
                if(board[aX][aY] === 1) {
                    board[aX][aY] = 2;
                    visited[aX][aY] = true;
                }
                else {
                    visited[aX][aY] = true;
                    queue.push([aX, aY]);
                }
            }
        }
    }
}

// 치즈가 전부 제거됨을 확인하는 기능
function checkCheese() {
    let count = 0;

    for(let i = 0; i < N; i += 1) {
        for(let j = 0; j < M; j += 1) {
            if(board[i][j] === 0) count += 1;
        }
    }

    if(count === N*M) return true;
}



let time = 0;
let cheeseCount = 0;

// 전반적인 프로그램 시행
while(true) {
    for(let i = 0; i < N; i += 1) {
        for(let j = 0; j < M; j += 1) {
            if(board[i][j] === 1) cheeseCount += 1;
        }
    }

    BFS();

    // n초가 지났을 때의 치즈 상태 변경
    for(let i = 0; i < N; i += 1) {
        for(let j = 0; j < M; j += 1) {
            if(board[i][j] === 2) board[i][j] = 0;
        }
    }

    time += 1;

    if(checkCheese()) break;

    cheeseCount = 0;
}

console.log(time);
console.log(cheeseCount);