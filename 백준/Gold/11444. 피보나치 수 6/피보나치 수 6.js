let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = BigInt(input[0]);
let P = 1000000007n; // BigInt 리터럴은 끝에 'n'을 붙입니다.

// 피보나치 값 기본 세팅
let map = new Map();
map.set(0n, 0n); // BigInt 리터럴은 끝에 'n'을 붙입니다.
map.set(1n, 1n);
map.set(2n, 1n);
map.set(3n, 2n);

// 피보나치 계산 함수
function Fibonacci(index) {
    if (map.has(index)) return map.get(index);

    // 인덱스가 짝수인 경우
    else if (index % 2n === 0n) {
        let nIndex = index / 2n;
        let fibonacciA = Fibonacci(nIndex - 1n);
        let fibonacciB = Fibonacci(nIndex);
        let value = (2n * fibonacciA + fibonacciB) * fibonacciB;
        let result = value % P;

        map.set(index, result);
        return result;
    }

    // 인덱스가 홀수인 경우
    else if (index % 2n === 1n) {
        let nIndex = (index + 1n) / 2n;
        let fibonacciA = Fibonacci(nIndex);
        let fibonacciB = Fibonacci(nIndex - 1n);
        let value = fibonacciA ** 2n + fibonacciB ** 2n;
        let result = value % P;

        map.set(index, result);
        return result;
    }
}

console.log(Fibonacci(N).toString());
