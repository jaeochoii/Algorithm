function solution(N, board) {
	let maxSum = 0;
	
	for(let i = 0; i < N; i += 1) {
		for(let j = 0; j < N; j += 1) {
			const newSum = getSum(i, j, N, board);
			if(maxSum < newSum) maxSum = newSum;
		}
	}
	
	console.log(maxSum);
};

function getSum(x, y, N, board) {
	let sum = board[x][y];
	
	const dX = [-1, 1, 0, 0];
	const dY = [0, 0, -1, 1];
	
	for(let i = 0; i < 4; i += 1) {
		const [aX, aY] = [x + dX[i], y + dY[i]];
		
		if(aX < 0 || aX >= N || aY < 0 || aY >= N) continue;
		else sum += board[aX][aY];
	}
	
	return sum;
}

const readline = require('readline');

(async () => {
	let rl = readline.createInterface({ input: process.stdin });
	let N = null;
	let board = [];
	
	for await (const line of rl) {
		if(!line) rl.close();
		if(!N) N = Number(line);
		else board.push(line.split(' ').map(Number));
	}
	
	solution(N, board);
	process.exit();
})();
