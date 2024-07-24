let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

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

// BFS 기능 구현
function BFS(n, b) {
    let queue = new Queue();
    let visited = Array.from({length: n}, () => Array(n).fill(Infinity));
    queue.push([0, 0]);
    visited[0][0] = b[0][0];

    const dX = [-1, 1, 0, 0];
    const dY = [0, 0, -1, 1];

    while(queue.size()) {
        const [X, Y] = queue.popLeft();

        if(visited[X][Y] < b[X][Y]) continue;

        for(let i = 0; i < 4; i += 1) {
            const [aX, aY] = [X + dX[i], Y + dY[i]];

            if(aX < 0 || aX >= n || aY < 0 || aY >= n || visited[aX][aY] <= visited[X][Y] + b[aX][aY]) continue;

            else {
                visited[aX][aY] = visited[X][Y] + b[aX][aY];
                queue.push([aX, aY]);
            }
        }
    }

    return visited[n-1][n-1];
}

let times = 1;

for(let i = 0; i < input.length; ) {
    const N = Number(input[i]);

    if(N === 0) break; // 0이 입력되는 순간 종료

    let board = [];

    for(let j = i+1; j <= i+N; j += 1) {
        board.push(input[j].split(' ').map(Number));
    }

    console.log(`Problem ${times}: ${BFS(N, board)}`);

    i += N+1;
    times += 1;
}