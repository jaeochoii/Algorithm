#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <cmath>
#include <stack>

using namespace std;

long long N;
string input;
stack<int> st1;
stack<int> st2;
vector<int> answer;


void Input() {
    cin >> N;
    cin.ignore();
    getline(cin, input);

    stringstream ss(input);
    int num;

    while(ss >> num) {
        st1.push(num);
        if(ss.peek() == ' ') {
            ss.ignore();
        }
    }
}

int main() {

    Input();

    while(st1.size()) {
        int top_number = st1.top();

        while(st2.size()) {
            if(top_number < st2.top()) {
                answer.push_back(st2.top());
                st2.push(top_number);
                st1.pop();
                break;
            }
            else {
                st2.pop();
            }
        }

        if(st2.size() == 0) {
            answer.push_back(-1);
            st2.push(top_number);
            st1.pop();
        }
    }

    for(int i = N-1; i >= 0; i -= 1) {
        cout << answer[i] << " ";
    }

    cout << endl;

    return 0;
}
