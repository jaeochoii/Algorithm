const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = Number(input.shift());
let array = [];
input.forEach((value) => array.push(Number(value)));

array.sort((a,b) => a-b);

let answer = array[0] * array.length;

for(let i = 1; i < array.length; i += 1) {
    answer = Math.max(answer, array[i] *  (array.length - i));
}

console.log(answer);