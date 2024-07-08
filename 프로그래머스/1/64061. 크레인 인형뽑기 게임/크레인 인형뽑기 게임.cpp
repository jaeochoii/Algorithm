#include <string>
#include <vector>
#include <stack>

using namespace std;

int solution(vector<vector<int>> board, vector<int> moves) {
    int answer = 0;
    stack<int> basket;
    
    for(int i = 0; i < moves.size(); i += 1) {
        int location = moves[i] - 1;
        
        for(int j = 0; j < board.size(); j += 1) {
            if(board[j][location] == 0) continue;
            
            else {
                int target = board[j][location];
                
                if(!basket.empty() && target == basket.top()) {
                    answer += 2;
                    basket.pop();
                }
                
                else {
                    basket.push(target);
                }
                
                board[j][location] = 0;
                break;
            }
        }
    }
    
    return answer;
}