const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");
 
input = input.map((item) => +item);
solution(input[0], input[1]);
 
function solution(n, f, answer = 0) {
  let number = ((n/100) | 0) * 100;
 
  while (true) {
    if (number % f == 0) {
      answer = number;
      break;
    } else {
      number += 1;
    }
  }
  console.log(("" + answer).slice(-2));
}