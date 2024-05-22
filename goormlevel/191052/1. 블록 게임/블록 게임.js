function solution(N, data, points) {
	let board = Array.from({length: 2001}, () => Array(2001).fill(0));
	board[1001][1001] = 1;
	let [X, Y] = [1001, 1001];
	let stack = [[1, X, Y]];
	
	for(let i = 0; i < N; i += 1) {
		if(data[i] === 'L') {
			if(board[X][Y-1] === 0) {
				[X, Y] = [X, Y-1];
				board[X][Y] = points[i];
				stack.push([points[i], X, Y]);
			}
			else {
				while(stack.length) {
					let [number, x, y] = stack.pop();
					board[x][y] = 0;
					
					if(board[X][Y-1] === 0) {
						board[X][Y-1] = points[i];
						[X, Y] = [X, Y-1];
						stack.push([points[i], X, Y]);
						break;
					}
				}
			}
		}
		else if(data[i] === 'R') {
			if(board[X][Y+1] === 0) {
				[X, Y] = [X, Y+1];
				board[X][Y] = points[i];
				stack.push([points[i], X, Y]);
			}
			else {
				while(stack.length) {
					let [number, x, y] = stack.pop();
					board[x][y] = 0;
					if(board[X][Y+1] === 0) {
						board[X][Y+1] = points[i];
						[X, Y] = [X, Y+1];
						stack.push([points[i], X, Y]);
						break;
					}
				}
			}
		}
		else if(data[i] === 'U') {
			if(board[X-1][Y] === 0) {
				[X, Y] = [X-1, Y];
				board[X][Y] = points[i];
				stack.push([points[i], X, Y]);
			}
			else {
				while(stack.length) {
					let [number, x, y] = stack.pop();
					board[x][y] = 0;
					if(board[X-1][Y] === 0) {
						board[X-1][Y] = points[i];
						[X, Y] = [X-1, Y];
						stack.push([points[i], X, Y]);
						break;
					}
				}
			}
		}
		
		else if(data[i] === 'D') {
			if(board[X+1][Y] === 0) {
				[X, Y] = [X+1, Y];
				board[X][Y] = points[i];
				stack.push([points[i], X, Y]);
			}
			else {
				while(stack.length) {
					let [number, x, y] = stack.pop();
					board[x][y] = 0;
					if(board[X+1][Y] === 0) {
						board[X+1][Y] = points[i];
						[X, Y] = [X+1, Y];
						stack.push([points[i], X, Y]);
						break;
					}
				}
			}
		}
	}
	
	let sum = 0;
	
	for(let i = 0; i < 2001; i += 1) {
		for(let j = 0; j < 2001; j += 1) {
			if(board[i][j] === 0) continue;
			else sum += board[i][j];
		}
	}
	
	console.log(sum);
}

const readline = require('readline');

(async () => {
	let rl = readline.createInterface({ input: process.stdin });
	let N = null;
	let data = [];
	let points = [];
	
	for await (const line of rl) {
		if(!N) N = +line;
		else if(data.length === 0) data = line.split('');
		else {
			points = line.split(' ').map(Number);
			rl.close();
		}
	}
	
	solution(N, data, points);
	process.exit();
})();
