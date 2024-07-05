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

while(i < N) {
    if(LIS[j] < inputNumber[i]) {
        LIS[j+1] = inputNumber[i];
        j += 1;
    }

    else {
        let index = BinarySearch(0, j, inputNumber[i]);
        LIS[index] = inputNumber[i];
    }
    i += 1;
}

console.log(j+1);
