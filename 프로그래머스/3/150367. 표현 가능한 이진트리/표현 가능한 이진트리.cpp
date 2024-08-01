#include <iostream>
#include <string>
#include <vector>
 
using namespace std;
 
string hexToDec(long long num);
string changeToFullDec(string str);
bool isAllZero(string str);
bool canDraw(string str);
 
vector<int> solution(vector<long long> numbers) {
    vector<int> answer;
    for (long long& num : numbers) {
        string dec = hexToDec(num);
        string fullDec = changeToFullDec(dec);
        answer.push_back(canDraw(fullDec));
    }
    return answer;
}
 
string hexToDec(long long num) {
    string ret = "";
    while (num) {
        ret = to_string(num % 2) + ret;
        num /= 2;
    }
    return ret;
}
 
string changeToFullDec(string str) {
    string ret = str;
    int idx = 2;
    while (true) {
        if (str.length() <= idx - 1) break;
        idx *= 2;
    }
    for (int i = 0; i < idx - 1 - str.length(); i++) ret = "0" + ret;
    return ret;
}
 
bool canDraw(string str) {
    if (str.length() == 1 || isAllZero(str)) return true;
 
    int midIdx = str.length() / 2;
    string left = str.substr(0, midIdx);
    string right = str.substr(midIdx + 1);
 
    if (str[midIdx] == '1' && canDraw(left) && canDraw(right)) return true;
    else return false;
}
 
bool isAllZero(string str) {
    for (char c : str) {
        if (c != '0') return false;
    }
    return true;
}