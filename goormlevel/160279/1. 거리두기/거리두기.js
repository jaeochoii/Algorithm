function solution(N) {
    let sum = 0;
    let dp = Array.from({length: N + 1}, () => Array(5).fill(0));
    
    for(let i = 0; i < 5; i++) {
        dp[1][i] = 1;
    }
    
    for(let n = 2; n <= N; n++) {
        dp[n][0] = (dp[n-1].reduce((a, b) => a + b, 0)) % 100000007;
        dp[n][1] = (dp[n-1][0] + dp[n-1][2] + dp[n-1][3]) % 100000007;
        dp[n][2] = (dp[n-1][0] + dp[n-1][1] + dp[n-1][3] + dp[n-1][4]) % 100000007;
        dp[n][3] = (dp[n-1][0] + dp[n-1][1] + dp[n-1][2]) % 100000007;
        dp[n][4] = (dp[n-1][0] + dp[n-1][2]) % 100000007;
    }
    
    for(let i = 0; i < 5; i++) {
        sum = (sum + dp[N][i]) % 100000007;
    }
    
    console.log(sum);
}

const readline = require('readline');

(async () => {
    let rl = readline.createInterface({ input: process.stdin });
    let N = null;
    
    for await (const line of rl) {
        if (!N) N = +line;
        rl.close();
    }
    
    solution(N);
    process.exit();
})();