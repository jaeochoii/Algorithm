const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(input.shift());

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

// D 역할 하는 함수
function setD(string) {
    return Number(string) * 2 % 10000;
}

// S 역할 하는 함수
function setS(number) {
    if(number === 0) return 9999;
    else return number - 1;
}

// L 역할 하는 함수
function setL(number) {
    return (number % 1000) * 10 + Math.floor(number / 1000);
}

// R 역할 하는 함수
function setR(number) {
    return (number % 10) * 1000 + Math.floor(number / 10);
}

function BFS(from, to) {
    let visited = Array(10000).fill(false);

    let queue = new Queue();
    visited[from] = true;
    queue.push(['', from]);

    const functionList = [setD, setS, setL, setR];
    const signalList = ['D', 'S', 'L', 'R'];

    while(queue.size()) {
        const [stack, N] = queue.popLeft();

        if(N === to) return stack;

        for(let i = 0; i < 4; i += 1) {
            const newN = functionList[i](N);

            if(visited[newN]) continue;

            else {
                const newStack = stack + signalList[i];
                queue.push([newStack, newN]);
                visited[newN] = true;
            }
        }
    }
}

for(let i = 0; i < N; i += 1) {
    const [FROM, TO] = input[i].split(' ').map(Number);
    console.log(BFS(FROM, TO));
}

