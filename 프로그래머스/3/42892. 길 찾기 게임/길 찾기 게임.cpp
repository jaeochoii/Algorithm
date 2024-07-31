#include <vector>
#include <algorithm>

using namespace std;

struct Node {
    int id, x, y;
    Node* left;
    Node* right;
};

bool compare(Node& a, Node& b) {
    if(a.y == b.y) return a.x < b.x;
    
    return a.y > b.y;
}

void addNode(Node* parent, Node* child) {
    if(child->x < parent->x) {
        if(parent->left == NULL) {
            parent->left = child;
        } else {
            addNode(parent->left, child);
        }
    }
    else {
        if(parent->right == NULL) {
            parent->right = child;
        } else {
            addNode(parent->right, child);
        }
    }
}

void preOrder(vector<int>& ans, Node* node) {
    if(node == NULL) return;
    
    ans.push_back(node->id);
    preOrder(ans, node->left);
    preOrder(ans, node->right);
}

void postOrder(vector<int>& ans, Node* node) {
    if(node == NULL) return;
    
    postOrder(ans, node->left);
    postOrder(ans, node->right);
    ans.push_back(node->id);
}

vector<vector<int>> solution(vector<vector<int>> nodeinfo) {
    int size = nodeinfo.size();
    
    vector<Node> nodes;
    
    for(int i = 0; i < size; i += 1) {
        nodes.push_back({i+1, nodeinfo[i][0], nodeinfo[i][1]});
    }
    
    sort(nodes.begin(), nodes.end(), compare);
    
    Node* root = &nodes[0];
    
    for(int i = 1; i < size; i += 1) {
        addNode(root, &nodes[i]);
    }
    
    vector<vector<int>> answer = {{}, {}};
    preOrder(answer[0], root);
    postOrder(answer[1], root);
    return answer;
}