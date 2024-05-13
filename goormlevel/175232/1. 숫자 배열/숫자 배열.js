function solution(N) {
	let board = Array.from({length: N}, () => Array(N).fill(true));
	let startNum = 1;
	
	for(let i = 0; i < N; i += 1) {
		for(let j = 0; j < N; j += 1) {
			if(board[i][j]) {
				board[i][j] = startNum;
				startNum += 1;
			}
		}
	}
	
	for(let i = 0; i < N; i += 1) {
		console.log(board[i].join(' '));
	}
}

const readline = require('readline');

(async () => {
	let rl = readline.createInterface({ input: process.stdin });
	let N = null;
	
	for await (const line of rl) {
		if(!N) N = +line;
		
		else rl.close();
	}
	
	solution(N);
	process.exit();
})();
