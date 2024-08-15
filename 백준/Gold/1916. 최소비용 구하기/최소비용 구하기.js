let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

const CITY = Number(input[0]);
const BUS = Number(input[1]);
const [START, END] = input[BUS+2].split(' ').map(Number);

let graph = Array.from({length: CITY + 1}, () => []);

for(let i = 2; i < BUS+2; i += 1) {
    const [start, end, cost] = input[i].split(' ').map(Number);
    graph[start].push([end, cost]);
}

class minHeap {
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

        while(this.heap[parentIndex] && this.heap[index][1] > this.heap[parentIndex][1]) {
            this.swap(index, parentIndex);
            index = parentIndex;
            parentIndex = Math.floor((index - 1) / 2);
        }
    }

    bubbleDown() {
        let index = 0;
        let leftIndex = index * 2 + 1;
        let rightIndex = index * 2 + 2;

        while((this.heap[leftIndex] && this.heap[index][1] > this.heap[leftIndex][1]) || (this.heap[rightIndex] && this.heap[index][1] > this.heap[rightIndex][1])) {
            let smallIndex= leftIndex;

            if(this.heap[smallIndex] > this.heap[rightIndex]) smallIndex = rightIndex;

            this.swap(index, smallIndex);
            index = smallIndex;
            leftIndex = index * 2 + 1;
            rightIndex = index * 2 + 2;
        }
    }
}

function DKS(s, e) {
    let dijkstra = new minHeap();
    let distance = Array(CITY+1).fill(Infinity);

    dijkstra.add([s, 0]);
    distance[s] = 0;

    while(dijkstra.size() > 0) {
        let [node, dist] = dijkstra.poll();

        if(distance[node] < dist) continue;

        for(const [nextNode, weight] of graph[node]) {
            const cost = dist + weight;

            if(cost < distance[nextNode]) {
                distance[nextNode] = cost;
                dijkstra.add([nextNode, cost]);
            }
        }
    }

    return distance[e];
}

console.log(DKS(START, END));