function solution(N, M, data) {
	let countList = Array(N+1).fill(0);
	
	for(let i = 0; i < M; i += 1) {
		const K = data[i].shift();
		
		for(let j = 0; j < K; j += 1) {
			countList[data[i][j]] += 1;
		}
	}
	
	let maxN = Math.max(...countList);
	let answer = [];
	
	for(let i = 1; i <= N; i += 1) {
		if(countList[i] === maxN) answer.push(i);
	}
	
	console.log(answer.sort((a,b) => b-a).join(' '));
}

const readline = require('readline');

(async () => {
	let rl = readline.createInterface({ input: process.stdin });
	let [N, M] = [null, null];
	let data = [];
	let count = 0;
	
	for await (const line of rl) {
		if(!N && !M) [N, M] = line.split(' ').map(Number);
		else {
			data.push(line.split(' ').map(Number));
			count += 1;
			if(count === M) rl.close();
		}
	}
	
	solution(N, M, data);
	process.exit();
})();
