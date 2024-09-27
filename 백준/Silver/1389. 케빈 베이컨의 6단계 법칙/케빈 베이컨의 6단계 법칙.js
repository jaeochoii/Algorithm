const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N, M] = input.shift().split(' ').map(Number);
const numberArr = [];
input.forEach((value) => numberArr.push(value.split(' ').map(Number)));
let graph = Array.from({length: N+1}, () => []);

for(let i = 0; i < M; i += 1) {
    graph[numberArr[i][0]].push(numberArr[i][1]);
    graph[numberArr[i][1]].push(numberArr[i][0]);
}

let result = Array(N);

for(let i = 1; i <= N; i += 1) {
    let queue = [];
    let count = 0;

    queue.push(i);
    let visited = Array(N+1).fill(false);
    visited[i] = true;
    let distanceLength = Array(N+1).fill(0);

    while(queue.length) {
        const v = queue.shift();

        for(const node of graph[v]) {
            if(!visited[node]) {
                queue.push(node);
                visited[node] = true;
                distanceLength[node] = distanceLength[v] + 1
            }
            else continue;
        }
    }
    count = distanceLength.reduce((acc, cur) => {
        return acc + cur;
    }, 0)

    result[i-1] = count;
}
answerIndex = Math.min(...result);

console.log(result.indexOf(answerIndex) + 1);