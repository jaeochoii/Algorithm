function solution(numbers) {
    let answer = [];
    let nums = numbers.split('');
    
    const isPrime = (number) => {
        if(number <= 1) return false;
        for(let i=2; i*i <= number; i += 1) {
            if(number % i === 0) return false;
        }
        return true;
    }
    
    const getPerm = (arr, fixed) => {
        if(arr.length >= 1) {
            for(let i=0; i < arr.length; i += 1) {
                const newNum = fixed + arr[i];
                const copyArr = [...arr];
                copyArr.splice(i, 1);
                if(!answer.includes(+newNum) && isPrime(+newNum)) answer.push(+newNum);
                getPerm(copyArr, newNum);
            }
        }
    }
    getPerm(nums, '');
    return answer.length;
}