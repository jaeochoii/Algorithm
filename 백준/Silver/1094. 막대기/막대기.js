const fs = require('fs');
const input = fs.readFileSync("./dev/stdin").toString().trim();


const solve = (input) => {
  let target = +input
  let cnt = 0;
  while (target > 0) {
    if (target & 1) {
      cnt++;
    }
    target >>= 1;
  }
  console.log(cnt)
}

solve(input);