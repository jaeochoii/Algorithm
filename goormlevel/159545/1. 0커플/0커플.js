function solution(N, data) {
	let map = new Map();
	let sum = 0;
	
	for(let i = 0; i < N; i += 1) {
		if(!map.has(Math.abs(data[i]))) map.set(Math.abs(data[i]), 0);
		else map.set(Math.abs(data[i]), 1);
	}
	
	for(let [key, value] of map) {
		if(value === 0) {
			if(data.includes(key)) sum += key;
			else sum -= key;
		}
	}
	
	console.log(sum);
}

const readline = require('readline');

(async () => {
	let rl = readline.createInterface({ input: process.stdin });
	let N = null;
	let data = [];
	
	for await (const line of rl) {
		if(!line) rl.close();
		
		if(!N) N = Number(line);
		else {
			data = line.split(' ').map(Number);
			break;
		}
	}
	
	solution(N, data);
	process.exit();
})();
