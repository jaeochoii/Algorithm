let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// 기본 톱니바퀴 세팅
let wheels = [];
for(let i = 0; i < 4; i += 1) {
    wheels.push(input[i].split('').map(Number));
}

// 컨트롤 세팅
const N = Number(input[4]);
let control = [];
for(let i = 5; i < N+5; i += 1) {
    control.push(input[i].split(' ').map(Number));
}

// 컨트롤만큼 회전하는 기능
for(let i = 0; i < control.length; i += 1) {
    const [wheel, direction] = control[i]; // 1: 시계방향 -1: 반시계방향

    // 맞물린 곳 체크
    let isContact = Array(3).fill(false);
    for(let j = 0; j < 3; j += 1) {
        if(wheels[j][2] !== wheels[j+1][6]) isContact[j] = true;
    }

    let isClockRotate = true;

    if(wheel === 1) {
        if(direction === 1) {
            wheels[0].unshift(wheels[0].pop());
            for(let j = 0; j < 3; j += 1) {
                if(isContact[j] && isClockRotate) {
                    wheels[j+1].push(wheels[j+1].shift());
                    isClockRotate = false;
                }
                else if(isContact[j] && !isClockRotate) {
                    wheels[j+1].unshift(wheels[j+1].pop());
                    isClockRotate = true;
                }
                else break;
            }
        }

        else if(direction === -1) {
            isClockRotate = false;
            wheels[0].push(wheels[0].shift());
            for(let j = 0; j < 3; j += 1) {
                if(isContact[j] && isClockRotate) {
                    wheels[j+1].push(wheels[j+1].shift());
                    isClockRotate = false;
                }
                else if(isContact[j] && !isClockRotate) {
                    wheels[j+1].unshift(wheels[j+1].pop());
                    isClockRotate = true;
                }
                else break;
            }
        }
    }

    else if(wheel === 2) {
        if(direction === 1) {
            wheels[1].unshift(wheels[1].pop());

            if(isContact[0]) wheels[0].push(wheels[0].shift());
            for(let j = 1; j < 3; j += 1) {
                if(isContact[j] && isClockRotate) {
                    wheels[j+1].push(wheels[j+1].shift());
                    isClockRotate = false;
                }
                else if(isContact[j] && !isClockRotate) {
                    wheels[j+1].unshift(wheels[j+1].pop());
                    isClockRotate = true;
                }
                else break;
            }
        }

        else if(direction === -1) {
            isClockRotate = false;
            wheels[1].push(wheels[1].shift());

            if(isContact[0]) wheels[0].unshift(wheels[0].pop());
            for(let j = 1; j < 3; j += 1) {
                if(isContact[j] && isClockRotate) {
                    wheels[j+1].push(wheels[j+1].shift());
                    isClockRotate = false;
                }
                else if(isContact[j] && !isClockRotate) {
                    wheels[j+1].unshift(wheels[j+1].pop());
                    isClockRotate = true;
                }
                else break;
            }
        }
    }

    else if(wheel === 3) {
        if(direction === 1) {
            wheels[2].unshift(wheels[2].pop());

            if(isContact[2]) wheels[3].push(wheels[3].shift());
            for(let j = 1; j >= 0; j -= 1) {
                if(isContact[j] && isClockRotate) {
                    wheels[j].push(wheels[j].shift());
                    isClockRotate = false;
                }
                else if(isContact[j] && !isClockRotate) {
                    wheels[j].unshift(wheels[j].pop());
                    isClockRotate = true;
                }
                else break;
            }
        }

        else if(direction === -1) {
            isClockRotate = false;
            wheels[2].push(wheels[2].shift());

            if(isContact[2]) wheels[3].unshift(wheels[3].pop());
            for(let j = 1; j >= 0; j -= 1) {
                if(isContact[j] && isClockRotate) {
                    wheels[j].push(wheels[j].shift());
                    isClockRotate = false;
                }
                else if(isContact[j] && !isClockRotate) {
                    wheels[j].unshift(wheels[j].pop());
                    isClockRotate = true;
                }
                else break;
            }
        }
    }

    else if(wheel === 4) {
        if(direction === 1) {
            wheels[3].unshift(wheels[3].pop());
            for(let j = 2; j >= 0; j -= 1) {
                if(isContact[j] && isClockRotate) {
                    wheels[j].push(wheels[j].shift());
                    isClockRotate = false;
                }

                else if(isContact[j] && !isClockRotate) {
                    wheels[j].unshift(wheels[j].pop());
                    isClockRotate = true;
                }

                else break;
            }
        }

        else if(direction === -1) {
            isClockRotate = false;
            wheels[3].push(wheels[3].shift());
            for(let j = 2; j >= 0; j -= 1) {
                if(isContact[j] && isClockRotate) {
                    wheels[j].push(wheels[j].shift());
                    isClockRotate = false;
                }

                else if(isContact[j] && !isClockRotate) {
                    wheels[j].unshift(wheels[j].pop());
                    isClockRotate = true;
                }

                else break;
            }
        }
    }
}

// 12시 방향 S극 점수 계산하기
let result = 0;
for(let i = 0; i < 4; i += 1) {
    if(wheels[i][0] === 1 && i === 0) result += 1;
    else if(wheels[i][0] === 1 && i === 1) result += 2;
    else if(wheels[i][0] === 1 && i === 2) result += 4;
    else if(wheels[i][0] === 1 && i === 3) result += 8;
}

console.log(result);