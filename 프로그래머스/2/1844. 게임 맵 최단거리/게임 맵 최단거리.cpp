#include<vector>
#include<queue>

using namespace std;

struct Point {
    int x, y, count;
};

int dX[4] = {-1, 1, 0, 0};
int dY[4] = {0, 0, -1, 1};

int N, M;
bool visited[100][100] = {false};

bool isPossible(int x, int y) {
    return x >= 0 && y >= 0 && x < N && y < M;
}

int BFS(int endX, int endY, vector<vector<int> > &maps) {
    queue<Point> q;
    q.push({0, 0, 0});
    visited[0][0] = true;
    
    while(!q.empty()) {
        Point current = q.front();
        q.pop();
        
        if(current.x == endX-1 && current.y == endY-1) return current.count+1;
        
        for(int i = 0; i < 4; i += 1) {
            int nX = current.x + dX[i];
            int nY = current.y + dY[i];
            
            if(isPossible(nX, nY) && !visited[nX][nY] && maps[nX][nY]) {
                q.push({nX, nY, current.count + 1});
                visited[nX][nY] = true;
            }
        }
    }
    return -1;
}

int solution(vector<vector<int> > maps) {
    N = maps.size();
    M = maps[0].size();
    
    int dist = BFS(N, M, maps);
    
    return dist;
    
}