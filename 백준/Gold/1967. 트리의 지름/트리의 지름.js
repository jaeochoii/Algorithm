let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(input.shift());
const inputArr = input.map((v) => v.split(' ').map(Number));
let graph = Array.from(Array(N + 1), () => []);
inputArr.forEach(([from, to, distance]) => {
    graph[from].push([to, distance]);
    graph[to].push([from, distance]);
});

let visited = Array(N+1).fill(false);
let max = {node: 0, dist: 0};

function DFS(node, dist) {
    visited[node] = true;
    if(max.dist < dist) max = {node, dist};
    for(const [nextNode, nextDist] of graph[node]) {
        if(visited[nextNode]) continue;
        DFS(nextNode, dist + nextDist);
    }
}

DFS(1, 0);
visited.fill(false);
DFS(max.node, 0);
console.log(max.dist);
