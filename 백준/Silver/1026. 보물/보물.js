let input = [];

const strToNumArr = (str) => str.split(' ').map((numChar) => Number(numChar));

require('readline')
  .createInterface(process.stdin, process.stdout)
  .on('line', function (line) {
    input.push(line.trim());
  })
  .on('close', function () {
    const A = strToNumArr(input[1]).sort((a, b) => a - b); //오름차순 정렬
    const B = strToNumArr(input[2]).sort((a, b) => b - a); //내림차순 정렬
    //reduce 메서드를 이용해 결과값 계산
    const result = A.reduce((acc, curr, index) => {
      return acc + curr * B[index];
    }, 0);
    console.log(result);
  });