#include <string>
#include <vector>
#include <algorithm>
#include <cmath>

using namespace std;

bool visited[101];
vector<int> graph[101];

int DFS(int start, int count) {
    visited[start] = true;
    
    for(int i = 0; i < graph[start].size(); i += 1) {
        int next = graph[start][i];
        
        if(!visited[next]) count = DFS(next, count+1);
    }
    
    return count;
}

int solution(int n, vector<vector<int>> wires) {
    int answer = 100;
    
    // graph 만들기    
    for(int i = 0; i < wires.size(); i += 1) {
        int from = wires[i][0];
        int to = wires[i][1];
        
        graph[from].push_back(to);
        graph[to].push_back(from);
    }
    
    // 순회하면서 방문 처리하고 DFS
    
    for(int i = 0; i < wires.size(); i += 1) {
        fill(begin(visited), end(visited), false);
        
        int from = wires[i][0];
        int to = wires[i][1];
        
        visited[from] = true;
        visited[to] = true;
        
        int valA = DFS(from, 0);
        int valB = DFS(to, 0);
        
        answer = min(abs(valA - valB), answer);
    }
    
    return answer;
}