
// 状态机实现给定的pattern
const ptn = 'eason';
let currentIdx = 0;

function start(char) {
    if (char === ptn.charAt(currentIdx)) {
        currentIdx++;
        if (currentIdx === ptn.length) return end;
        return findNext;
    } else return start;
}

function findNext(char) {
    if (char === ptn.charAt(currentIdx)) {
        currentIdx++;
        if (currentIdx === ptn.length) return end;
        return findNext;
    } else return start;
}

function end (char) {
    return end;
}

function match(string) {
    let current = start;
    for (let s of string) {
        current = current(s);
    }
    return current ===  end;
}
console.log(match('jlfdlsa eas easo fdaffeasonlfs fdsla'));
