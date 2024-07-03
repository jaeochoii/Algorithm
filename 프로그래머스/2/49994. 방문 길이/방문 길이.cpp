#include <string>
using namespace std;

bool visited[11][11][4];

int dX[] = {-1, 0, 1, 0};
int dY[] = {0, -1, 0, 1};

int toDir(char dir) {
    int ret;
    
    if(dir == 'L') ret = 0;
    else if(dir == 'U') ret = 1;
    else if(dir == 'R') ret = 2;
    else ret = 3;
    
    return ret;
}

bool isValid(int x, int y) {
    if(x >= 0 && x <= 10 && y >= 0 && y <= 10) return 1;
    return 0;
}

int solution(string dirs) {
    int answer = 0;
    int x = 5;
    int y = 5;
    
    for(char c: dirs) {
        int dir = toDir(c);
        int nX = x + dX[dir];
        int nY = y + dY[dir];
        
        if(!isValid(nX, nY)) continue;
        
        if(visited[x][y][dir] == false) {
            visited[x][y][dir] = true;
            visited[nX][nY][(dir + 2) % 4] = true;
            answer += 1;
        }
        
        x = nX;
        y = nY;
    }
    
    return answer;
}