let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(input.shift());
let graph = Array.from({length: N+1}, () => []);

for(let i = 0; i < N; i += 1) {
    const inputArr = input[i].split(' ').map(Number);
    inputArr.pop();

    for(let j = 1; j < inputArr.length; j += 2) {
        graph[inputArr[0]].push([inputArr[j+1], inputArr[j]]);
    }
}

let visited = Array(N+1).fill(false);
let max = {node: 0, dist: 0};

function DFS(node, dist) {
    visited[node] = true;
    if(max.dist < dist) max = {node, dist};
    for(const [nextDist, nextNode] of graph[node]) {
        if(visited[nextNode]) continue;
        DFS(nextNode, dist + nextDist);
    }
}

DFS(1, 0);
visited.fill(false);
DFS(max.node, 0);
console.log(max.dist);
