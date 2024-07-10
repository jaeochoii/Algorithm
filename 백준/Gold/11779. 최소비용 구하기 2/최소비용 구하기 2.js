let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

const CITY = Number(input.shift());
const BUS = Number(input.shift());

let graph = Array.from({length: CITY + 1}, () => []);
for(let i = 0; i < BUS; i += 1) {
    const [start, end, weight] = input[i].split(' ').map(Number);
    graph[start].push([weight, end]);
}

const [START, END] = input[BUS].split(' ').map(Number);

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

function DKS(start, end) {
    let minQueue = new MinHeap();
    let distance = Array(CITY + 1).fill(Infinity);

    minQueue.add([0, start]);
    distance[start] = 0;

    let route = Array.from({length: CITY + 1}, () => [START]);

    while(minQueue.size()) {
        const [dist, node] = minQueue.poll();

        if(distance[node] < dist) continue;

        for(const [weight, nextNode] of graph[node]) {
            const cost = dist + weight;

            if(distance[nextNode] > cost) {
                route[nextNode] = [];
                for(let j = 0; j < route[node].length; j += 1) {
                    if(route[nextNode].includes(route[node][j])) continue;
                    else {
                        route[nextNode].push(route[node][j]);
                    }
                }
                route[nextNode].push(nextNode);
                distance[nextNode] = cost;
                minQueue.add([cost, nextNode]);
            }
        }
    }
    console.log(distance[END].toString());
    console.log(route[END].length.toString());
    console.log(route[END].join(' '));
}

DKS(START, END);
