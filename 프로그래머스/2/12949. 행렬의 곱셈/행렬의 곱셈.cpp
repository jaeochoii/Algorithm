#include <string>
#include <vector>

using namespace std;

vector<vector<int>> solution(vector<vector<int>> arr1, vector<vector<int>> arr2) {
    vector<vector<int>> answer;
    answer.assign(arr1.size(), vector<int>(arr2[1].size(), 0));
    
    for(int i = 0; i < arr1.size(); i += 1) {
        for(int j = 0; j < arr2[1].size(); j += 1) {
            for(int k = 0; k < arr2.size(); k += 1) {
                answer[i][j] += arr1[i][k] * arr2[k][j];
            }
        }
    }
    
    return answer;
}