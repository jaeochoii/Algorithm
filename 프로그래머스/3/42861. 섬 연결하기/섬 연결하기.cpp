#include <string>
#include <vector>
#include <algorithm>

using namespace std;

vector<int> parents;

bool compare(vector<int> &a, vector<int> &b) {
    return a[2] < b[2];
}

int getParent(int n, vector<int> p) {
    if(n != p[n]) {
        return p[n] = getParent(p[n], p);
    }
    
    return n;
}

int solution(int n, vector<vector<int>> costs) {
    parents.resize(n+1);
    
    int answer = 0;
    
    for(int i = 1; i <= n; i += 1) {
        parents[i] = i;
    }
    
    sort(costs.begin(), costs.end(), compare);
    
    for(int i = 0; i < costs.size(); i += 1) {
        int start = getParent(costs[i][0], parents);
        int end = getParent(costs[i][1], parents);
        int cost = costs[i][2];
        
        if(getParent(start, parents) != getParent(end, parents)) {
            answer += cost;
            parents[end] = start;
        }
    }
    
    return answer;
}