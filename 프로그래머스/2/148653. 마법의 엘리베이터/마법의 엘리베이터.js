function solution(storey) {
    let result = 0;
    
    while(storey) {
        let current = storey % 10; // 현재 자리 수
        let next = (storey / 10) % 10; // 다음 자리 수
        
        if(current < 5) result += current;
        else if(current === 5) {
            result += current;
            storey += next >= 5 ? 10 : 0;
        }
        else {
            result += 10 - current;
            storey += 10;
        }
        storey = parseInt(storey / 10);
    }
    
    return result;
}