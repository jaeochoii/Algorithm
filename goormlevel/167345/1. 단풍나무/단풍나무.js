function solution(N, board) {
	let CNT = 0;
	let isKeep = false;
	
	while(!isKeep) {		
		let visited = Array.from({length: N}, () => Array(N).fill(0));
		for(let i = 0; i < N; i += 1) {
			for(let j = 0; j < N; j += 1) {
				if(board[i][j] === 0) continue;
				else {
					BFS(i, j, board, visited, N);
					isKeep = true;
				}
			}
		}
		
		if(!isKeep) break;
	
		for(let i = 0; i < N; i += 1) {
			for(let j = 0; j < N; j += 1) {
				if(visited[i][j] !== 0) {
					board[i][j] -= visited[i][j];
					if(board[i][j] < 0) board[i][j] = 0;
				}
			}
		}
		
		CNT += 1;
		isKeep = false;
	}
		
	console.log(CNT);
}

function BFS(x, y, data, visit, N) {
	const dX = [-1, 1, 0, 0];
	const dY = [0, 0, -1, 1];
	let count = 0;
	
	for(let i = 0; i < 4; i += 1) {
		const [aX, aY] = [x + dX[i], y + dY[i]];
		
		if(aX < 0 || aX >= N || aY < 0 || aY >= N || data[aX][aY]) continue;
		else if(data[aX][aY] === 0) count += 1;
	}
	
	visit[x][y] = count;
	
	return 0;
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