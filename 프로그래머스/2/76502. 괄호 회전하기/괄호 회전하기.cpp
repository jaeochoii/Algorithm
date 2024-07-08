#include <string>
#include <vector>
#include <stack>
#include <unordered_map>

using namespace std;

unordered_map<char, char> bracketPair = {{')', '('}, {']', '['}, {'}', '{'}};

bool isValid(string &s, int start) {
    stack<char> stk;
    unsigned int sz = s.size();
    
    for(int i = 0; i < sz; i += 1) {
        char ch = s[(start + i) % sz];
        
        if(bracketPair.count(ch)) {
            if(stk.empty() || stk.top() != bracketPair[ch]) return false;
            stk.pop();
        }
        else stk.push(ch);
    }
    return stk.empty();
}

int solution(string s) {
    int answer = 0;
    int n = s.size();
    
    for(int i=0; i < n; i += 1) {
        answer += isValid(s, i);
    }
    
    return answer;
}