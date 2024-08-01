#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <cmath>

using namespace std;

int K;
vector<int> input;
vector<vector<int>> answer;

void Input() {
    cin >> K;
    cin.ignore();

    string line;
    getline(cin, line);
    stringstream ss(line);

    int number;
    while (ss >> number) {
        input.push_back(number);
    }
}

void inOrder(int start, int end, int index, int &currentDepth) {
    if (start > end) {
        return;
    }

    if (index >= answer.size()) {
        return;
    }

    int mid = (start + end) / 2;

    if (currentDepth < answer.size()) {
        answer[currentDepth].push_back(input[mid]);
    }

    currentDepth++;
    inOrder(start, mid - 1, index + 1, currentDepth);
    inOrder(mid + 1, end, index + 1, currentDepth);
    currentDepth--;
}

int main() {
    Input();

    // Calculate the required depth based on input size
    int depth = pow(2, ceil(log2(input.size() + 1))) - 1;
    answer.resize(depth);

    int currentDepth = 0;
    inOrder(0, input.size() - 1, 0, currentDepth);

    for (const vector<int>& v : answer) {
        for (int num : v) {
            cout << num << " ";
        }
        cout << endl;
    }

    return 0;
}
