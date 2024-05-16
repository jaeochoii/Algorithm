const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const [N, nums, operator] = input;

let max = Number.MIN_SAFE_INTEGER;
let min = Number.MAX_SAFE_INTEGER;

const calculator = [
  (a, b) => a + b,
  (a, b) => a - b,
  (a, b) => a * b,
  (a, b) => parseInt(a / b),
];

const dfs = (count, result) => {
  if (count === N - 1) {
    max = Math.max(max, result);
    min = Math.min(min, result);
  } else {
    for (let i = 0; i < operator.length; i++) {
      if (operator[i] === 0) {
        continue;
      }
      operator[i]--;
      dfs(count + 1, calculator[i](result, nums[count + 1]));
      operator[i]++;
    }
  }
};

dfs(0, nums[0]);

console.log(max ? max : 0);
console.log(min ? min : 0);