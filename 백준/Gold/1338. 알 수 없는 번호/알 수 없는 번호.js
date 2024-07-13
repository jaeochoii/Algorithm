const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('', (line) => {
  const [l, r, x, y] = line.split(' ').map(Number);
  const INF = Number.MAX_SAFE_INTEGER;

  const swap = (a, b) => [b, a];

  let ans = 'Unknown Number';
  const v = [];

  if (l > r) {
    [l, r] = swap(l, r);
  }

  const absX = Math.abs(x);

  if (r - l >= 2 * absX || !(0 <= y && y < absX)) {
    console.log(ans);
  } else {
    let st = l;
    if ((l % absX + absX) % absX === y);
    else if ((l % absX + absX) % absX <= y) st += y - (l % absX + absX) % absX;
    else st += absX - (l % absX + absX) % absX + y;

    for (let i = st; i <= r; i += absX) {
      if ((i % absX + absX) % absX === y) {
        v.push(i);
      }
      if (v.length > 1) {
        console.log(ans);
        rl.close();
        return;
      }
    }

    if (v.length === 0) {
      console.log(ans);
    } else {
      console.log(v[0]);
    }
  }

  rl.close();
});
