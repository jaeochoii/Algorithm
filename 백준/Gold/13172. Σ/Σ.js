let input = require("fs").readFileSync("/dev/stdin").toString().trim();
//let input = `1
//6 14`

input = input.split("\n");
let n = Number(input[0]);
const div = 1_000_000_007n;

const expectations = [];

function get_pow(val, pow) {
  if (pow === 1n) {
    return val;
  }

  if (pow % 2n === 1n) {
    const temp = get_pow(val, (pow - 1n) / 2n) % div;
    return (temp * temp * (val % div)) % div;
  } else {
    const temp = get_pow(val, pow / 2n) % div;
    return (temp * temp) % div;
  }
}

for (let i = 1; i < n + 1; i++) {
  const [side_cnt, sum_of_sides] = input[i].split(" ").map(BigInt);
  const b_inv = get_pow(side_cnt, div - 2n);
  let expectation = (sum_of_sides * b_inv) % div;
  expectations.push(expectation);
}

let sum = 0n;
expectations.forEach((exp) => {
  sum = (sum + exp) % div;
});
console.log(sum.toString());