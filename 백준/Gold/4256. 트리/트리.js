let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const T = Number(input.shift());

for(let i = 0; i < T; i += 1) {
    const N = Number(input.shift());
    const preOrderList = input.shift().split(' ').map(Number);
    const inOrderList = input.shift().split(' ').map(Number);
    const result = [];

    const callStack = [[0, N-1, 0, N-1]];

    while(callStack.length) {
        const [preStart, preEnd, inStart, inEnd] = callStack.pop();

        if(preStart > preEnd || inStart > inEnd) continue;

        const rootNode = preOrderList[preStart];
        result.unshift(rootNode);

        let inRootIndex;
        for(let i = inStart; i <= inEnd; i += 1) {
            if(inOrderList[i] === rootNode) {
                inRootIndex = i;
                break;
            }
        }

        let LeftSize = inRootIndex - inStart;

        callStack.push([preStart + 1, preStart + LeftSize, inStart, inRootIndex - 1]);
        callStack.push([preStart + 1 + LeftSize, preEnd, inRootIndex + 1, inEnd]);
    }

    console.log(result.join(' '));
}
