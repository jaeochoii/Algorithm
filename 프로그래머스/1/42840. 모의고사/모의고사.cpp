#include <string>
#include <vector>
#include <algorithm>

using namespace std;

vector<int> solution(vector<int> answers) {
    
    // 패턴 초기화 하기
    vector<int> user1 = {1, 2, 3, 4, 5};
    vector<int> user2 = {2, 1, 2, 3, 2, 4, 2, 5};
    vector<int> user3 = {3, 3, 1, 1, 2, 2, 4, 4, 5, 5};
    
    vector<int> points(3);
    
    for(int i = 0; i < answers.size(); i += 1) {
        int correct = answers[i];
        
        if(correct == user1[i % user1.size()]) points[0] += 1;
        if(correct == user2[i % user2.size()]) points[1] += 1;
        if(correct == user3[i % user3.size()]) points[2] += 1;
    }
    
    // 점수 값 비교하기
    int maxNumber = *max_element(points.begin(), points.end());
    vector<int> answer;
    
    for(int i = 0; i < 3; i += 1) {
        if(points[i] == maxNumber) answer.push_back(i + 1);
    }
    
    return answer;
}