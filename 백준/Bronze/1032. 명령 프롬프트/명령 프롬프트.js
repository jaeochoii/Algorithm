const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

let N = +input[0];
const inputFileName = [];

for (let i = 1; i <= N; i++) {
  inputFileName.push(input[i]);
}

////////문제 풀이 코드
solution(inputFileName);

function solution(arr) {
  let answer = [];
  for (let i = 0; i < arr[0].length; i++) {
    let temp = arr[0][i];
    let num = 0;
    for (let j = 0; j < arr.length; j++) {
      if (temp !== arr[j][i]) {
        answer.push("?");
        break;
      } else {
        num++;
      }
      if (num === arr.length) answer.push(temp);
    }
  }
  console.log(answer.join(""));
}