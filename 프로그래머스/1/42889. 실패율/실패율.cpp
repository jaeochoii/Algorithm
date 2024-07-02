#include <vector>
#include <algorithm>

using namespace std;

bool compare(pair<int, float>& a, pair<int, float>& b) {
    if(a.second == b.second) {
        return a.first < b.first;
    }
    return a.second > b.second;
}

vector<int> solution(int N, vector<int> stages) {
    vector<int> answer;
    vector<float> challengers(N+2, 0.0); // 도전자 수
    vector<float> fail(N+2, 0.0); // 실패 수
    
    for(int i = 0; i < stages.size(); i += 1) {
        for(int j = 1; j <= stages[i]; j += 1) {
            challengers[j] += 1;
        }
        fail[stages[i]] += 1;
    }
    
    // 실패율 계산
    vector<pair<int, float>> failRatio(N);
    
    for(int i = 0; i < N; i += 1) {
        failRatio[i].first = i+1;
        
        if(challengers[i+1] == 0) {
            failRatio[i].second = 0;
        }
        else {
            failRatio[i].second = fail[i+1] / challengers[i+1];
        }
    }
    
    sort(failRatio.begin(), failRatio.end(), compare);
    
    for(int i = 0; i < N; i += 1) {
        answer.push_back(failRatio[i].first);
    }
    
    return answer;
}