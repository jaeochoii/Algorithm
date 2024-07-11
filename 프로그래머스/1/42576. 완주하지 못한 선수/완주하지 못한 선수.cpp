#include <string>
#include <vector>
#include <unordered_map>

using namespace std;

string solution(vector<string> participant, vector<string> completion) {
    unordered_map<string, int> hash;
    
    for(int i = 0; i < participant.size(); i += 1) {
        hash[participant[i]] += 1;
    }
    
    for(int i = 0; i < completion.size(); i += 1) {
        hash[completion[i]] -= 1;
        
        if(hash[completion[i]] == 0) hash.erase(hash.find(completion[i]));
    }
    
    return hash.begin()->first;
}