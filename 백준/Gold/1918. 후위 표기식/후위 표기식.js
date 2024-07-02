let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let string = input.shift().split('');

let answer = '';
let stack = [];

for(let i = 0; i < string.length; i += 1) {
    if(string[i] >= 'A' && string[i] <= 'Z') answer += string[i];

    else if(string[i] === '(') stack.push(string[i]);

    else if(string[i] === ')') {
        while(stack.length && stack[stack.length - 1] !== '(') answer += stack.pop();
        stack.pop();
    }

    else if(string[i] === '+' || string[i] === '-') {
        while(stack.length && stack[stack.length - 1] !== '(') answer += stack.pop();
        stack.push(string[i]);
    }

    else if(string[i] === '*' || string[i] === '/') {
        while(stack.length && (stack[stack.length - 1] === '*' || stack[stack.length - 1] === '/')) answer += stack.pop();
        stack.push(string[i]);
    }
}

while(stack.length) answer += stack.pop();

console.log(answer);
