const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = Number(input.shift());
let array = [];
input.forEach((value) => array.push(value.split(' ').map(Number)));

class MaxHeap {
    constructor() {
        this.heap = [];
    }

    size() {
        return this.heap.length;
    }

    swap(idx1, idx2) {
        [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
    }

    add(value){
        this.heap.push(value);
        this.bubbleUp();
    }

    poll() {
        if(this.heap.length === 1) return this.heap.pop();
        else {
            const value = this.heap[0];
            this.heap[0] = this.heap.pop();
            this.bubbleDown();
            return value;
        }
    }

    bubbleUp() {
        let index = this.heap.length - 1;
        let parentIndex = Math.floor((index - 1) / 2);

        while(this.heap[parentIndex] && this.heap[index][1] > this.heap[parentIndex][1]) {
            this.swap(index, parentIndex);
            index = parentIndex;
            parentIndex = Math.floor((index - 1) / 2);
        }
    }

    bubbleDown() {
        let index = 0;
        let leftChild = index * 2 + 1;
        let rightChild = index * 2 + 2;

        while((this.heap[leftChild] && this.heap[index][1] < this.heap[leftChild][1]) || (this.heap[rightChild] && this.heap[index][1] < this.heap[rightChild][1])) {
            let largeIndex= leftChild;
            if(this.heap[rightChild] !== undefined && this.heap[largeIndex][1] < this.heap[rightChild][1]) largeIndex = rightChild;
            this.swap(index, largeIndex);
            index = largeIndex;
            leftChild = index * 2 + 1;
            rightChild = index * 2 + 2;
        }
    }
}

let queue = new MaxHeap();
for(let i = 0; i < N; i += 1) {
    queue.add(array[i]);
}

let answer =  Array(N+1).fill(-1);

for(let i = 0; i < N; i += 1) {
    let [DAY, SCORE] = queue.poll();

    while(DAY > 0) {
        if(answer[DAY] === -1) {
            answer[DAY] = SCORE;
            break;
        }
        DAY -= 1;
    }
}


let sum = 0;
for(let i = 1; i <= N; i += 1) {
    if(answer[i] !== -1) sum += answer[i];
}

console.log(sum);
