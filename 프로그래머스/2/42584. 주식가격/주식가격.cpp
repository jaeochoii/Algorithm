#include <string>
#include <vector>
#include <stack>

using namespace std;

vector<int> solution(vector<int> prices) {
    vector<int> answer(prices.size());
    
    stack<int> stk;
    
    for(int i = 0; i < prices.size(); i += 1) {
        while(!stk.empty() && prices[i] < prices[stk.top()]) {
            answer[stk.top()] = i - stk.top();
            stk.pop();
        }
        stk.push(i);
    }
    
    while(!stk.empty()) {
        answer[stk.top()] = prices.size() - stk.top() - 1;
        stk.pop();
    }
    
    return answer;
}