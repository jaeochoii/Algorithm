#include <string>
#include <vector>
#include <sstream>
#include <unordered_map>

using namespace std;

vector<string> solution(vector<string> record) {
    vector<string> answer;
    
    unordered_map<string, string> userDB;
    
    for(const auto line: record) {
        stringstream ss(line);
        string cmd, id, nickname;
        ss >> cmd >> id;
        
        if(cmd != "Leave") {
            ss >> nickname;
            userDB[id] = nickname;
        }
    }
    
    for(const auto line: record) {
        stringstream ss(line);
        string cmd, id;
        ss >> cmd >> id;
        
        if(cmd == "Enter") {
            answer.push_back(userDB[id] + "님이 들어왔습니다.");
        }
        else if(cmd == "Leave") {
            answer.push_back(userDB[id] + "님이 나갔습니다.");
        }
    }
    
    return answer;
}