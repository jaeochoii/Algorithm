function solution(N) {
	if(N >= 9) console.log(9);
	else {
		let number = factorial(N);
		
		while(true) {
			if(String(number).length < 2) {
				console.log(number);
				break;
			}
		
			let array = String(number).split('');
			number = 0;
			for(let i = 0; i < array.length; i += 1) {
				number += Number(array[i]);
			}
		}
	}
}

function factorial(number) {
	if(number <= 1) return 1;
	
	return factorial(number - 1) * number; 
}

const readline = require('readline');

(async () => {
	let rl = readline.createInterface({ input: process.stdin });
	let N = null;
	
	for await (const line of rl) {
		N = +line;
		rl.close();
	}
	
	solution(N);
	process.exit();
})();
