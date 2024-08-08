#include <string>
#include <vector>
#include <algorithm>
#include <cmath>

using namespace std;

int cnt = 0;

bool check_row(vector<int> v, int new_place) {
    int n = v.size();
    
    for(int i = 0; i < n; i += 1) {
        if(v[i] == new_place) return false;
    }
    
    return true;
}

bool check_diagonal(vector<int> v, int new_place) {
    int n = v.size();
    
    for(int i = 0; i < n; i += 1) {
        if(abs(v[i] - new_place) == n-i) return false;
    }
    
    return true;
}

void placeQueen(vector<int> v, int n, int col) {
    if(col == n) {
        cnt++;
        return;
    }
    
    for(int i = 0; i < n; i += 1) {
        if(check_row(v, i) && check_diagonal(v, i)) {
            v.push_back(i);
            placeQueen(v, n, col+1);
            v.pop_back();
        }
    }
}

int solution(int n) {
    vector<int> candidate;
        
    placeQueen(candidate, n, 0);
    
    return cnt;
}