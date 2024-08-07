#include <string>
#include <vector>
#include <queue>

using namespace std;
struct POS {
    int y, x, dir, cost;
};
const int dy[4] = {-1, 1, 0, 0};
const int dx[4] = {0, 0, -1, 1};
int MAP[4][26][26];

int solution(vector<vector<int>> board) {
    int N = board.size();
    int answer = 987654321;
    queue <POS> q;
    POS start;
    start.y = 0; start.x = 0; start.dir = 1; start.cost = 0;
    q.push(start);
    start.dir = 3;
    q.push(start);
    
    
    for(int d=0; d<4; d++) {
        for(int i=0; i<N; i++)
            for(int j=0; j<N; j++)
                MAP[d][i][j] = 987654321;
    }
    
    MAP[1][0][0] = 0;
    MAP[3][0][0] = 0;
    
    while(!q.empty()) {
        POS cur = q.front(); q.pop();
        
        if(cur.y == N-1 && cur.x == N-1) {
            answer = min(answer, cur.cost);
        }
        for(int i=0; i<4; i++) {
            int ny = cur.y + dy[i];
            int nx = cur.x + dx[i];
            
            if(ny <0 || nx < 0 || ny >= N || nx >= N || board[ny][nx] == 1)
                continue;
            
            int ncost = 0;
            if(cur.dir != i) {
                ncost = cur.cost + 600;
            }
            else {
                ncost = cur.cost + 100;
            }
            
            if(MAP[i][ny][nx] >= ncost) {
                POS next;
                next.y = ny; next.x = nx; next.dir = i; next.cost = ncost;
                q.push(next);
                MAP[i][ny][nx] = ncost;
            } 
        }
  }
    
    
    return answer;
}