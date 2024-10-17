const fs = require('fs');
const input = fs.readFileSync('/dev/stdin');

let dp = [0, 0];

const answer = DP(Number(input));

console.log(answer);

function DP(number) {
    for(let i = 2; i <= number; i += 1) {
        dp[i] = dp[i - 1] + 1;
        if(i % 3 === 0) dp[i] = Math.min(dp[i / 3] + 1, dp[i]);
        if(i % 2 === 0) dp[i] = Math.min(dp[i / 2] + 1, dp[i]);
    }

    return dp[number];
}

