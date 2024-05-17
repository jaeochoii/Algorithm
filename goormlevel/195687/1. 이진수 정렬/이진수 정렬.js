function solution(N, K, data) {
	let list = [];
	
	for(let i = 0; i < N; i += 1) {
		let binaryN = data[i].toString(2);
		let count = 0;
		
		for(let j = 0; j < binaryN.length; j += 1) {
			if(binaryN[j] === '1') count += 1;
		}
		
		list.push([data[i], count]);
	}
	
	list.sort((a, b) => {
		if(a[1] === b[1]) return b[0] - a[0];
		
		return b[1] - a[1];
	})
	
	console.log(list[K-1][0]);
}

const readline = require('readline');
let rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});
let [N, K] = [null, null];
let data = [];

rl.on('line', (line) => {
	if(!N && !K) [N, K] = line.split(' ').map(Number);
	else {
		data = line.split(' ').map(Number);
		rl.close();
	}
});

rl.on('close', () => {
	solution(N, K, data);
})