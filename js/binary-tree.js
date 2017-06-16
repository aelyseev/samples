class BinaryTree { }

class EmptyBinaryTree extends BinaryTree {
    constructor() {
        super();
        Object.freeze(this);
    }
    isEmpty() {
        return true;
    }
    depth() {
        return 0;
    }
    count() {
        return 0;
    }

    inorder() {}
    preorder() {}
    postorder() {}

    contains() {
        return false;
    }

    insert(x) {
        return new BinaryTreeNode(x, this, this);
    }

    append(tree) {
        return tree;
    }

    remove() {
        return this;
    }
}

class BinaryTreeNode extends BinaryTree {
    constructor(value, left = new EmptyBinaryTree(), right = new EmptyBinaryTree()) {
        super();

        // invariants
        if (!(left instanceof BinaryTree)) {
            throw Error(`Wrong parameters: left is not BinaryTree. ${left} given`);
        }
        if (!(right instanceof BinaryTree)) {
            throw Error(`Wrong parameters: right is not BinaryTree. ${right} given`);
        }

        this.value = value;
        this.left = left;
        this.right = right;
        Object.freeze(this);
    }

    isEmpty() {
        return false;
    }

    depth() {
        return 1 + Math.max(this.left.depth(), this.right.depth());
    }


    count() {
        return 1 + this.left.count() + this.right.count();
    }

    inorder(fn) {
        this.left.inorder(fn);
        fn(this.value);
        this.right.inorder(fn);
    }

    preorder(fn) {
        fn(this.value);
        this.left.preorder(fn);
        this.right.preorder(fn);
    }

    postorder(fn) {
        this.left.postorder(fn);
        this.right.postorder(fn);
        fn(this.value);
    }

    contains(x) {
        if (x === this.value) {
            return true;
        }

        return x < this.value ? this.left.contains(x) : this.right.contains(x);
    }

    insert(x) {
        if (x <= this.value) {
            return new BinaryTreeNode(this.value, this.left.insert(x), this.right);
        }
        return new BinaryTreeNode(this.value, this.left, this.right.insert(x));
    }

    append(tree) {
        if (tree.value <= this.value) {
            return new BinaryTreeNode(this.value, (this.left.isEmpty()) ? tree : this.left.append(tree), this.right);
        }
        return new BinaryTreeNode(this.value, this.left, (this.right.isEmpty()) ? tree : this.right.append(tree));
    }

    remove(x) {
        if (x === this.value) {
            return this.left.append(this.right);
        } else if (x < this.value) {
            const left = this.left.remove(x);
            return left === this.left ? this : new BinaryTreeNode(this.value, left, this.right);
        }
        const right = this.right.remove(x);
        return right === this.right ? this : new BinaryTreeNode(this.value, this.left, right);
    }
}

var mt, ns, r, t1, t2, t3, t4, t5;
mt = new EmptyBinaryTree;
ns = [8, 4, 12, 14, 10, 15, 13, 11, 9, 2, 1, 3, 6, 5, 7];
t1 = ns.reduce((function(t, n) {
    return t.insert(n);
}), mt);
t2 = t1.insert(0);
r = 1 + Math.floor(15 * Math.random());
t3 = t1.remove(r);
t4 = t1.remove(6);
t5 = t1.insert(6);

console.log(t5.remove(4) === t5);
