const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let location = [];

for(let i = 0; i < 3; i += 1) {
    location.push(input[i].split(' ').map(Number));
}

const [[X1, Y1], [X2, Y2], [X3, Y3]] = location;

const NUM1 = (Y3 - Y1) * (X2 - X1);
const NUM2 = (Y2 - Y1) * (X3 - X1);

if(NUM1 < NUM2) console.log(-1);
if(NUM1 > NUM2) console.log(1);
if(NUM1 === NUM2) console.log(0);