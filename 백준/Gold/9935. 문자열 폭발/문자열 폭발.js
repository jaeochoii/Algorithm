const fs = require('fs');
let [str, bomb] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let answer = [];
let compare = [];

for (let i = 0; i < str.length; i += 1) {
    answer.push(str[i]);

    if (answer.length >= bomb.length) {
        for (let j = answer.length - bomb.length, k = 0; j < answer.length; j += 1, k += 1) {
            compare.push(answer[j]);

            if (k === bomb.length - 1) {
                if (compare.join('') === bomb) {
                    for (let l = 0; l < bomb.length; l += 1) {
                        answer.pop();
                    }
                }
                compare = [];
            }
        }
    }
}
if(answer.length === 0) {
    console.log('FRULA');
    return;
} else {
    console.log(answer.join(''));
    return;
}