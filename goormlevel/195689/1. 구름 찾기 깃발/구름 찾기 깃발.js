function BFS(N, K, data) {
	let CNT = 0;
	
	for(let i = 0; i < N; i += 1) {
		for(let j = 0; j < N; j += 1) {
			if(data[i][j] === 1) continue;
			else if(Calc(i, j, data) === K) CNT += 1;
		}
	}
	
	console.log(CNT);
}

function Calc(x, y, board) {
	let count = 0;
	
	const dX = [-1, 1, 0, 0, -1, 1, -1, 1];
	const dY = [0, 0, -1, 1, 1, 1, -1, -1];
	
	for(let i = 0; i < 8; i += 1) {
		const [aX, aY] = [x + dX[i], y + dY[i]];
		
		if(aX < 0 || aY < 0 || aX >= N || aY >= N) continue;
		else if(board[aX][aY] === 0) continue;
		else if(board[aX][aY] === 1) count += 1;
	}
	
	return count;
}

const readline = require('readline');
let rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});
let [N, K] = [null, null];
let data = [];
let count = 0;

rl.on('line', (line) => {
	if(!N && !K) [N, K] = line.split(' ').map(Number);
	else {
		data.push(line.split(' ').map(Number));
		count += 1;
		if(count === N) rl.close();
	}
});

rl.on('close', () => {
	BFS(N, K, data);
})