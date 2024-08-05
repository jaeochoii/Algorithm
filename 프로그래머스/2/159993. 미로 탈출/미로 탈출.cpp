#include <string>
#include <vector>
#include <queue>

using namespace std;

struct Point {
    int x, y, cnt;
};

int dX[4] = {-1, 1, 0, 0};
int dY[4] = {0, 0, -1, 1};

int n,m;

bool isWithRange(int x, int y) {
    return 0 <= x && x < n && 0 <= y && y < m;
}

Point findStartPoint(char start, vector<string> &maps) {
    for(int i = 0; i < n; i += 1) {
        for(int j = 0; j < m; j += 1) {
            if(maps[i][j] == start) return {i, j, 0};
        }
    }
    return {-1, -1, -1};
}

int bfs(char start, char end, vector<string> &maps) {
    bool visited[101][101] = {false};
    queue<Point> q;
    
    q.push(findStartPoint(start, maps));
    
    while(!q.empty()) {
        Point current = q.front();
        q.pop();
        
        if(maps[current.x][current.y] == end) {
            return current.cnt;
        }
        
        for(int i = 0; i < 4; i += 1) {
            int nX = current.x + dX[i];
            int nY = current.y + dY[i];
            
            if(isWithRange(nX, nY) && !visited[nX][nY] && maps[nX][nY] != 'X') {
                q.push({nX, nY, current.cnt + 1});
                visited[nX][nY] = true;
            }
        }
    }
    return -1;
}

int solution(vector<string> maps) {
    n = maps.size();
    m = maps[0].size();
    
    int distanceToL = bfs('S', 'L', maps);
    if(distanceToL == -1) return -1;
    
    int distanceToE = bfs('L', 'E', maps);
    return distanceToE == -1 ? -1 : distanceToL + distanceToE;
}