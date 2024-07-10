let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

const [N, M] = input.shift().split(' ').map(Number);
const MEMORIES = input.shift().split(' ').map(Number);
const EXTRA_COST = input.shift().split(' ').map(Number);

const SUM = EXTRA_COST.reduce((acc, cur) => {
    return acc + cur;
}, 0)

let DP = Array.from({length: N+1}, () => Array(SUM+1).fill(0));

for(let i = 1; i <= N; i += 1) {
    const memory = MEMORIES[i-1];
    const cost = EXTRA_COST[i-1];

    for(let j = 0; j <= SUM; j += 1) {
        if(cost - j > 0) DP[i][j] = DP[i-1][j];
        else {
            DP[i][j] = Math.max(DP[i-1][j], DP[i-1][j-cost] + memory);
        }
    }
}

let answer = SUM;

for(let i = 1; i <= N; i += 1) {
    for(let j = 0; j <= SUM; j += 1) {
        if(DP[i][j] >= M) answer = Math.min(j, answer);
    }
}

console.log(answer);
