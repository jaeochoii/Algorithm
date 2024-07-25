const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(input.shift());
const inputNumber = input.shift().split(' ').map(Number);

let LIS = [];

function BinarySearch(left, right, target) {
    let mid;

    while(left < right) {
        mid = Math.floor((left + right) / 2);

        if(LIS[mid] < target) left = mid + 1;
        else right = mid;
    }

    return right;
}

LIS[0] = inputNumber[0];

let j = 0;
let i = 1;
let record = [];
record[0] = 1;

while(i < N) {
    if(LIS[j] < inputNumber[i]) {
        j += 1;
        LIS[j] = inputNumber[i];
        record[i] = j+1;
    }

    else {
        let index = BinarySearch(0, j, inputNumber[i]);
        LIS[index] = inputNumber[i];
        record[i] = index+1;
    }

    i += 1;
}

let CNT = j+1;
console.log(CNT);

let answer = [];

for(let i = N-1; i >= 0; i -= 1) {
    if(record[i] === CNT) {
        answer.push(inputNumber[i]);
        CNT -= 1;
    }
}

console.log(answer.reverse().join(' '));