const input = require('fs').readFileSync('/dev/stdin').toString().split('\n');

const count = Number(input[0]);
const arr = input[1].split(' ').sort((a,b)=>a-b);
const firstnum = Number(arr[0]);
const lastnum = Number(arr[count-1]);
let result = 0;

(arr.length >= 2) ? (result = firstnum*lastnum) : (result = firstnum*firstnum);

console.log(result);