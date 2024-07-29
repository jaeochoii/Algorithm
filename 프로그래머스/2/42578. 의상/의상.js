function solution(clothes) {
    let arr = [];
    let cntArr = [];

    for(let i=0; i<clothes.length; i++){
        if(arr.indexOf(clothes[i][1]) === -1){
            arr.push(clothes[i][1]);
            cntArr[arr.indexOf(clothes[i][1])] = 1;
        }
        else cntArr[arr.indexOf(clothes[i][1])]++;
    }
    
    let sum =1;
    for(let i=0; i<cntArr.length; i++){
        sum *= (cntArr[i]+1);
    }
    return sum-1;
}