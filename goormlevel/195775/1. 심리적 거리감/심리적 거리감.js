function solution(N, M, K, data) {
	let graph = Array.from({ length: N + 1 }, () => []);
  let answer = Array(N + 1).fill(-1);

  for (let i = 0; i < M; i += 1) {
  	const [TO, END] = data[i];
    graph[TO].push(END);
  }

  let queue = [{ node: K, depth: 0 }];
  answer[K] = -1;

  while(queue.length) {
    let { node, depth } = queue.shift();

    for(let neighbor of graph[node]) {
			if(neighbor === K) continue;
			
      if(answer[neighbor] === -1) {
        answer[neighbor] = depth + Math.abs(K - neighbor);
        queue.push({ node: neighbor, depth: depth + 1 });
      }
    }
	}

  let maxNum = Math.max(...answer);
	if(maxNum === -1) {
		console.log(-1);
		return;
	}
	
	for(let i = N; i > 0; i -= 1) {
		if(answer[i] === maxNum) {
			console.log(i);
			break;
		}
	}
}

const readline = require('readline');

(async () => {
  let rl = readline.createInterface({ input: process.stdin });
  let [N, M, K] = [null, null, null];
  let data = [];
  let count = 0;

  for await (const line of rl) {
    if (!N && !M && !K) [N, M, K] = line.split(' ').map(Number);
    else {
      data.push(line.split(' ').map(Number));
      count += 1;
      if (count === M) rl.close();
    }
  }

  solution(N, M, K, data);
  process.exit();
})();
