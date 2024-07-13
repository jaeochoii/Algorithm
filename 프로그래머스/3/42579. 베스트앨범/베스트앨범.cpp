#include <string>
#include <vector>
#include <algorithm>
#include <unordered_map>

using namespace std;

bool compareGenre(const pair<string, int> &a, const pair<string, int> &b) {
    return a.second > b.second;
}

bool compareSong(const pair<int, int> &a, const pair<int, int> &b) {
    if(a.second == b.second) return a.first < b.first;
    return a.second > b.second;
}

vector<int> solution(vector<string> genres, vector<int> plays) {
    vector<int> answer;
    unordered_map<string, vector<pair<int, int>>> genres_dict;
    unordered_map<string, int> play_dict;
    
    for(int i = 0; i < genres.size(); i += 1) {
        genres_dict[genres[i]].push_back({i, plays[i]});
        play_dict[genres[i]] += plays[i];
    }
    
    vector<pair<string, int>> sorted_genres(play_dict.begin(), play_dict.end());
    sort(sorted_genres.begin(), sorted_genres.end(), compareGenre);
    
    for(auto &genre: sorted_genres) {
        auto &songs = genres_dict[genre.first];
        sort(songs.begin(), songs.end(), compareSong);
        
        for(int i = 0; i < min(2, (int)songs.size()); i += 1) {
            answer.push_back(songs[i].first);
        }
    }
    return answer;
}