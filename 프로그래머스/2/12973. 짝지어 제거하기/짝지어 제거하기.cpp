#include <iostream>
#include <string>
#include <stack>

using namespace std;

int solution(string s) {
    stack<char> stk;
    
    for(char c: s) {
        if(!stk.empty() && c == stk.top()) stk.pop();
        else stk.push(c);
    }
    
    if(stk.empty()) return 1;
    return 0;
}