let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

const [N, V] = input.shift().split(' ').map(Number);
const START = Number(input.shift());

// 인접 리스트로 세팅
let graph = Array.from({length: N + 1}, () => []);
for(let i = 0; i < V; i += 1) {
    const [start, end, weight] = input[i].split(' ').map(Number);

    graph[start].push([weight, end]);
}

// minHeap 구현
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

// 다익스트라 알고리즘 구현
function DKS(s) {
    let distance = new Array(N + 1).fill(Infinity);

    let minQueue = new MinHeap();
    minQueue.add([0, s]);
    distance[s] = 0;

    while(minQueue.size()) {
        const [dist, node] = minQueue.poll();

        if(distance[node] < dist) continue;

        for(const [weight, nextNode] of graph[node]) {
            let cost = dist + weight;


            if(cost < distance[nextNode]) {
                distance[nextNode] = cost;
                minQueue.add([cost, nextNode]);
            }
        }
    }
    return distance;
}

const result = DKS(START);
let answer = [];

for(let i = 1; i < result.length; i += 1) {
    if(result[i] === Infinity) answer.push('INF');
    else answer.push(result[i]);
}

console.log(answer.join('\n'));
