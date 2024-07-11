#include <string>
#include <vector>
#include <unordered_map>

using namespace std;

int solution(vector<string> want, vector<int> number, vector<string> discount) {
    int answer = 0;
    
    unordered_map<string, int> wantHash;
    
    for(int i = 0; i < want.size(); i += 1) {
        wantHash[want[i]] = number[i];
    }
    
    for(int i = 0; i < discount.size() - 9; i += 1) {
        unordered_map<string, int> discountHash;
        
        for(int j = i; j < 10+i; j += 1) {
            discountHash[discount[j]] += 1;
        }
        
        if(wantHash == discountHash) answer += 1;
    }
    
    return answer;
}