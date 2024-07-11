const fs = require('fs');
const input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");



function check(arr, N, L) {
  let answer = 0;

  for (let i = 0; i < N; i++) {
    const now = arr[i];
    let possible = 1;
    for (let j = 1; j < N; j++) {
      if (now[j - 1] == now[j]) possible++;
      else if (now[j - 1] + 1 == now[j] && possible >= L) possible = 1;
      else if (now[j - 1] == now[j] + 1 && possible >= 0) possible = 1 - L;
      else { possible = -1; break };
    }
    if (possible >= 0) {
      answer++;
    }

  }
  return answer;
}

// 3, 3, 2, 1, 1, 1
// 1  2 - 1 - 1

function main(input) {
  const board = input.map(v => v.split(' ').map(Number))
  const [N, L] = board.shift()
  let newBoard = Array.from(Array(N), () => Array(N));
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      newBoard[j][i] = board[i][j]
    }
  }
  const res = check(board, N, L) + check(newBoard, N, L);
  console.log(res)

}

main(input)
