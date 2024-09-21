const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = Number(input.shift());
let array = [];
input.forEach((value) => array.push(Number(value)));

array.sort((a,b) => a-b);

for(let i = 0; i < N; i += 1) {
    console.log(array[i]);
}
