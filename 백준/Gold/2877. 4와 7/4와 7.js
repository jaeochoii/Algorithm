const fs = require('fs');
let input = Number(fs.readFileSync('/dev/stdin').toString());

const binaryArr = toBinary(input+1);
let answer = [];

for(let i = 0; i < binaryArr.length; i += 1) {
    if(binaryArr[i] === 0) answer.push(4);
    else answer.push(7);
}

console.log(answer.join(''));

function toBinary(number) {
    let arr = [];

    while(number !== 1) {
        arr.unshift(number % 2);
        number = Math.floor(number / 2);
    }

    return arr;
}