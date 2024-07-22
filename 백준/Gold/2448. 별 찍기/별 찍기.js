let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trimEnd().split('\n');
const NUMBER = Number(input.shift());

function makeStar(number) {
    if(number === 3) return ['  *  ', ' * * ', '*****'];

    let pyramid = makeStar(number / 2);
    let array = [];

    for(const star of pyramid) array.push(" ".repeat(number / 2) + star + " ".repeat(number / 2));
    for(const star of pyramid) array.push(star + " " + star);

    return array;
}

console.log(makeStar(NUMBER).join('\n'));
