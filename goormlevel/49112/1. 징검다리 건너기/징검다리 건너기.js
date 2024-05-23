function DP(N, data) {
	data.push(0);
	let dp = Array(N+1).fill(0);
	dp[0] = data[0];
	dp[1] = data[1];
	dp[2] = data[2];
	
	for(let i = 3; i <= N; i += 1) {
		dp[i] = data[i] + Math.min(dp[i-3], dp[i-2], dp[i-1]);
	}
	
	console.log(dp[N]);
}

const readline = require('readline');

(async () => {
	let rl = readline.createInterface({ input: process.stdin });
	let N = null;
	let data = [];
	
	for await (const line of rl) {
		if(!N) N = +line;
		else {
			data = line.split(' ').map(Number);
			rl.close();
		}
	}
	
	DP(N, data);
	process.exit();
})();
