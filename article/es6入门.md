### 前言
> javascript是世界上最好的语言

##### ES6在目前的很多环境中都不支持，我们需要使用Babel(JS编译器)将ES6编译为ES5  [Babel 入门教程](http://www.ruanyifeng.com/blog/2016/01/babel.html)

#### let和const命令
- let用来声明变量,用法类似var,但是声明的变量仅在let命令所在的代码块中有效

```
{
  let a = 10;
  var b = 1;
}
```
- 不存在变量提升

```
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;
```
- 不允许重复声明

```
// 报错
function () {
  let a = 10;
  var a = 1;
}

// 报错
function () {
  let a = 10;
  let a = 1;
}
```
- let声明的变量仅在块级作用域内有效

```
var a = [];
for (let i = 0; i < 10; i++) {
    a[i] = function () {
        console.log(i);
    };
}
a[6](); //6

//上边这段代码转码后

var a = [];

var _loop = function _loop(_i) {
    a[_i] = function () {
        console.log(_i);
    };
};

for (var _i = 0; _i < 10; _i++) {
    _loop(_i);
}
a[6](); //6

```
- const 声明一个只读的常量,一旦声明，常量的值就不能改变

```
const PI = 3.1415;
PI // 3.1415

PI = 3;
// TypeError: Assignment to constant variable.
```
详细的教程请看[let和const命令](http://es6.ruanyifeng.com/#docs/let)
#### 变量的解构赋值
- 数组的解构赋值
ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。

```
let [a, b, c] = [1, 2, 3];
//转码后
var a = 1,
    b = 2,
    c = 3;
```
不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组。

```
let [x, y] = [1, 2, 3];
x // 1
y // 2

let [a, [b], d] = [1, [2, 3], 4];
a // 1
b // 2
d // 4

//转码后的结果
var _ref = [1, 2, 3],
    x = _ref[0],
    y = _ref[1];

x; // 1
y; // 2

var aa = 1,
    _ref2 = [2, 3],
    bb = _ref2[0],
    d = 4;

aa; // 1
bb; // 2
d; // 4
```
- 对象的解构赋值

```
let { foo, bar } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"
//转码的结果
var _foo$bar = { foo: "aaa", bar: "bbb" },
    foo = _foo$bar.foo,
    bar = _foo$bar.bar;

foo; // "aaa"
bar; // "bbb"
```
对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

如果变量名与属性名不一致，必须写成下面这样

```
var { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"
```
对象的解构赋值是下面形式的简写


```
let { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" };
```
对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。

```
//上边那个例子
var { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"
//babel转码后
var _foo$bar2 = { foo: 'aaa', bar: 'bbb' },
    baz = _foo$bar2.foo;
baz; // "aaa"

```

对象的解构也可以指定默认值,默认值生效的条件是，对象的属性值严格等于undefined

```
var {x = 3} = {};
x // 3

var {x, y = 5} = {x: 1};
x // 1
y // 5

var {x:y = 3} = {};
y // 3

var {x:y = 3} = {x: 5};
y // 5

// 转码后的结果
var _ref3 = {},
    _ref3$x = _ref3.x,
    x = _ref3$x === undefined ? 3 : _ref3$x;

x; // 3

var _x = { x: 1 },
    x = _x.x,
    _x$y = _x.y,
    y = _x$y === undefined ? 5 : _x$y;

x; // 1
y; // 5

var _ref4 = {},
    _ref4$x = _ref4.x,
    y = _ref4$x === undefined ? 3 : _ref4$x;

y; // 3

var _x2 = { x: 5 },
    _x2$x = _x2.x,
    y = _x2$x === undefined ? 3 : _x2$x;

y; // 5
```
- 字符串的解构赋值
字符串也可以解构赋值,此时字符串被转换成了一个类似数组的对象

```
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
```
- 函数参数的解构赋值

```
function add([x, y]){
  return x + y;
}
add([1, 2]); // 3

[[1, 2], [3, 4]].map(([a, b]) => a + b);
// [ 3, 7 ]
```
详细的教程请看[变量的解构赋值](http://es6.ruanyifeng.com/#docs/destructuring)
#### 字符串的扩展
- 确定一个字符串是否包含在另一个字符串的方法
includes()：返回布尔值，表示是否找到了参数字符串。
startsWith()：返回布尔值，表示参数字符串是否在源字符串的头部。
endsWith()：返回布尔值，表示参数字符串是否在源字符串的尾部。
这三个方法都支持第二个参数，表示开始搜索的位置

```
var s = 'Hello world!';
s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true

s.startsWith('world', 6) // true
s.endsWith('Hello', 5) // true
s.includes('Hello', 6) // false
```
使用第二个参数n时，endsWith的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束。
- repeat 返回一个新字符串，表示将原字符串重复n次。

```
'x'.repeat(3) // "xxx"
'hello'.repeat(2) // "hellohello"
'na'.repeat(0) // ""
```
- 模版字符串 用反引号（`）标识
模板字符串中嵌入变量，需要将变量名写在${}之中；
大括号内部可以放入任意的JavaScript表达式，可以进行运算，以及引用对象属性；
模板字符串之中还能调用函数。;

```
var x = 1;
var y = 2;

`${x} + ${y} = ${x + y}`
// "1 + 2 = 3"

`${x} + ${y * 2} = ${x + y * 2}`
// "1 + 4 = 5"

var obj = {x: 1, y: 2};
`${obj.x + obj.y}`
// 3

function fn() {
  return "Hello World";
}
`foo ${fn()} bar`
// foo Hello World bar

//转码后
function fn() {
    return "Hello World";
}
"foo " + fn() + " bar";
// foo Hello World bar
```
详细的教程请看[字符串的扩展](http://es6.ruanyifeng.com/#docs/string)
#### 数组的扩展
- Array.from()
用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括ES6新增的数据结构Set和Map）。

```
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']

//转换 NodeList对象
let ps = document.querySelectorAll('p');
Array.from(ps)

// 转换 arguments对象
function foo() {
  var args = Array.from(arguments);
  // ...
}
```
Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。

```
Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);

Array.from([1, 2, 3], (x) => x * x)
// [1, 4, 9]
```
Array.from方法支持类似数组的对象。所谓类似数组的对象，本质特征只有一点，即必须有length属性。因此，任何有length属性的对象，都可以通过Array.from方法转为数组

```
Array.from({ length: 3 });
// [ undefined, undefined, undefined ]
```
- Array.of() 用于将一组值，转换为数组

```
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1
```
Array.of总是返回参数值组成的数组。如果没有参数，就返回一个空数组。

```
Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]

Array.of() // []
Array.of(undefined) // [undefined]
Array.of(1) // [1]
Array.of(1, 2) // [1, 2]
```
- find()和findIndex()方法
find方法，用于找出第一个符合条件的数组成员，参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined

```
[1, 5, 10, 15].find(function(value, index, arr) {
  return value > 9;
}) // 10
```
数组实例的findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。
```
[1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value > 9;
}) // 2
```
这两个方法都可以接受第二个参数，用来绑定回调函数的this对象
- includes()
表示某个数组是否包含给定的值，与字符串的includes方法类似,该方法属于ES7，但Babel转码器已经支持。

```
[1, 2, 3].includes(2);     // true
[1, 2, 3].includes(4);     // false
[1, 2, NaN].includes(NaN); // true
```
详细的教程请看[数组的扩展](http://es6.ruanyifeng.com/#docs/array)
#### 函数的扩展




详细的教程请看[函数的扩展](http://es6.ruanyifeng.com/#docs/function)