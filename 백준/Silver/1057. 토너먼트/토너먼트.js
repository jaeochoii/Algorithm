const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});
let input;
rl.on("line", function (line) {
	input = line
		.toString()
		.split(" ")
		.map((el) => +el);
}).on("close", function () {
	let member = new Array(input[0]).fill(1);
	member = member.map((el, idx) => (member[idx] = el + idx));
	let round = 1;

	while (true) {
		let torf = false;
		let win = [];
		for (let i = 0; i < member.length; i += 2) {
			let [num1, num2] = [member[i], member[i + 1]];
			// 만약 둘중 하나가 undefined 라면
			if (num2 === undefined) {
				win.push(num1);
			}
			// 만약 둘중에 한 값이 해당수라면
			else if (
				[input[1], input[2]].includes(num1) ||
				[input[1], input[2]].includes(num2)
			) {
				// 만약 두수가 모두 같다면
				if (
					[input[1], input[2]].includes(num1) &&
					[input[1], input[2]].includes(num2)
				) {
					torf = true;
					break;
				} else {
					if ([input[1], input[2]].includes(num1)) {
						win.push(num1);
					} else {
						win.push(num2);
					}
				}
			} else {
				win.push(num2);
			}
		}
		if (torf) break;
		round++;
		member = win;
	}
	console.log(round);
	process.exit();
});