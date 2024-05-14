function solution(N, M, data) {
	let graph = Array.from({length: N+1}, () => []);
	for(let i = 0; i < M; i += 1) {
		const [A, B] = data[i];
		graph[A].push(B);
		graph[B].push(A);
	}
	
	let alreadyTold = Array(N+1).fill(false);
	let list = [1];
	alreadyTold[1] = true;
	
	while(list.length) {
		let friend = list.shift();
		
		for(let newF of graph[friend]) {
			if(!alreadyTold[newF]) {
				list.push(newF);
				alreadyTold[newF] = true;
			}
		}
	}
	
	let count = 0;
	for(let i = 1; i <= N; i += 1) {
		if(alreadyTold[i]) count += 1;
	}
	
	console.log(count);
}
const readline = require('readline');

(async () => {
	let rl = readline.createInterface({ input: process.stdin });
	let N = null;
	let M = null;
	let data = [];
	let count = 0;
	
	for await (const line of rl) {
		if(!N) N = +line;
		else if(!M) M = +line;
		
		else {
			data.push(line.split(' ').map(Number));
			count += 1;
			if(count === M) rl.close();
		}
	}
	
	solution(N, M, data);
	process.exit();
})();
