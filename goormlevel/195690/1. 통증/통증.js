function solution(input) {
	let list = [14, 7];
	let count = 0;
	
	for(let i = 0; i < 2; i += 1) {
			count += Math.floor(input / list[i]);
			input = input % list[i];
	}
	
	console.log(count + input);
}

const readline = require('readline');
let rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

let input;
rl.on('line', (line) => {
	input = line;
	rl.close();
});

rl.on('close', () => {
	solution(input);
})