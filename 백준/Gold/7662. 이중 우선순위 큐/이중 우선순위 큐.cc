#include<bits/stdc++.h>
using namespace std;

const int MAX = 1000003;
bool visited[MAX];

int main() {
    ios::sync_with_stdio(0);
    cin.tie(0);

    int N; cin >> N;
    while(N--) {
        int M; cin >> M;
        priority_queue<pair<int, int>> maxPQ;
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> minPQ;
        for (int i=0; i<M; i++) {
            char command; int num;
            cin >> command >> num;
            if (command == 'I') {
                minPQ.push({num, i});
                maxPQ.push({num, i});
                visited[i] = true;
            } else if (command == 'D') {
                if (num == 1) {
                    while(!maxPQ.empty() && !visited[maxPQ.top().second]) maxPQ.pop();
                    if (maxPQ.empty()) continue;
                    visited[maxPQ.top().second] = false;
                    maxPQ.pop();
                }
                else if (num == -1) {
                    while(!minPQ.empty() && !visited[minPQ.top().second]) minPQ.pop();
                    if (minPQ.empty()) continue;
                    visited[minPQ.top().second] = false;
                    minPQ.pop();
                }
            }
        }
        while(!maxPQ.empty() && !visited[maxPQ.top().second]) maxPQ.pop();
        while(!minPQ.empty() && !visited[minPQ.top().second]) minPQ.pop();

        if (minPQ.empty() || maxPQ.empty()) cout << "EMPTY" << '\n';
        else cout << maxPQ.top().first << ' ' << minPQ.top().first << '\n';
    }
    return 0;
}