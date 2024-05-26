const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split("\n")
    .map((item) => item.split(" "));

let [N, M] = input[0];
let list = input.slice(1);

let result = 0;

let minSet = Math.min(...list.map((item) => item[0]));
let minPiece = Math.min(...list.map((item) => item[1]));

while (true) {
    let set = Math.floor(N / 6);
    if (N < 6) { 
        result += Math.min(minPiece * N, minSet);
        break;
    } else {
        result += Math.min(minSet * set, minPiece * (set * 6));
        N -= 6 * set;
    }
}

console.log(result);