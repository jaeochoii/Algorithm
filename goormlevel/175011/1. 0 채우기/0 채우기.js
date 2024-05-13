function solution(N, board) {
	for(let i = 0; i < N; i += 1) {
		for(let j = 0; j < N; j += 1) {
			if(board[i][j] === 0) console.log(calculateSum(i, j, N, board));
		}
	}
}
	
function calculateSum(x, y, N, board) {
	let sum = 0;
	
	for(let i = 0; i< N; i += 1) {
		sum += board[i][y];
	}
	
	for(let i = 0; i < N; i += 1) {
		sum += board[x][i];
	}
	
	return sum;
}

const readline = require('readline');

(async () => {
	let rl = readline.createInterface({ input: process.stdin });
	let N = null;
	let board = [];
	let count = 0;
	
	for await (const line of rl) {
		if(!N) N = +line;
		else {
			board.push(line.split(' ').map(Number));
			count += 1;
			if(count === N) rl.close();
		}
		
	}
	
	solution(N, board);
	process.exit();
})();
