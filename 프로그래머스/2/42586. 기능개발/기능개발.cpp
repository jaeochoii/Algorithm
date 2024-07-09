#include <string>
#include <vector>
#include <cmath>

using namespace std;

vector<int> solution(vector<int> progresses, vector<int> speeds) {
    vector<int> answer;
    int n = progresses.size();
    vector<int> days_left(n);
    
    for(int i = 0; i < n; i += 1) {
        days_left[i] = ceil((100.0 - progresses[i]) / speeds[i]);
    }
    
    int count = 0;
    int max_day = days_left[0];
    
    for(int i = 0; i < n; i += 1) {
        if(days_left[i] <= max_day) count += 1;
        else {
            answer.push_back(count);
            count = 1;
            max_day = days_left[i];
        }
    }
    
    answer.push_back(count);
    return answer;
}