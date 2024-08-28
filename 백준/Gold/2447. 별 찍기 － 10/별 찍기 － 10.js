let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = Number(input.shift());

function Rectangle(number) {
    if(number === 3) return ['***', '* *', '***'];

    let array = [];
    let rectangle = Rectangle(number / 3);

    for(const star of rectangle) array.push(star.repeat(3));
    for(const star of rectangle) array.push(star + ' '.repeat(number / 3) + star);
    for(const star of rectangle) array.push(star.repeat(3));

    return array;
}

console.log(Rectangle(N).join('\n'));