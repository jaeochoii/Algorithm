#include <iostream>
#include <vector>

using namespace std;

int N, M;
vector<int> parent;

int getParent(int x) {
    if(parent[x] == x) return x;
    return parent[x] = getParent(parent[x]);
}

void unionParent(int a, int b) {
    a = getParent(a);
    b = getParent(b);

    if(a > b) parent[a] = b;
    else parent[b] = a;
}

void findParent(int a, int b) {
    a = getParent(a);
    b = getParent(b);

    if(a == b) cout << "YES\n";
    else cout << "NO\n";
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);

    cin >> N >> M;

    parent.resize(N+1);

    for(int i = 1; i <= N; i += 1) {
        parent[i] = i;
    }

    for(int i = 0; i < M; i += 1) {
        int C, A, B;
        cin >> C >> A >> B;

        if(C == 0) unionParent(A, B);
        else findParent(A, B);
    }

    return 0;
}
