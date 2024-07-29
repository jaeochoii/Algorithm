#include <vector>
#include <unordered_set>

using namespace std;

unordered_set<int> set;

int solution(vector<int> nums) {
    int standard = nums.size() / 2;
    
    for(int number: nums) {
        set.insert(number);
    }
    
    int set_size = set.size();
    
    if(set_size >= standard) return standard;
    else return set_size;
}