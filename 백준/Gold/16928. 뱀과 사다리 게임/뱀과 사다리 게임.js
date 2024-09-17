let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');
input.shift();
let canMove = Array(100).fill(0);
let array = [];
input.forEach((value) => array.push(value.split(' ').map(Number)));
array.forEach((value) => canMove[value[0]] = value[1]);
let visited = Array(101).fill(-1);

let queue = [];
queue.push(1);
visited[1] = 0;

while(queue.length) {
    const v = queue.shift();

    if(v > 100) continue;

    for(let i = 1; i <= 6; i += 1) {
        const location = v + i;

        if(canMove[location] && visited[location] === -1 && visited[canMove[location]] === -1) {
            visited[location] = visited[v] + 1;
            visited[canMove[location]] = visited[v] + 1;
            queue.push(canMove[location]);
        }

        else if(visited[location] === -1 && !canMove[location]) {
            visited[location] = visited[v] + 1;
            queue.push(location);
        }

    }
}

console.log(visited[100]);