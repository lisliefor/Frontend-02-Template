语法树和运算符的优先级关系

1. Member优先级最高
a.b   （取出来的是一个引用，不是值，内存地址。加减法就是解引用，如果是delete就是直接操作引用。）
a[b]
foo`string`
super.b
super[`b`]
new.target
new Foo()

2. New表达式
new a()()
new new a()

3. Reference

Object                                       delete
Key						  assign

4. Call
foo()
super()
foo()['b']
foo().b
foo()`abc`

new a()['b']


5. 左手、右手运算
Update expression，是right expression
++a++   ++(a++)

6. Unary单目运算
delete a.b
void foo()
typeof a
+a
-a
!a
await a

7. Exponental
**

3**2**3 = 3**(2**3)

8. Equality
==
!=
===
!==

9. Bitwise
位运算
&^|

10. 逻辑运算 && || （有短路原则，&&运算的前面部分是false，或者||运算的前面部分是true）

11. Conditional条件运算
? :

拆箱Unboxing：把一个Object转为一个基本类型。
Symbol.toPremitive > toPremitive和 toString和valueOf

装箱Boxing：把基本类型转为Object
new Number(1)
new String('a')
new Boolean(true)
new Object(Symbol('a'))


Completion Recond
用户存储语句的执行结果。
分为三个部分：
[[type]]：normal, break, continue, return or throw
[[value]]：基本类型
[[target]]：label

简单语句
Expression statement
Empty statement，例如：一个;
Debugger statement，用于调试
Throw statement
Continue statement
Break statement
Return statement

复合语句
Block statement
If statment
Switch statement
Iteration statement 循环语句：do while, for, for of, for in, while
With statement
Labelled statement
Try statement


声明
Function Declaration
function
function *
async function
async function *
函数声明提前（通过预处理）。

var a = function() {}
var声明只是函数名提前，函数体没有提前。
a();
var a = function() {}
会报错。 


class
const
let
声明，不会有任何提前。



执行结果为：2
a=1，被里面的var a预处理给占据了。
所有生命都有预处理（pre-process）

作用域
作用域链是es3提出的概念

React的Hooks


宏任务：
传递给JS引擎的任务，最大粒度任务

微任务（Promise）：
由Promise产生的任务

事件循环

如果使用js引擎，event loop，来自nodejs概念。




JS函数调用


执行上线文栈 Execution Context Stack


执行上下文


VariableEnvironment
处理历史遗留的包袱，仅用于处理var声明。

LexicalEnvironment
2018ES之后，所有执行的东西都保存在里面，包括this，new Object

Environment Record —— 包含五个成员

Object Environment Records —— with用的
Gloabal Environment Records —— 只有一个全局的

每个函数会生成一个闭包：

foo2不管怎么被export传递到哪里去，会把y带走，这就是闭包。


Realm
在JS引擎中，所有的内置对象会放到Realm实例中。
