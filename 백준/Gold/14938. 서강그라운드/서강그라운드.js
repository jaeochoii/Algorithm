let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

const [N, M, R] = input.shift().split(' ').map(Number);
const items = input.shift().split(' ').map(Number);
items.unshift(0);

let graph = Array.from({length: N+1}, () => []);
for(let i = 0; i < R; i += 1) {
    const [start, end, weight] = input[i].split(' ').map(Number);
    graph[start].push([weight, end]);
    graph[end].push([weight, start]);
}

// MinHeap 구현
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
        if(this.heap.length === 1) return this.heap.pop();

        const value = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown();
        return value;
    }

    bubbleUp() {
        let index = this.heap.length - 1;
        let parentIndex = Math.floor((index - 1) / 2);

        while(this.heap[parentIndex] && this.heap[index] < this.heap[parentIndex]) {
            this.swap(index, parentIndex);
            index = parentIndex;
            parentIndex = Math.floor((index - 1) / 2);
        }
    }

    bubbleDown() {
        let index = 0;
        let leftIndex = index * 2 + 1;
        let rightIndex = index * 2 + 2;

        while((this.heap[leftIndex] && this.heap[index] > this.heap[leftIndex]) || (this.heap[rightIndex] && this.heap[index] > this.heap[rightIndex])) {
            let smallIndex = leftIndex;
            if(this.heap[smallIndex] > this.heap[rightIndex]) smallIndex = rightIndex;

            this.swap(index, smallIndex);
            index = smallIndex;
            leftIndex = index * 2 + 1;
            rightIndex = index * 2 + 2;
        }
    }
}

// 다익스트라 기능 구현
function DKS(start) {
    let minQueue = new MinHeap();
    let distance = Array(N+1).fill(Infinity);

    minQueue.add([0, start]);
    distance[start] = 0;

    while(minQueue.size()) {
        const [dist, node] = minQueue.poll();

        if(distance[node] < dist) continue;

        for(const [weight, nextNode] of graph[node]) {
            const cost = dist + weight;

            if(distance[nextNode] > cost && cost <= M) {
                distance[nextNode] = cost;
                minQueue.add([cost, nextNode]);
            }
        }
    }
    return distance;
}

let answer = [];

for(let i = 1; i <= N; i += 1) {
    let result = DKS(i);
    let sum = 0;

    for(let j = 0; j <= N; j += 1) {
        if(result[j] !== Infinity) sum += items[j];
    }
    answer.push(sum);
}

console.log(Math.max(...answer));