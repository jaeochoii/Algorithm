const changeToMin = (time) => {
    let [hour, min] = time.split(':');
    return parseInt(hour)*60 + parseInt(min);
}

function solution(book_time) {
    let answer = [];
    
    book_time.sort().forEach(time => {
        const start = changeToMin(time[0]);
        const end = changeToMin(time[1]);
        
        if(answer.length === 0) answer.push(end+10);
        
        else {
            answer.sort();
            let flag = true;
            
            for(let i = 0; i < answer.length; i += 1) {
                if(answer[i] <= start) {
                    answer[i] = end+10;
                    flag = false;
                    break;
                }
            }
            
            if(flag) answer.push(end+10);
        }
    })
    
    return answer.length;
}