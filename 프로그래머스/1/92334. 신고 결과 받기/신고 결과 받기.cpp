#include <string>
#include <vector>
#include <unordered_map>
#include <sstream>
#include <algorithm>

using namespace std;

vector<int> solution(vector<string> id_list, vector<string> report, int k) {
    vector<int> answer(id_list.size(), 0);
    sort(report.begin(), report.end());
    report.erase(unique(report.begin(), report.end()), report.end());
    
    unordered_map<string, vector<string>> recordList;
    unordered_map<string, int> countList;
    unordered_map<string, int> result;
    
    for(int i = 0; i < id_list.size(); i += 1) {
        result[id_list[i]] = i;
    }
    
    for(string line: report) {
        stringstream ss(line);
        string from, to;
        ss >> from >> to;
        
        recordList[to].push_back(from);
        countList[to] += 1;
    }
    
    for(auto &list: countList) {
        if(list.second >= k) {
            auto &members = recordList[list.first];
            for(string member: members) {
                answer[result[member]] += 1;
            }
        }
    }
    
    return answer;
}