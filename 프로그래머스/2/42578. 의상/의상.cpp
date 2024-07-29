#include <string>
#include <vector>
#include <unordered_map>

using namespace std;
unordered_map<string, int> look;

int solution(vector<vector<string>> clothes) {
    for(auto info: clothes) look[info[1]]++;
    
    int sum = 1;
    
    for(auto cloth: look) sum *= cloth.second + 1;
    
    return sum - 1;
}