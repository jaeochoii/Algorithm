let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');
const [N, M] = input.shift().split(' ').map(Number);
let board = [];
input.forEach((value) => board.push(value.split(' ').map(Number)));

// 가정집 좌표 배열에 정리
let houseLocation = [];
for(let i = 0; i < N; i += 1) {
    for(let j = 0; j < N; j += 1) {
        if(board[i][j] === 1)houseLocation.push([i, j]);
    }
}

// 치킨집 좌표 배열에 정리
let chickenLocation = [];
for(let i = 0; i < N; i += 1) {
    for(let j = 0; j < N; j += 1) {
        if(board[i][j] === 2)chickenLocation.push([i, j]);
    }
}

// 조합을 이용하여 치킨 집 경우의 수 파악하기
let candidate = [];
function chooseCount(start) {
    if(candidate.length === M) {
        calculateDistance(candidate);
        return;
    }

    for(let i = start; i < chickenLocation.length; i += 1) {
        if(!candidate.includes(chickenLocation[i])) {
            candidate.push(chickenLocation[i]);
            chooseCount(i+1);
            candidate.pop();
        }
    }
}

let result = [];
// 거리를 계산하여 결과 배열에 넣기
function calculateDistance(array) {
    let eachDistance = 0;
    let min = 2*N - 2;

    for(let i = 0; i < houseLocation.length; i += 1) {
        const [X, Y] = houseLocation[i];
        for(let j = 0; j < array.length; j += 1) {
            const [X1, Y1] = array[j];
            if(Math.abs(X-X1) + Math.abs(Y-Y1) < min) min = Math.abs(X-X1) + Math.abs(Y-Y1);
        }
        eachDistance += min;
        min = 2*N - 2;
    }
    result.push(eachDistance);
}

chooseCount(0);
console.log(Math.min(...result));