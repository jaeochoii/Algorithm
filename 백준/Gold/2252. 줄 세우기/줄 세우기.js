const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = input.shift().split(' ').map(Number);
let graph = Array.from({length: N+1}, () => Array());
let inDegree = Array(N+1).fill(0);

for(let i = 0; i < M; i += 1) {
    const [tall, small] = input[i].split(' ').map(Number);
    graph[tall].push(small);
    inDegree[small] += 1;
}

let queue = [];
let answer = [];
for(let i = 1; i <= N; i += 1) {
    if(inDegree[i] === 0) queue.push(i);
}

while(queue.length) {
    let prev = queue.shift();
    answer.push(prev);

    for(let next of graph[prev]) {
        inDegree[next] -= 1;
        if(inDegree[next] === 0) queue.push(next);
    }
}

console.log(answer.join(' '));
