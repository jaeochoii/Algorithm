const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = input.shift().split(' ').map(Number);
const knowInfo = input.shift().split(' ').map(Number);
const knowCnt = knowInfo.shift();
let visited = Array(N+1).fill(false);

let board = Array.from({length: N+1}, () => Array(N+1).fill(0));
for(let i = 0; i < M; i += 1) {
    const groupInfo = input[i].split(' ').map(Number);
    groupInfo.shift();
    connectGroup(groupInfo);
}

collectPeople();

let count = 0;

for(let i = 0; i < M; i += 1) {
    let isPossible = true;
    const finalInfo = input[i].split(' ').map(Number);
    finalInfo.shift();

    for(let j = 0; j < finalInfo.length; j += 1) {
        const value = finalInfo[j];
        if(visited[value] === true) {
            isPossible = false;
            break;
        }
    }

    if(isPossible) count += 1;
}

console.log(count);

// 파티 그룹별로 같이 모인 사람들을 계산하는 함수 생성
function connectGroup(array) {
    for(let i = 0; i < array.length - 1; i += 1) {
        for(let j = i+1; j < array.length; j += 1) {
            board[array[i]][array[j]] = 1;
            board[array[j]][array[i]] = 1;
        }
    }
}

// DFS를 돌면서 지인들을 체크하는 함수 생성
function collectPeople() {
    let stack = knowInfo;
    knowInfo.forEach((value) => visited[value] = true);

    while(stack.length) {
        const person = stack.pop();
        for(let i = 0; i < board[person].length; i += 1) {
            if(board[person][i] === 1 && !visited[i]) {
                stack.push(i);
                visited[i] = true;
            }
        }
    }
}
