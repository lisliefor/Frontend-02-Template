// 2. 编写带括号的四则运算产生式
/*
<MultiplecativeExpression>::=<Number>|
  <MultiplecativeExpression>"*"<Number>|
  <MultiplecativeExpression>"/"<Number>
  
<AddtiveExpression>::=<MultiplecativeExpression>|
  <AddtiveExpression>"+"<MultiplecativeExpression>|
  <AddtiveExpression>"-"<MultiplecativeExpression>
  
<BracketingExpression>::=(
  <MultiplecativeExpression>|
    <AddtiveExpression>"+"<MultiplecativeExpression>|
    <AddtiveExpression>"-"<MultiplecativeExpression>
)|<MultiplecativeExpression>|
  <AddtiveExpression>"+"<MultiplecativeExpression>|
  <AddtiveExpression>"-"<MultiplecativeExpression>
*/

// 4. 尽可能寻找你知道的计算机语言，尝试把它们分类
/** 按用途 */
// 数据描述语言
var languages = ['JSON', 'HTML', 'XAML', 'SQL', 'CSS', 'XML', 'SGML'];

// 编程语言
var languages = ['C', 'C++', 'Java', 'C#', 'Python', 'Ruby', 'Perl', 
    'Lisp', 'T-SQL', 'Clojure', 'Haskell', 'Javascript', 'Pascal',
    'Delphi', 'PHP', 'ASP', 'Basic', 'Matlab', 'Visual Basic', 'Bash',
    'Batch', 'VC', 'JSP', 'FoxPro'];

/** 按表达方式 */
// 声明式语言
var lauguages = ['JSON', 'HTML', 'XAML', 'SQL', 'CSS', 'Lisp',
    'Clojure', 'Haskell', 'XQuery', 'MXML', 'XSLT'];

// 命令式语言
var languages = ['C', 'C++', 'Java', 'C#', 'Python', 'Ruby',
    'Perl', 'Javscript', 'Fortran', 'ALGOL', 'COBOL', 'Ada',
    'Pascal', 'Smalltalk', 'Fortran', 'Basic', 'xBase'];

// 8. 写一段 JS 的函数，把一个 string 它代表的字节给它转换出来，用 UTF8 对 string 进行遍码。
const binary = (num, keepLength) => {
    const resArry = [];
    const xresArry = [];
    i = 0;
    for (; num > 0;) {
        resArry.push(num % 2);
        num = parseInt(num / 2);
        i++;
    }
    for (j = i - 1; j >= 0; j--) {
        xresArry.push(resArry[j]);
    }
    if (keepLength) {
        for (r = xresArry.length; r < keepLength; r++) {
            xresArry.unshift("0");
        }
    }
    return xresArry.join().replace(/,/g, "");
}
​
const showUTF8Bytes = (str) => {
    for (let i = 0; i < str.length; ++i) {
        const char = str.charCodeAt(i);
        const bytes = [];
        if (char >= 0x10000 && char <= 0x10ffff) {
            bytes.push((char >> 18) | 0xf0);
            bytes.push(((char >> 12) & 0x3f) | 0x80);
            bytes.push(((char >> 6) & 0x3f) | 0x80);
            bytes.push((char & 0x3f) | 0x80);
        } else if (char >= 0x800 && char <= 0xffff) {
            bytes.push((char >> 12) | 0xe0);
            bytes.push(((char >> 6) & 0x3f) | 0x80);
            bytes.push((char & 0x3f) | 0x80);
        } else if (char >= 0x80 && char <= 0x7ff) {
            bytes.push((char >> 6) | 0xc0);
            bytes.push((char & 0x3f) | 0x80);
        } else {
            bytes.push(char)
        }
        // 输出当前字符对应的UTF8编码
        console.log(`${str[i]}: ${bytes.map(b => (binary(b, 8))).join(' ')}`);
    }
}
console.log(showUTF8Bytes('测试字符串'));

// 10. 用 JavaScript 去设计狗咬人的代码
function Animal(health, madValue, power) {
    this.health = health || 10;
    this.madValue = madValue || 0;
    this.power = power || 10;
}

Animal.prototype.bite = (self, obj) => {
    if (obj && obj.health) {
      // 对象的健康受到的影响，由当前动物的力量所决定（健康值是咬对于对象的影响）
      obj.health -= self.power * 0.1;
      // 每咬一口，疯狂值+1（针对咬对于自身的影响）
      self.madValue += 1;
      if (self.madValue >= 100) {
        self.power = self.power * 2;
        console.log("You bit so much, you have gone stark raving mad.");
      }
      console.log(`After bit, you state is: health-${self.health}, power-${self.power}, mad value-${self.madValue}`);
      console.log(`After bit, you target's state is: health-${obj.health}, power-${obj.power}, mad value-${obj.madValue}`);
    } else {
      console.log('You might bite a lifeless thing.');
    }
  };

function Person (health, madValue, power) {
    this.health = health || 10;
    this.madValue = madValue || 0;
    this.power = power || 8;
}
Person.prototype = Object.create(Animal.prototype);

function Dog (health, madValue, power) {
    this.health = health || 8;
    this.madValue = madValue || 5;
    this.power = power || 10;
}
Dog.prototype = Object.create(Animal.prototype);

var eason = new Person(10, 0, 8);
var huskie = new Dog(10, 6, 12);
huskie.bite(huskie, eason);

// 11.找出 JavaScript 标准里面所有具有特殊行为的对象
/*
特殊行为对象：
Array
Object
Function
String
*/