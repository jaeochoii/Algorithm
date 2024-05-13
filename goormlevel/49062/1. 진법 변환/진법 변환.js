function solution(data) {
	const [TEN, GUESS] = data;
	
	for(let i = 2; i <= 16; i += 1) {
		if(Number(TEN).toString(i).toUpperCase() === GUESS) {
			console.log(i);
			break;
		}
	}
}

const readline = require('readline');

(async () => {
	let rl = readline.createInterface({ input: process.stdin });
	let data = [];
	
	for await (const line of rl) {
		if(!line) rl.close();
		else {
			data = line.split(' ');
		}
	}
	
	solution(data);
	process.exit();
})();
