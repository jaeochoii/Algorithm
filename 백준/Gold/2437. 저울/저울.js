const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(input.shift());
const array = input.shift().split(' ').map(Number).sort((a,b) => a-b);

let answer = 1;
for(let i = 0; i < N; i += 1) {
    if(answer  < array[i]) break;
    answer += array[i];
}

console.log(answer);
