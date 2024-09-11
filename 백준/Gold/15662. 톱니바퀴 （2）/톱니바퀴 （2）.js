let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// 톱니바퀴 기본 세팅
const N = Number(input.shift());
let wheels = [];
for(let i = 0; i < N; i += 1) {
    wheels.push(input[i].split('').map(Number));
}

// 명령어 작업 기본 세팅
const T = Number(input[N]);
let control = [];
for(let i = N+1; i < N+T+1; i += 1) {
    control.push(input[i].split(' ').map(Number));
}

for(let i = 0; i < T; i += 1) {
    const [wheel, direction] = control[i]; // 1: 시계방향, -1: 반시계방향

    let isContact = Array(N-1).fill(false);
    for(let j = 0; j < N-1; j += 1) {
        if(wheels[j][2] !== wheels[j+1][6]) isContact[j] = true;
    }

    let isClockWay = true;

    // 톱니바퀴가 왼쪽 끝에 위치한 경우
    if(wheel === 1) {
        if(direction === 1) {
            wheels[0].unshift(wheels[0].pop());
            isClockWay = true;
        }

        else if(direction === -1) {
            wheels[0].push(wheels[0].shift());
            isClockWay = false;
        }

        for(let j = 0; j < N-1; j += 1) {
            if(isContact[j] && !isClockWay) {
                wheels[j+1].unshift(wheels[j+1].pop());
                isClockWay = true;
            }
            else if(isContact[j] && isClockWay) {
                wheels[j+1].push(wheels[j+1].shift());
                isClockWay = false;
            }
            else break;
        }
    }

    // 톱니바퀴가 오른쪽 끝에 위치한 경우
    else if(wheel === N) {
        if(direction === 1) {
            wheels[N-1].unshift(wheels[N-1].pop());
            isClockWay = true;

        }

        else if(direction === -1){
            wheels[N-1].push(wheels[N-1].shift());
            isClockWay = false;
        }

        for(let j = wheel-2; j >= 0; j -= 1) {
            if(isContact[j] && isClockWay) {
                wheels[j].push(wheels[j].shift());
                isClockWay = false;
            }
            else if(isContact[j] && !isClockWay) {
                wheels[j].unshift(wheels[j].pop());
                isClockWay = true;
            }
            else break;
        }
    }

    // 그 외 사이에 톱니바퀴가 위치한 경우
    else {
        if(direction === 1) {
            wheels[wheel-1].unshift(wheels[wheel-1].pop());
            isClockWay = true;
        }

        else if(direction === -1) {
            wheels[wheel-1].push(wheels[wheel-1].shift());
            isClockWay = false;

        }

        for(let j = wheel-2; j >= 0; j -= 1) {
            if(isContact[j] && isClockWay) {
                wheels[j].push(wheels[j].shift());
                isClockWay = false;
            }
            else if(isContact[j] && !isClockWay) {
                wheels[j].unshift(wheels[j].pop());
                isClockWay = true;
            }
            else break;
        }

        if(direction === 1) isClockWay = true;
        else isClockWay = false;

        for(let j = wheel-1; j < N-1; j += 1) {
            if(isContact[j] && isClockWay) {
                wheels[j+1].push(wheels[j+1].shift());
                isClockWay = false;
            }
            else if(isContact[j] && !isClockWay) {
                wheels[j+1].unshift(wheels[j+1].pop());
                isClockWay = true;
            }
            else break;
        }
    }
}

let result = 0;
for(let i = 0; i < N; i += 1) {
    if(wheels[i][0] === 1) result += 1;
}

console.log(result);