let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(input.shift());

const numbers = input.shift().split(' ').map(Number);
let LENGTH = Array(N).fill(1);
let DP = [];

function BinarySearch(array, input) {
    let left = 0;
    let right = array.length - 1;

    if(array[input] < array[left]) return left;
    if(array[input] > array[right]) return right;

    while(left < right) {
        const mid = Math.floor((left + right) / 2);
        if(array[mid] === input) return mid;
        else if(array[mid] > input) right = mid;
        else if(array[mid] < input) left = mid + 1;
    }
    return right;
}

for(let i = 0; i < N; i += 1) {
    let standard = numbers[i];

    if(DP.length === 0) {
        DP.push(standard);
    }

    else {
        if(DP[DP.length - 1] < standard) {
            DP.push(standard);
            LENGTH[i] = DP.length;
        }

        else {
            const index = BinarySearch(DP, standard);
            DP[index] = standard;
            LENGTH[i] = index+1;
        }
    }
}

console.log(Math.max(...LENGTH));
