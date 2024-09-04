let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');
const [N, K] = input.shift().split(' ').map(Number);
let bagInfo = [];
input.forEach((value) => bagInfo.push(value.split(' ').map(Number)));
let dp = Array.from({length: N+1}, () => Array.from({length: K+1}).fill(0));

for(let i = 1; i <= N; i += 1) {
    const [weight, value] = bagInfo[i-1];

    for(let j = 1; j <= K; j += 1) {
        if (j - weight >= 0) {
            dp[i][j] = Math.max(dp[i-1][j], dp[i-1][j - weight] + value);
        } else {
            dp[i][j] = dp[i-1][j];
        }
    }
}

console.log(dp[N][K]);