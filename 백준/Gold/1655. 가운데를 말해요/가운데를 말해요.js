const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = Number(input.shift());
const array = [];

for(let i = 0; i < N; i += 1) {
    array.push(Number(input[i]));
}

class MinHeap {
    constructor() {
        this.heap = [];
    }

    size() {
        return this.heap.length;
    }

    swap(idx1, idx2) {
        [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
    }

    add(value) {
        this.heap.push(value);
        this.bubbleUp();
    }

    poll() {
        if(this.size() === 1) return this.heap.pop();
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

        while(this.heap[parentIndex] !== undefined && this.heap[parentIndex] > this.heap[index]) {
            this.swap(index, parentIndex);
            index = parentIndex;
            parentIndex = Math.floor((index - 1) / 2);
        }
    }

    bubbleDown() {
        let index = 0;
        let leftChild = index * 2 + 1;
        let rightChild = index * 2 + 2;

        while((this.heap[leftChild] !== undefined && this.heap[leftChild] < this.heap[index]) || (this.heap[rightChild] && this.heap[rightChild] < this.heap[index])) {
            let smallIndex = leftChild;

            if(this.heap[smallIndex] > this.heap[rightChild]) smallIndex = rightChild;

            this.swap(smallIndex, index);
            index = smallIndex;
            leftChild = index * 2 + 1;
            rightChild = index * 2 + 2;
        }
    }
}

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

    add(value) {
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

        while(this.heap[parentIndex] !== undefined && this.heap[parentIndex] < this.heap[index]) {
            this.swap(index, parentIndex);
            index = parentIndex;
            parentIndex = Math.floor((index - 1) / 2);
        }
    }

    bubbleDown() {
        let index = 0;
        let leftChild = index * 2 + 1;
        let rightChild = index * 2 + 2;

        while((this.heap[leftChild] !== undefined && this.heap[leftChild] > this.heap[index]) || (this.heap[rightChild] && this.heap[rightChild] > this.heap[index])) {
            let largeIndex = leftChild;

            if(this.heap[largeIndex] < this.heap[rightChild]) largeIndex = rightChild;

            this.swap(largeIndex, index);
            index = largeIndex;
            leftChild = index * 2 + 1;
            rightChild = index * 2 + 2;
        }
    }
}

let minQueue = new MinHeap();
let maxQueue = new MaxHeap();

let answer = [array[0]];
maxQueue.add(array[0]);

for(let i = 1; i < N; i += 1) {

    if (array[i] > maxQueue.heap[0]) minQueue.add(array[i]);
    else maxQueue.add(array[i]);

    if (minQueue.size() > maxQueue.size()) {
        maxQueue.add(minQueue.poll());
    } else if (minQueue.size() + 1 < maxQueue.size()) {
        minQueue.add(maxQueue.poll());
    }

    answer.push(maxQueue.heap[0]);
}

console.log(answer.join('\n'));
