function solution(data) {
	let sum = 1;
	
	for(let i = 0; i < data.length; i += 1) {
		sum *= data[i];
	}
	
	console.log(sum);
}

const readline = require('readline');

(async () => {
	let rl = readline.createInterface({ input: process.stdin });
	let data = [];
	
	for await (const line of rl) {
		data = line.split(' ').map(Number);
		rl.close();
	}
	
	solution(data);
	process.exit();
})();
