function solution(N, K, maxV, defaultV) {
	
	for(let i = K-1; i >= 0; i -= 1) {
		defaultV[N-1] += 1;
		for(let j = N-1; j >= 0; j -= 1) {
			if(maxV[0] < defaultV[0]) {
				for(let k = N-1; k >= 0; k -= 1) {
					defaultV[k] = 0;
				}
			}
			else if(maxV[j] < defaultV[j]) {
				defaultV[j] = 0;
				defaultV[j-1] += 1;
			}
		}
	}
	
	console.log(defaultV.join(''));
}

const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

let N = null;
let maxV = [];
let defaultV = [];
let K = null;

rl.on("line", function(line) {
	if(!N) N = +line;
	else if(!maxV.length) {
		maxV = line.split(' ').map(Number);
	}
	else if(!defaultV.length) {
		defaultV = line.split(' ').map(Number);
	}
	else {
		K = +line;
		rl.close();
	}
}).on("close", function() {
	solution(N, K, maxV, defaultV);
	process.exit();
});