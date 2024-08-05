#include <string>
#include <vector>
#include <algorithm>

using namespace std;

vector<int> answer;
bool visited[17] = {false};

void DFS(int sheep, int wolf, vector<int> info, vector<vector<int>> edges) {
    if(sheep > wolf) answer.push_back(sheep);
    else return;
    
    for(vector<int> list: edges) {
        int a = list[0];
        int b = list[1];
        
        if(visited[a] && !visited[b]) {
            visited[b] = true;
            if(info[b] == 0) DFS(sheep+1, wolf, info, edges);
            else DFS(sheep, wolf+1, info, edges);
            visited[b] = false;
        }
    }
}

int solution(vector<int> info, vector<vector<int>> edges) {    
    visited[0] = true;
    DFS(1, 0, info, edges);
    return *max_element(answer.begin(), answer.end());
}