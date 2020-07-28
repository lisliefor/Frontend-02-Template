// 03节练习：在一个字符串中，找到字符'a'
function hasLetterA(str) {
  return str.indexOf("a") > -1;
}
hasLetterA("I am a robot.");

// 04节练习：不准使用正则表达式，纯粹用 JavaScript 的逻辑实现：在一个字符串中，找到字符“ab”
function findLetterAB(str) {
  for (let i = 0; i < str.length; i++) {
    if (i + 1 < str.length && str.charAt(i) == "a" && str.charAt(i + 1) == "b")
      return true;
  }
  return false;
}
hasLetterAB("I fkal;ab.");

// 05节练习：不准使用正则表达式，纯粹用 JavaScript 的逻辑实现：在一个字符串中，找到字符“abcdef”
function findLetterABCDEF(str) {
  for (let i = 0; i < str.length - 5; i++) {
    if (
      str.charAt(i) == "a" &&
      str.charAt(i + 1) == "b" &&
      str.charAt(i + 2) == "c" &&
      str.charAt(i + 3) == "d" &&
      str.charAt(i + 4) == "e" &&
      str.charAt(i + 5) == "f"
    )
      return true;
  }
  return false;
}
findLetterABCDEF("I like abcdef");

// 07节练习-1：用状态机实现：字符串“abcabx”的解析
function start (char) {
    if (char === 'a') return foundA;
    else return start;
}

function end (char) {
    return end;
}

function foundA (char) {
    if (char === 'b') return foundB;
    else return start(char);
}

function foundB (char) {
    if (char === 'c') return foundC;
    else return start(char);
}

function foundC (char) {
    if (char === 'a') return foundA2;
    else return start(char);
}

function foundA2 (char) {
    if (char === 'b') return foundB2;
    else return start(char);
}

function foundB2 (char) {
    if (char === 'x') return end;
    else return foundB(char);
}

function match(string) {
    let current = start;
    for (let s of string) {
        current = current(s);
    }
    return current ===  end;
}
console.log(match('abdabcabx'));

// 07节练习-2：作业：使用状态机完成”abababx”的处理。
function start (c) {
    if (c === 'a') return foundA;
    else return start(c);
}

function end (c) {
    return end;
}

function foundA (c) {
    if (c === 'b') return foundB;
    else return start(c);
}

function foundB (c) {
    if (c === 'a') return foundA2;
    else return start(c);
}

function foundA2 (c) {
    if (c === 'b') return foundB2;
    else return start(c);
}

function foundB2 (c) {
    if (c === 'a') return foundA3;
    else return start(c);
}

function foundA3 (c) {
    if (c === 'b') return foundB3;
    else return start(c);
}

function foundB3 (c) {
    if (c === 'x') return end;
    else return foundB2(c);
}

function match(string) {
    let current = start;
    for (let s of string) {
        current = current(s);
    }
    return current ===  end;
}
console.log(match('abababx'));