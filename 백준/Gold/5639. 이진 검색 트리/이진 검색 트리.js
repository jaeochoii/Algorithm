let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trimEnd().split('\n');

let preOrder = [];
input.forEach((value) => preOrder.push(Number(value)));

class BinarySearchTree {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }

    insert(value) {
        if (value < this.value) {
            if (this.left === null) {
                this.left = new BinarySearchTree(value);
            } else {
                this.left.insert(value);
            }

        } else if (value > this.value) {
            if (this.right === null) {
                this.right = new BinarySearchTree(value);
            } else {
                this.right.insert(value);
            }
        }
    }

    preorder(callback) {
        callback(this.value);
        if (this.left) {
            this.left.preorder(callback);
        };
        if (this.right) {
            this.right.preorder(callback);
        };
    }

    inorder(callback) {
        if (this.left) {
            this.left.inorder(callback);
        };
        callback(this.value);
        if (this.right) {
            this.right.inorder(callback);
        };
    }

    postorder(callback) {
        if (this.left) {
            this.left.postorder(callback);
        };
        if (this.right) {
            this.right.postorder(callback);
        };
        callback(this.value);
    }

}

// 입출력
const rootNode = new BinarySearchTree(preOrder.shift());

for(let i = 0; i < preOrder.length; i += 1) {
    rootNode.insert(preOrder[i]);
}

let arr = [];
rootNode.postorder((value) => arr.push(value));
console.log(arr.join('\n'));