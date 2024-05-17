function Bomb(N, K, board, command) {
	const dX = [0, 0, 0, -1, 1];
	const dY = [0, 1, -1, 0, 0];
	let visited = Array.from({length: N}, () => Array(N).fill(false));
	
	for(let i = 0; i < N; i += 1) {
		for(let j = 0; j < N; j += 1) {
			if(board[i][j] === '@') visited[i][j] = true;
		}
	}
	
	for(let i = 0; i < command.length; i += 1) {
		const [X, Y] = command[i];
		
		for(let i = 0; i < 5; i += 1) {
			const [aX, aY] = [X + dX[i] - 1, Y + dY[i] - 1];
			
			if(aX < 0 || aX >= N || aY < 0 || aY >= N || board[aX][aY] === '#') continue;
			else if(visited[aX][aY] && board[aX][aY] === '@') board[aX][aY] = '2';
			else if(visited[aX][aY] && board[aX][aY] !== '@') board[aX][aY] = String(Number(board[aX][aY]) + 2);
			else board[aX][aY] = String(Number(board[aX][aY]) + 1);
		}
	}
	
	let maxN = 0;
	for(let i = 0; i < N; i += 1) {
		for(let j = 0; j < N; j += 1) {
			if(Number(board[i][j]) > maxN) maxN = Number(board[i][j]);
		}
	}
	
	console.log(maxN);
}

const readline = require('readline');
let rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

let [N, K] = [null, null];
let board = [];
let command = [];
let countN = 0;
let countK = 0;

rl.on('line', (line) => {
	if(!N && !K) [N, K] = line.split(' ').map(Number);
	else if(countN !== N){
		board.push(line.split(' '));
		countN += 1;
	}
	else {
		command.push(line.split(' ').map(Number));
		countK += 1;
		if(countK === K) rl.close();
	}
});

rl.on('close', () => {
	Bomb(N, K, board, command);
})