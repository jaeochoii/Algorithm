let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N, M] = input.shift().split(' ').map(Number);

// 시작점과 종점, 가중치가 담겨 있는 배열 생성
let paths = [];
for(let i = 0; i < M; i += 1) {
    paths.push(input[i].split(' ').map(Number));
}

// 거리의 값을 갱신할 수 있는 배열 생성
let distance = Array(N+1).fill(Infinity);

function BellmanFord(start) {
    distance[start] = 0;

    for(let i = 0; i < N-1; i += 1) {
        for(let j = 0; j < paths.length; j += 1) {
            const [from, to, weight] = paths[j];

            if(distance[from] + weight < distance[to]) distance[to] = distance[from] + weight;
        }
    }

    for(let i = 0; i < paths.length; i += 1) {
        const [from, to, weight] = paths[i];

        if(distance[from] + weight < distance[to]) return -1;
    }

    return distance;
}

let answer = BellmanFord(1);

if(answer === -1) console.log(-1);
else {
    for(let i = 2; i < answer.length; i += 1) {
        if(answer[i] === Infinity) console.log(-1);
        else console.log(answer[i]);
    }
}