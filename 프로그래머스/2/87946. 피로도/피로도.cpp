#include <string>
#include <vector>
#include <cmath>
#include <algorithm>

using namespace std;

bool visited[8] = {false};
int maxD = 0;

void DFS(int k, vector<vector<int>> d, int cnt) {
    if(maxD < cnt) maxD = cnt;
    
    for(int i = 0; i < d.size(); i += 1) {
        if(!visited[i] && k >= d[i][0]) {
            visited[i] = true;
            DFS(k - d[i][1], d, cnt+1);
            visited[i] = false;
        }
    }
}

int solution(int k, vector<vector<int>> dungeons) {
    int N = dungeons.size();
    
    DFS(k, dungeons, 0);
    return maxD;
}