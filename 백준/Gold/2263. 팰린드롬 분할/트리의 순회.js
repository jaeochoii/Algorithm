let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = Number(input.shift());
const inTree = input.shift().split(' ').map(Number);
const postTree = input.shift().split(' ').map(Number);

class BinarySearchTree {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }

    insert(value) {
        if(value < this.value) {
            if(this.left === null) this.left = new BinarySearchTree(value);
            else this.left.insert(value);
        }
        else if(value > this.value) {
            if(this.right === null) this.right = new BinarySearchTree(value);
            else this.right.insert(value);
        }
    }

    preOrder(callback) {
        callback(this.value);
        if(this.left) this.left.preOrder(callback);
        if(this.right) this.right.preOrder(callback);
    }

    inOrder(callback) {
        if(this.left) this.left.inOrder(callback);
        callback(this.value);
        if(this.right) this.right.inOrder(callback);
    }

    postOrder(callback) {
        if(this.left) this.left.postOrder(callback);
        if(this.right) this.right.postOrder(callback);
        callback(this.value);
    }

    static buildTree(inOrder, postOrder) {
        if (inOrder.length === 0 || postOrder.length === 0 || inOrder.length !== postOrder.length) {
            return null;
        }

        const buildTreeHelper = (inStart, inEnd, postStart, postEnd) => {
            if (inStart > inEnd || postStart > postEnd) return null;
            const rootValue = postOrder[postEnd];
            const root = new BinarySearchTree(rootValue);
            let index = inOrder.indexOf(rootValue);
            root.left = buildTreeHelper(inStart, index - 1, postStart, postStart + index - inStart - 1);
            root.right = buildTreeHelper(index + 1, inEnd, postStart + index - inStart, postEnd - 1);
            return root;
        };

        return buildTreeHelper(0, inOrder.length - 1, 0, postOrder.length - 1);
    }
}

const root = BinarySearchTree.buildTree(inTree, postTree);
const preOrder = [];

root.preOrder((value) => preOrder.push(value));
console.log(preOrder.join(' '));
