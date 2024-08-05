#include <vector>
#include <limits>
#include <queue>

using namespace std;

int solution(int N, vector<vector<int> > road, int K) {
    vector<pair<int, int>> graph[N+1];
    vector<int> distance(N+1, numeric_limits<int>::max());
    vector<bool> visited(N+1, false);
    distance[1] = 0;
    
    for(const auto &r: road) {
        int a = r[0], b = r[1], cost = r[2];
        graph[a].push_back({b, cost});
        graph[b].push_back({a, cost});
    }
    
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> heap;
    heap.push({0, 1});
    
    while(!heap.empty()) {
        int dist = heap.top().first;
        int node = heap.top().second;
        heap.pop();
        
        if(visited[node]) continue;
        visited[node] = true;
        
        for(const auto &next: graph[node]) {
            int next_node = next.first;
            int next_dist = next.second;
            int cost = dist + next_dist;
            
            if(cost < distance[next_node]) {
                distance[next_node] = cost;
                heap.push({cost, next_node});
            }
        }
    }
    
    int count = 0;
    
    for(int i = 1; i <= N; i += 1) {
        if(distance[i] <= K) count += 1;
    }
    
    return count;
}