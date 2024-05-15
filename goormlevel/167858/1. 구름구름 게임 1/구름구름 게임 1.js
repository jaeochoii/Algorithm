function solution(N, M, data) {
	let board = Array.from({length: N}, () => Array(N).fill(0));
	
	for(let i = 0; i < M; i += 1) {
		const [line, value] = data[i];
		
		for(let j = N-1; j >= 0; j -= 1) {
			if(board[j][line-1] === 0) {
				board[j][line-1] = value;
				break;
			}
			else continue;
		}
	}
	
	for(let i = 0; i < N; i += 1) {
		console.log(board[i].join(' ') + ' ');
	}
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
