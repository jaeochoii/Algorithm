let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

input.shift();
let dp = new Array(10001).fill(1);
const answer = [];
dp[0] = 1;

for (let i = 2; i <= 3; i++) {
    for (let j = i; j <= 10001; j++) {
        dp[j] += dp[j - i];
    }
}

input.forEach(v => {
    answer.push(dp[v]);
})

console.log(answer.join('\n'))