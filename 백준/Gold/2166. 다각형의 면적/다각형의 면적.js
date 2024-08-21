const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = Number(input.shift());
let location = [];
input.forEach((value) => location.push(value.split(' ').map(Number)));
location.push(location[0]);

let multipleX = 0;
let multipleY = 0;

for(let i = 0; i < N; i += 1) {
    multipleX += location[i][0] * location[i+1][1];
    multipleY += location[i][1] * location[i+1][0];
}

const answer = Math.abs(multipleX - multipleY);

console.log((answer / 2).toFixed(1));