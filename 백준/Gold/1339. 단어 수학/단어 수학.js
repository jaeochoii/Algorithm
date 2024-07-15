let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(input.shift());

let array = [];
input.forEach((value) => array.push(value.split('')));

let map = new Map();
for(let i = 0; i < N; i += 1) {
    const LEN = array[i].length;
    for(let j = 0; j < LEN; j += 1) {
        if(map.has(array[i][j])) {
            map.set(array[i][j], map.get(array[i][j]) + 10 ** (LEN-j));
        }
        else map.set(array[i][j], 10 ** (LEN-j));
    }
}
const mapToArr = Array.from(map);
mapToArr.sort((a, b) => b[1] - a[1]);

for(let i = 0, j = 9; i < mapToArr.length; i += 1, j -= 1) {
    mapToArr[i][1] = j;
}

const PRIORITY = new Map(mapToArr);

for(let i = 0; i < N; i += 1) {
    const LEN = array[i].length;
    for(let j = 0; j < LEN; j += 1) {
        array[i][j] = PRIORITY.get(array[i][j]);
    }
}

let result = 0;
for(let i = 0; i < N; i += 1) {
    result += Number(array[i].join(''));
}

console.log(result);
