#include <string>
#include <vector>

using namespace std;


int solution(vector<int> number) {
    int N = number.size();
    int answer = 0;
    
    for(int i = 0; i < N-2; i += 1) {
        for(int j = i+1; j < N-1; j += 1) {
            for(int k = j+1; k < N; k += 1) {
                if(number[i] + number[j] + number[k] == 0) answer += 1;
            }
        }
    }
    
    return answer;
}