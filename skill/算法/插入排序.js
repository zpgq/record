let arr = [1, 1, 10, 10, 5]

function insertSort(arr) {
    let len = arr.length;
    let preIndex, current;
    for (let i = 0; i < len; i ++) {
        preIndex = i - 1;
        current = arr[i];
        while(preIndex >= 0 && arr[preIndex] > current) {
            arr[preIndex + 1] = arr[preIndex];
            preIndex --;
        }
        arr[preIndex + 1] = current;
    }
    return arr
}

const result = insertSort(arr)
console.log('result', result)

