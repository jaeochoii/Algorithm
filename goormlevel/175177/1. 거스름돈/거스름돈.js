function solution(N) {
	let list = [40, 20, 10, 5];
	let count = 0;
	
	for(let i = 0; i < 4; i += 1) {
		while(Math.floor(N / list[i]) !== 0) {
			count += Math.floor(N / list[i]);
			N = N % list[i];
		}
	}
	
	console.log(count + N);
}

const readline = require('readline');

(async () => {
	let rl = readline.createInterface({ input: process.stdin });
	let N = null;
	
	for await (const line of rl) {
		if(!N) N = +line;
		rl.close();
	}
	
	solution(N);
	process.exit();
})();
