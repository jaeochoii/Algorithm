let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(input.shift());

// 기본 보드판 생성
let blueBoard = Array.from({length: 4}, () => Array(6).fill(0));
let greenBoard = Array.from({length: 6}, () => Array(4).fill(0));

let score = 0;

// N번 동안 진행할 모노미노도미노
for(let i = 0; i < N; i += 1) {
    const [t, x, y] = input[i].split(' ').map(Number);

    // 만약 1x1이라면
    if(t === 1) {

        // 초록색 칸 채우기
        for(let j = 0; j < 5; j += 1) {
            if(greenBoard[j+1][y] === 1) {
                greenBoard[j][y] = 1;
                break;
            }

            else if(j === 4 && greenBoard[j+1][y] === 0) {
                greenBoard[j+1][y] = 1;
                break;
            }

            else continue;
        }

        // 파란색 칸 채우기
        for(let j = 0; j < 5; j += 1) {
            if(blueBoard[x][j+1] === 1) {
                blueBoard[x][j] = 1;
                break;
            }

            else if(j === 4 && blueBoard[x][j+1] === 0) {
                blueBoard[x][j+1] = 1
                break;
            }

            else continue;
        }
    }

    // 만약 1x2라면
    else if(t === 2) {

        // 초록색 칸 채우기
        for(let j = 0; j < 5; j += 1) {
            if(greenBoard[j+1][y] === 1 || greenBoard[j+1][y+1] === 1) {
                greenBoard[j][y] = 1;
                greenBoard[j][y+1] = 1;
                break;
            }

            else if(j+2 === 6 && greenBoard[j+1][y] === 0 && greenBoard[j+1][y+1] === 0) {
                greenBoard[j+1][y] = 1;
                greenBoard[j+1][y+1] = 1;
                break;
            }

            else continue;
        }

        // 파란색 칸 채우기
        for(let j = 0; j < 4; j += 1) {
            if(blueBoard[x][j+2] === 1) {
                blueBoard[x][j] = 1;
                blueBoard[x][j+1] = 1;
                break;
            }

            else if(j+3 === 6 && blueBoard[x][j+2] === 0) {
                blueBoard[x][j+1] = 1;
                blueBoard[x][j+2] = 1;
                break;
            }

            else continue;
        }
    }

    // 만약 2x1이라면
    else if(t === 3) {

        // 초록색 칸 채우기
        for(let j = 0; j < 4; j += 1) {
            if(greenBoard[j+2][y] === 1) {
                greenBoard[j][y] = 1;
                greenBoard[j+1][y] = 1;
                break;
            }

            else if(j+3 === 6 && greenBoard[j+2][y] === 0) {
                greenBoard[j+1][y] = 1;
                greenBoard[j+2][y] = 1;
                break;
            }

            else continue;
        }

        // 파란색 칸 채우기
        for(let j = 0; j < 5; j += 1) {
            if(blueBoard[x][j+1] === 1 || blueBoard[x+1][j+1] === 1) {
                blueBoard[x][j] = 1;
                blueBoard[x+1][j] = 1;
                break;
            }

            else if(j+2 === 6 && blueBoard[x][j+1] === 0 && blueBoard[x+1][j+1] === 0) {
                blueBoard[x][j+1] = 1;
                blueBoard[x+1][j+1] = 1;
                break;
            }

            else continue;
        }
    }

    // 한 줄로 채워지면 포인트를 얻고, 칸이 이동하기 (초록색 칸)
    for(let j = 2; j < 6; j += 1) {
        let isFull = 0;

        for(let k = 0; k < 4; k += 1) {
            if(greenBoard[j][k] === 1) isFull += 1;
        }

        if(isFull === 4) {
            score += 1;
            greenBoard.splice(j, 1);
            greenBoard.unshift([0, 0, 0, 0]);
        }
    }

    // 한 줄로 채워지면 포인트를 얻고, 칸이 이동하기 (파란색 칸)
    for(let j = 2; j < 6; j += 1) {
        let isFull = 0;

        for(let k = 0; k < 4; k += 1) {
            if(blueBoard[k][j] === 1) isFull += 1;
        }

        if(isFull === 4) {
            score += 1;
            blueBoard[0].splice(j, 1);
            blueBoard[0].unshift(0);
            blueBoard[1].splice(j, 1);
            blueBoard[1].unshift(0);
            blueBoard[2].splice(j, 1);
            blueBoard[2].unshift(0);
            blueBoard[3].splice(j, 1);
            blueBoard[3].unshift(0);
        }
    }

    // 0번째, 1번째 블록이 존재하면 해당 줄 블록이 사라지고 마지막 줄은 사라진다 (초록색 칸)
    for(let j = 0; j < 2; j += 1) {
        let isGreenContain = false

        for(let k = 0; k < 4; k += 1) {
            if(greenBoard[j][k] === 1) {
                isGreenContain = true;
                break;
            }
        }
        if(isGreenContain) {
            greenBoard.pop();
            greenBoard.unshift([0, 0, 0, 0]);
        }
    }

    // 0번째, 1번째 블록이 존재하면 해당 줄 블록이 사라지고 마지막 줄은 사라진다 (파란색 칸)

    for(let j = 0; j < 2; j += 1) {
        let isBlueContain = false;

        for(let k = 0; k < 4; k += 1) {
            if(blueBoard[k][j] === 1) {
                isBlueContain = true;
                break;
            }
        }

        if(isBlueContain) {
            blueBoard[0].pop();
            blueBoard[1].pop();
            blueBoard[2].pop();
            blueBoard[3].pop();
            blueBoard[0].unshift(0);
            blueBoard[1].unshift(0);
            blueBoard[2].unshift(0);
            blueBoard[3].unshift(0);
        }
    }
}

console.log(score);

let count = 0;

// 초록색 칸에 존재하는 1 찾기
for(let i = 0; i < 6; i += 1) {
    for(let j = 0; j < 4; j += 1) {
        if(greenBoard[i][j] === 1) count += 1;
    }
}

// 파란색 칸에 존재하는 1 찾기
for(let i = 0; i < 4; i += 1) {
    for(let j = 0; j < 6; j += 1) {
        if(blueBoard[i][j] === 1) count += 1;
    }
}

console.log(count);
