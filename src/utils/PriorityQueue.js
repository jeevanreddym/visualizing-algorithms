

function MaxHeap() {
    this.heap = [];
}

const swap = (fromIndex, toIndex) => {
    const tmp = this.heap[fromIndex];
    this.heap[fromIndex] = this.heap[toIndex];
    this.heap[toIndex] = tmp;
};

MaxHeap.prototype.swap = swap;

const peek = () => {
    // the root is always the highest priority item.
    return this.heap[0];
};

MaxHeap.prototype.peek = peek;

MaxHeap.prototype.insert = (element) => {
    // push element to the end of the heap
    this.heap.push(element);

    // the index of the element we have just pushed
    let index = this.heap.length - 1;

    // if the element is greater than its parent:
    // swap element with its parent
    while (index !== 0 && this.heap[index] > this.heap[parent(index)]) {
        this.swap(index, parent(index));
        index = parent(index);
    }
};

MaxHeap.prototype.extractMax = () => {
    // remove the first element from the heap
    const root = this.heap.shift();

    // put the last element to the front of the heap
    // and remove the last element from the heap as it now
    // sits at the front of the heap
    this.heap.unshift(this.heap[this.heap.length - 1]);
    this.heap.pop();

    // correctly re-position heap
    this.heapify(0);

    return root;
};

MaxHeap.prototype.heapify = (index) => {
    let left = leftChild(index);
    let right = rightChild(index);
    let smallest = index;

    // if the left child is bigger than the node we are looking at
    if (left < this.heap.length && this.heap[smallest] < this.heap[left]) {
        smallest = left;
    }

    // if the right child is bigger than the node we are looking at
    if (right < this.heap.length && this.heap[smallest] < this.heap[right]) {
        smallest = right;
    }

    // if the value of smallest has changed, then some swapping needs to be done
    // and this method needs to be called again with the swapped element
    if (smallest != index) {
        this.swap(smallest, index);
        this.heapify(smallest);
    }
};

const leftChild = (index) => index * 2 + 1;
const rightChild = (index) => index * 2 + 2;
const parent = (index) => Math.floor((index - 1) / 2);







class MinHeap {

    constructor () {
        /* Initialing the array heap and adding a dummy element at index 0 */
        this.heap = [null];
    }

    getMin () {
        /* Accessing the min element at index 1 in the heap array */
        return this.heap[1];
    }

    insert (node) {

        /* Inserting the new node at the end of the heap array */
        this.heap.push(node);

        /* Finding the correct position for the new node */

        if (this.heap.length > 1) {
            let current = this.heap.length - 1;

            /* Traversing up the parent node until the current node (current) is greater than the parent (current/2)*/
            while (current > 1 && this.heap[Math.floor(current/2)] > this.heap[current]) {

                /* Swapping the two nodes by using the ES6 destructuring syntax*/
                [this.heap[Math.floor(current/2)], this.heap[current]] = [this.heap[current], this.heap[Math.floor(current/2)]];
                current = Math.floor(current/2);
            }
        }
    }

    remove() {
        /* Smallest element is at the index 1 in the heap array */
        let smallest = this.heap[1];

        /* When there are more than two elements in the array, we put the right most element at the first position and start comparing nodes with the child nodes */
        if (this.heap.length > 2) {
            this.heap[1] = this.heap[this.heap.length-1];
            this.heap.splice(this.heap.length - 1);

            if (this.heap.length === 3) {
                if (this.heap[1] > this.heap[2]) {
                    [this.heap[1], this.heap[2]] = [this.heap[2], this.heap[1]]
                }
                return smallest
            }

            let current = 1;
            let leftChildIndex = current * 2;
            let rightChildIndex = current * 2 + 1;

            while (this.heap[leftChildIndex] &&
            this.heap[rightChildIndex] &&
            (this.heap[current] > this.heap[leftChildIndex] ||
                this.heap[current] > this.heap[rightChildIndex])) {
                if (this.heap[leftChildIndex] < this.heap[rightChildIndex]) {
                    [this.heap[current], this.heap[leftChildIndex]] = [this.heap[leftChildIndex], this.heap[current]]
                    current = leftChildIndex
                } else {
                    [this.heap[current], this.heap[rightChildIndex]] = [this.heap[rightChildIndex], this.heap[current]]
                    current = rightChildIndex
                }

                leftChildIndex = current * 2;
                rightChildIndex = current * 2 + 1;
            }
        }

        /* If there are only two elements in the array, we directly splice out the first element */

        else if (this.heap.length === 2) {
            this.heap.splice(1, 1);
        } else {
            return null;
        }

        return smallest;
    }

    remove1(row, col) {
        let item = null;
        for (item of this.heap) {
            if (item && item.row === row && item.col === col) {
                break;
            }
        }
        if (item) {

        }
    }

    isEmpty = () => {
        return this.heap.length <= 1;
    };

}
export default MinHeap;
