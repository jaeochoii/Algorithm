const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = input.shift().split(' ').map(Number);
let graph = Array.from({length: N+1}, () => Array());
let orderCnt = Array(N+1).fill(0);

for(let i = 0; i < M; i += 1){
    const order = input.shift().split(' ').map(Number);
    order.shift();
    calculateOrder(order);
}

let queue = [];
let answer = [];

for(let i = 1; i <= N; i += 1) {
    if(orderCnt[i] === 0) queue.push(i);
}

while(queue.length) {
    let prevNode = queue.shift();
    answer.push(prevNode);

    for(let nextNode of graph[prevNode]) {
        orderCnt[nextNode] -= 1;
        if(orderCnt[nextNode] === 0) queue.push(nextNode);
    }
}
if(answer.length !== N) console.log(0);
else console.log(answer.join('\n'));

function calculateOrder(array) {
    for(let i = 0; i < array.length-1; i += 1) {
        for(let j = i+1; j < array.length; j += 1) {
            graph[array[i]].push(array[j]);
            orderCnt[array[j]] += 1;
        }
    }
}
