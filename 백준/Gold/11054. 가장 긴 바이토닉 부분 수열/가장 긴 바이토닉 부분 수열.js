let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

const N = Number(input.shift());
const numbers = input.shift().split(' ').map(Number);

// 증가하는 수열 만들기
let upperNumbers = Array(N).fill(1);

for(let i = 1; i < N; i += 1) {
    const standard = numbers[i];
    let max = 0;

    for(let j = i-1; j >= 0; j -= 1) {
        if(numbers[j] < standard && max < upperNumbers[j]) max = upperNumbers[j];
    }

    upperNumbers[i] = max+1;
}

// 감소하는 수열 만들기
let lowerNumbers = Array(N).fill(1);

for(let i = N-2; i >= 0; i -= 1) {
    const standard = numbers[i];
    let max = 0;

    for(let j = i+1; j < N; j += 1) {
        if(numbers[j] < standard && max < lowerNumbers[j]) max = lowerNumbers[j];
    }

    lowerNumbers[i] = max + 1;
}

// 두 수열을 비교해서 최대값 찾기
let max = 0;

for(let i = 0; i < N; i += 1) {
    if(upperNumbers[i] + lowerNumbers[i] - 1 > max) max = upperNumbers[i] + lowerNumbers[i] - 1;
}

console.log(max);