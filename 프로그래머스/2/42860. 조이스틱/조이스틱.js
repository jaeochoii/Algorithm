const alphabet = {'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7, 'I': 8, 'J': 9, 'K': 10, 'L': 11, 'M': 12, 'N': 13, 'O': 14, 'P': 15, 'Q': 16, 'R': 17, 'S': 18, 'T': 19, 'U': 20, 'V': 21, 'W': 22, 'X': 23, 'Y': 24, 'Z': 25};

function solution(name) {
    const nameArr = name.split('');
    let count = 0;

    let minMove = nameArr.length - 1;
    
    for(let i = 0; i < nameArr.length; i += 1) {
        count += Math.min(alphabet[nameArr[i]], 26 - alphabet[nameArr[i]]);
        
        let nextIndex = i+1;
        while(nextIndex < nameArr.length && alphabet[nameArr[nextIndex]] === 0) {
            nextIndex += 1;
        }
        
        const toBack = nameArr.length - nextIndex;
        minMove = Math.min(minMove, (i*2) + toBack, i + (toBack*2));
    }
    return minMove + count;
}