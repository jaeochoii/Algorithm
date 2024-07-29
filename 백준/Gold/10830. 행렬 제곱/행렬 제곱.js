let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trimEnd().split('\n');

const [N, B] = input.shift().split(' ').map(Number);
let originMatrix = [];
input.forEach((value) => originMatrix.push(value.split(' ').map(Number)));

for(let i = 0; i < N; i += 1) {
    for(let j = 0; j < N; j += 1) {
        originMatrix[i][j] = originMatrix[i][j] % 1000;
    }
}

// 행렬의 곱셈 기능 함수
function Matrix(array, origin) {
    let matrix = Array.from({length: N}, () => []);

    for(let i = 0; i < N; i += 1) {

        for(let j = 0; j < N; j += 1) {
            let multiple = 0;

            for(let k = 0; k < N; k += 1) {
                multiple += (array[i][k] * origin[k][j]) % 1000;
            }

            matrix[i].push(multiple % 1000);
        }
    }
    return matrix;
}

function Square(matrix, times) {
    if(times === 1) return matrix;

    let temp = Square(matrix, Math.floor(times / 2));

    if(times % 2 === 0) return Matrix(temp, temp);

    else return Matrix(Matrix(temp, temp), matrix);
}

let result = Square(originMatrix, B);


for(let i = 0; i < result.length; i += 1) {
    console.log(result[i].join(' '));
}