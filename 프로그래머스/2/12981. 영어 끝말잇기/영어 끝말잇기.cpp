#include <string>
#include <vector>
#include <iostream>
#include <unordered_set>

using namespace std;

vector<int> solution(int n, vector<string> words) {
    vector<int> answer(2, 0);
    unordered_set<string> usedWord;
    
    usedWord.insert(words[0]);
    
    for(int i = 1; i < words.size(); i += 1) {
        
        if((words[i][0] == words[i-1][words[i-1].size()-1]) && (usedWord.find(words[i]) == usedWord.end())) {
            usedWord.insert(words[i]);
            continue;
        }
        
        else {
            answer[0] = i % n + 1;
            answer[1] = i / n + 1;
            
            return answer;
        }
    }
    
    return answer;
}