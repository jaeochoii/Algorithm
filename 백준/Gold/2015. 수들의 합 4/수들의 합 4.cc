#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <cmath>
#include <unordered_map>

using namespace std;

long long N, M;
string input;
int arr[200001];
vector<int> numbers;
unordered_map<int, long long> m;


void Input() {
    cin >> N >> M;
    cin.ignore();
    getline(cin, input);

    stringstream ss(input);
    int num;

    while(ss >> num) {
        numbers.push_back(num);
        if(ss.peek() == ' ') {
            ss.ignore();
        }
    }
}

int main() {

    Input();

    long long answer = 0;

    for(int i = 1; i <= N; i += 1) {
        arr[i] = arr[i-1] + numbers[i-1];
        if(arr[i] == M) answer += 1;
    }

    for(int i = 1; i <= N; i += 1) {
        answer += m[arr[i] - M];
        m[arr[i]] += 1;
    }

    cout << answer << endl;

    return 0;
}
