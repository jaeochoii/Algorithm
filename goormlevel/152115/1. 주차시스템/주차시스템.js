function solution(N, M, board) {
	let answer = [];
	let visited = Array.from({length: N}, () => Array(M).fill(false));
	
	for(let i = 0; i < N; i += 1) {
		for(let j = 0; j < M; j += 1) {
			if(board[i][j] !== 0 || visited[i][j]) continue;
			else {
				answer.push(BFS(i, j, visited, board, N, M));
			}
		}
	}
	
	if(answer.length === 0) console.log(0);
	else {
		let maxNum = answer[0];
		
		for(let i = 1; i < answer.length; i += 1) {
			if(maxNum < answer[i]) maxNum = answer[i];
		}
		
		if(maxNum < 0) console.log(0);
		else console.log(maxNum);
	}
}

function BFS(x, y, visit, data, N, M) {
	let point = 1;
	
	let queue = [[x, y]];
	visit[x][y] = true;
	
	const dX = [-1, 1, 0, 0];
	const dY = [0, 0, -1, 1];
	
	while(queue.length) {
		const [X, Y] = queue.shift();
		
		for(let i = 0; i < 4; i += 1) {
			const [aX, aY] = [X + dX[i], Y + dY[i]];
		
			if(aX < 0 || aY < 0 || aX >= N || aY >= M || visit[aX][aY]) continue;
			else if(data[aX][aY] === 2) {
				point -= 2;
				visit[aX][aY] = true;
				queue.push([aX, aY]);
			}
			else if(data[aX][aY] === 0) {
				point += 1;
				visit[aX][aY] = true;
				queue.push([aX, aY]);
			}
		}
	}
	
	return point;
}

const readline = require('readline');

(async () => {
	let rl = readline.createInterface({ input: process.stdin });
	let [N, M] = [null, null];
	let board = [];
	let count = 0;
	
	for await (const line of rl) {
		if(!N && !M) [N, M] = line.split(' ').map(Number);
		else {
			board.push(line.split(' ').map(Number));
			count += 1;
			if(count === N) rl.close();
		}
	}
	
	solution(N, M, board);
	process.exit();
})();
