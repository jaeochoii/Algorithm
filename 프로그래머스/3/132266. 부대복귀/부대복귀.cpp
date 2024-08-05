#include <limits>
#include <queue>
#include <vector>

using namespace std;

vector<int> solution(int n, vector<vector<int>> roads, vector<int> sources, int destination) {
    int INF = numeric_limits<int>::max();
    vector<pair<int, int>> graph[n+1];
    vector<int> distance(n+1, INF);
    vector<bool> visited(n+1, false);
    distance[destination] = 0;
    
    for(const auto &r: roads) {
        int a = r[0], b = r[1];
        graph[a].push_back({b, 1});
        graph[b].push_back({a, 1});
    }
    
    queue<pair<int, int>> q;
    q.push({destination, 0});
    
    while(!q.empty()) {
        int node = q.front().first;
        int dist = q.front().second;
        q.pop();
        
        if(visited[node]) continue;
        visited[node] = true;
        
        for(const auto &next: graph[node]) {
            int next_node = next.first;
            int next_dist = next.second;
            int cost = dist + next_dist;
            
            if(cost < distance[next_node]) {
                distance[next_node] = cost;
                q.push({next_node, cost});
            }
        }
    }
    
    vector<int> answer;
    
    for(int i=0; i<sources.size(); i += 1) {
        int number = sources[i];
        if(distance[number] == INF) answer.push_back(-1);
        else answer.push_back(distance[number]);
    }
    
    return answer;
}