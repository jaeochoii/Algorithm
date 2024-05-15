function solution(N, data) {
	let sum = data.reduce((acc, cur) => {
		return acc + cur;
	}, 0);
	
	console.log(sum.toString(8));
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
	
	solution(N, data);
	process.exit();
})();
