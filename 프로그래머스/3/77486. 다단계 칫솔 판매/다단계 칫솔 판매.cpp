#include <string>
#include <vector>
#include <unordered_map>

using namespace std;

vector<int> solution(vector<string> enroll, vector<string> referral, vector<string> seller, vector<int> amount) {
    
    unordered_map<string, string> each_parent;
    
    for(int i = 0; i < enroll.size(); i += 1) {
        each_parent[enroll[i]] = referral[i];
    }
    
    unordered_map<string, int> total;
    
    for(int i = 0; i < enroll.size(); i += 1) {
        total[enroll[i]] = 0;
    }
    
    for(int i = 0; i < seller.size(); i += 1) {
        int money = amount[i] * 100;
        string name = seller[i];
        
        while(money > 0 && name != "-") {
            int distribute_money = money / 10;
            total[name] += money - distribute_money;
            
            if(each_parent.find(name) != each_parent.end()) {
                name = each_parent[name];
            }
            else break;
            
            money = distribute_money;
        }
    }
    
    vector<int> answer;
    
    for(int i = 0; i < enroll.size(); i += 1) {
        answer.push_back(total[enroll[i]]);
    }
    
    return answer;
}