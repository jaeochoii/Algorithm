const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "../ex.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const test_num = Number(input);
const MOD = 1000000000;

let dp = new Array(10).fill(1);
dp[0] = 0;

for (let i = 1; i < test_num; i++) {
  let dp_copy = [...dp];
  for (let j = 0; j < 10; j++) {
    if (j === 0) {
      dp[0] = dp_copy[1] % MOD;
    } else if (j === 9) {
      dp[9] = dp_copy[8] % MOD;
    } else {
      dp[j] = (dp_copy[j - 1] + dp_copy[j + 1]) % MOD;
    }
  }
}

console.log(dp.reduce((a, c) => (a + c) % MOD, 0));