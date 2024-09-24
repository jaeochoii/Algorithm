function solution(n, wires) {
  let answer = Number.MAX_SAFE_INTEGER;

  const graph = Array.from(Array(n + 1), () => []);
  for (const wire of wires) {
    let [from, to] = wire;

    graph[from].push(to);
    graph[to].push(from);
  }

  const bfs = (start, except) => {
    let count = 0;
    let queue = [start];
    let visited = Array.from(Array(n + 1), () => false);

    visited[start] = true;

    while (queue.length) {
      let index = queue.shift();
      graph[index].forEach((element) => {
        if (element !== except && visited[element] === false) {
          visited[element] = true;
          queue.push(element);
        }
      });
      count++;
    }

    return count;
  };
    
  wires.forEach((element) => {
    let [from, to] = element;
    answer = Math.min(answer, Math.abs(bfs(from, to) - bfs(to, from)));
  });

  return answer;
}