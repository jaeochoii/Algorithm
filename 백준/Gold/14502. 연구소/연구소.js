let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');
const [N, M] = input.shift().split(' ').map(Number);
let board = [];
input.forEach((value) => board.push(value.split(' ').map(Number)));
let virus = [];
let nonVirus = [];

for(let i = 0; i < N; i += 1) {
    for(let j = 0; j < M; j += 1) {
        if(board[i][j] === 2) virus.push([i, j]);
        else if(board[i][j] === 0) nonVirus.push([i, j]);
    }
}

let stack = []; // 조합 넣는 스택
// 조합 만드는 함수 구현
function backTracking(start) {
    if(stack.length === 3) {
        BFS(stack, board);
        return;
    }

    for(let i = start; i < nonVirus.length; i += 1) {
        stack.push(nonVirus[i]);
        backTracking(i+1);
        stack.pop();
    }
}

// 큐 코드 구현
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
let result = [];

// BFS 코드 구현
function BFS(array, map) {
    let count = 0;
    let visited = Array.from({length: N}, () => Array(M).fill(false));

    for(let i = 0; i < 3; i += 1) {
        const [x, y] = array[i];
        map[x][y] = 1;
    }

    for(let i = 0; i < virus.length; i += 1) {
        let queue = new Queue();

        queue.push(virus[i]);

        while(queue.size()) {
            const [X, Y] = queue.popLeft();
            visited[X][Y] = true;

            const dX = [-1, 1, 0, 0];
            const dY = [0, 0, -1, 1];

            for(let j = 0; j < 4; j += 1) {
                const [aX, aY] = [X + dX[j], Y + dY[j]];
                if(aX >= 0 && aX < N && aY >= 0 && aY < M && map[aX][aY] === 0 && !visited[aX][aY]) {
                    map[aX][aY] = 2;
                    queue.push([aX, aY]);
                    visited[aX][aY] = true;
                }
            }
        }
    }

    for(let i = 0; i < N; i += 1) {
        for(let j = 0; j < M; j += 1) {
            if(board[i][j] === 0) count += 1;
        }
    }
    result.push(count);

    board = [];
    input.forEach((value) => board.push(value.split(' ').map(Number)));
}

backTracking(0);
console.log(Math.max(...result));