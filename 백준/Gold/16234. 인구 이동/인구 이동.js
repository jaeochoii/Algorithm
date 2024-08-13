let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, L, R] = input.shift().split(' ').map(Number);
let flag;

// 큐 기능 구현
class Queue {
    constructor() {
        this.store = {};
        this.front = 0;
        this.rear = 0;
    }

    size() {
        if(this.store[this.rear] === undefined) return 0;
        return this.rear - this.front + 1;
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

// 기본적인 배열 세팅
let board = [];
input.forEach((value) => board.push(value.split(' ').map(Number)));
let result = 0;

while(true) {
    let flag = false;
    // 방문한 배열 체크 세팅
    let isVisited = Array.from({length: N}, () => Array(N).fill(false));

    for(let k = 0; k < N; k += 1)  {
        for(let l = 0; l < N; l += 1) {
            if(isVisited[k][l] === true) continue;

            else {
                let queue = new Queue();
                queue.push([k, l]);
                let visitRecord = [[k, l]];
                isVisited[k][l] = true;

                // 연합인 나라들의 인구이동 과정
                let sum = board[k][l];
                let count = 1;

                // 연합인 나라들 찾고 연결하기
                while(queue.size()) {
                    const [X, Y] = queue.popLeft();

                    const dX = [-1, 1, 0, 0];
                    const dY = [0, 0, -1, 1];

                    for(let i = 0; i < 4; i += 1) {
                        const [aX, aY] = [X + dX[i], Y + dY[i]];

                        if(aX < 0 || aX >= N || aY < 0 || aY >= N || isVisited[aX][aY]) continue;

                        else if(Math.abs(board[X][Y] - board[aX][aY]) < L || Math.abs(board[X][Y] - board[aX][aY]) > R) continue;

                        else {
                            isVisited[aX][aY] = true;
                            queue.push([aX, aY]);
                            visitRecord.push([aX, aY]);
                            count += 1;
                            sum += board[aX][aY];
                            flag = true;
                        }
                    }
                }

                let afterMove = Math.floor(sum / count);

                for(const [x, y] of visitRecord) {
                    board[x][y] = afterMove;
                }
            }
        }
    }
    if(!flag) break;
    result += 1;
}

console.log(result);