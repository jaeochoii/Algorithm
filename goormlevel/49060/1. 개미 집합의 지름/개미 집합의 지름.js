function solution(N, D, data) {
	let [start, end] = [0, 0];
	let length = 0;
	
	data.sort((a,b) => a-b);
	
	while(start < N && end < N) {
		if(data[end] - data[start] <= D) {
			length = Math.max(length, end - start + 1);
			end += 1;
		}
		else start += 1;
	}
	
	console.log(N - length);
}

const readline = require('readline');

(async () => {
	let rl = readline.createInterface({ input: process.stdin });
	let [N, D] = [null, null];
	let data = [];
	
	for await (const line of rl) {
		if(!N && !D) [N, D] = line.split(' ').map(Number);
		else {
			data = line.split(' ').map(Number);
			rl.close();
		}
	}
	
	solution(N, D, data);
	process.exit();
})();
