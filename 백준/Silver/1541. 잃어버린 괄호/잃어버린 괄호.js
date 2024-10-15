const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString();

const math = input.split('');
let answer = '';
let count = 0;

for(let i = 0; i < math.length; i += 1) {
    if(math[i] === '0' && answer.length === 0 || math[i] === '0' && answer[answer.length - 1]%1 !== 0) continue;


    else if(math[i] === '-' && count%2 === 0) {
        answer += math[i];
        answer += '(';
        count += 1;
    }

    else if(math[i] === '-' && count%2 === 1) {
        answer += ')';
        answer += math[i];
        answer += '(';
        count += 2;
    }

    else answer += math[i];
}

if(count%2 === 1) answer += ')';
const result = answer.split('');

if(eval(result.join('')) === -0) console.log(0);
else console.log(eval(answer));