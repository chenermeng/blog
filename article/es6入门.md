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

```
var s = 'Hello world!';
s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true
```
