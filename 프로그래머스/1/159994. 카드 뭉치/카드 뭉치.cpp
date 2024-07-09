#include <string>
#include <vector>
#include <queue>

using namespace std;

string solution(vector<string> cards1, vector<string> cards2, vector<string> goal) {
    queue<string> c1;
    queue<string> c2;
    
    for(string s: cards1) {
        c1.push(s);
    }
    
    for(string s: cards2) {
        c2.push(s);
    }
    
    for(int i = 0; i < goal.size(); i += 1) {
        string target = goal[i];
        
        if(!c1.front().compare(target)) {
            c1.pop();
            if(i == goal.size() - 1) return "Yes";
        }
        
        else if(!c2.front().compare(target)) {
            c2.pop();
            if(i == goal.size() - 1) return "Yes";
        }
        
        else return "No";
    }
}