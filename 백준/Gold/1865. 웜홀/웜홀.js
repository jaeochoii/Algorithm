let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const T = Number(input.shift());

for(let i = 0; i < input.length;) {
    let isCycle = false;
    const [N, M, W] = input[i].split(' ').map(Number);
    let paths = [];
    let distance = Array(N+1).fill(Infinity);

    for(let j = i+1; j <= i+M; j += 1) {
        const [A, B, W] = input[j].split(' ').map(Number);

        paths.push([A, B, W]);
        paths.push([B, A, W]);
    }

    for(let j = i+M+1; j <= i+M+W; j += 1) {
        const [A, B, W] = input[j].split(' ').map(Number);

        paths.push([A, B, -W]);
    }

    for(let j = 1; j <= N; j++) {
        if(BellmanFord(j, N, paths, distance)) {
            isCycle = true;
            break;
        }
    }

    if(isCycle) console.log('YES');
    else console.log('NO');

    i += M + W + 1;
}

function BellmanFord(start, n, path, dist) {
    dist[start] = 0;
    let updated = false;

    for(let i = 1; i <= n; i += 1) {
        updated = false;

        for(let j = 0; j < path.length; j += 1) {
            const [from, to, weight] = path[j];

            if(dist[from] + weight < dist[to]) {
                dist[to] = dist[from] + weight;
                updated = true;
            }
        }

        if(!updated) return false;
        if(updated && i === n) return true;
    }
}
