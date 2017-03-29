### 前言 
> javascript是世界上最好的语言

本文是个人学习[ECMAScript 6 入门](http://es6.ruanyifeng.com/)的一个记录的笔记，记录其中的一些知识点，想详细了解es6的可以看原文。
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
- 函数参数的默认值
在ES6之前，不能直接为函数的参数指定默认值，只能采用变通的方法。

```
function log(x, y) {
  y = y || 'World';
  console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello World
```
这种写法的缺点在于，如果参数y赋值了，但是对应的布尔值为false，则该赋值不起作用

ES6 允许为函数的参数设置默认值，即直接写在参数定义的后面

```
function log(x, y = 'World') {
  console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello
```
- 与解构赋值默认值结合使用
参数默认值可以与解构赋值的默认值，结合起来使用

```
function foo({x, y = 5}) {
  console.log(x, y);
}

foo({}) // undefined, 5
foo({x: 1}) // 1, 5
foo({x: 1, y: 2}) // 1, 2
foo() // TypeError: Cannot read property 'x' of undefined

//babel转码后
function foo(_ref) {
  var x = _ref.x,
      _ref$y = _ref.y,
      y = _ref$y === undefined ? 5 : _ref$y;

  console.log(x, y);
}

foo({}); // undefined, 5
foo({ x: 1 }); // 1, 5
foo({ x: 1, y: 2 }); // 1, 2
foo(); // TypeError: Cannot read property 'x' of undefined
```
下面两种写法有什么差别？
```
// 写法一
function m1({x = 0, y = 0} = {}) {
  return [x, y];
}

// 写法二
function m2({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}
```
上面两种写法都对函数的参数设定了默认值，区别是写法一函数参数的默认值是空对象，但是设置了对象解构赋值的默认值；写法二函数参数的默认值是一个有具体属性的对象，但是没有设置对象解构赋值的默认值。

来看看转码后的结果就一目了然了
```
// 写法一
function m1() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$x = _ref.x,
      x = _ref$x === undefined ? 0 : _ref$x,
      _ref$y = _ref.y,
      y = _ref$y === undefined ? 0 : _ref$y;

  return [x, y];
}

// 写法二
function m2() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { x: 0, y: 0 },
      x = _ref2.x,
      y = _ref2.y;

  return [x, y];
}
```
- rest参数
形式：...变量名，用于获取函数的多余参数。rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。

```
function add(...values) {
  let sum = 0;
  for (var val of values) {
    sum += val;
  }
  return sum;
}
add(2, 5, 3) // 10
```
注意，rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错
```
// 报错
function f(a, ...b, c) {
  // ...
}
```
- 扩展运算符
扩展运算符（spread）是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。

```
console.log(...[1, 2, 3])
//转码后
var _console;
(_console = console).log.apply(_console, [1, 2, 3]);


function add(x, y) {
  return x + y;
}
var numbers = [4, 38];
add(...numbers) // 42

[...'hello']
// [ "h", "e", "l", "l", "o" ]
```
- 箭头函数
ES6允许使用“箭头”（=>）定义函数。

```
var f = v => v;
//等同于
var f = function f(v) {
  return v;
};
```
如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分

```
var f = () => 5;
// 等同于
var f = function () { return 5 };

var sum = (num1, num2) => num1 + num2;
// 等同于
var sum = function(num1, num2) {
  return num1 + num2;
};
```
如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用return语句返回。

箭头函数有几个使用注意点。
>（1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
>（2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
>（3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用Rest参数代替。
>（4）不可以使用yield命令，因此箭头函数不能用作Generator函数。
> 除了this，以下三个变量在箭头函数之中也是不存在的，指向外层函数的对应变量：arguments、super、new.target。

详细的教程请看[函数的扩展](http://es6.ruanyifeng.com/#docs/function)
#### 对象的扩展
- 属性的简洁表示法
ES6允许直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。

```
var foo = 'bar';
var baz = {foo};
baz // {foo: "bar"}

// 等同于
var baz = {foo: foo};

//方法也可以简写
var o = {
  method() {
    return "Hello!";
  }
};

// 等同于
var o = {
  method: function() {
    return "Hello!";
  }
};
```
- 属性名表达式
ES6 允许字面量定义对象时把表达式放在方括号内。

```
let propKey = 'foo';

let obj = {
  [propKey]: true,
  ['a' + 'bc']: 123
};


var lastWord = 'last word';
var a = {
  'first word': 'hello',
  [lastWord]: 'world'
};

a['first word'] // "hello"
a[lastWord] // "world"
a['last word'] // "world"
```
注意，属性名表达式与简洁表示法，不能同时使用，会报错。

```
// 报错
var foo = 'bar';
var bar = 'abc';
var baz = { [foo] };

// 正确
var foo = 'bar';
var baz = { [foo]: 'abc'};
```
注意，属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串[object Object]，这一点要特别小心。

```
const keyA = {a: 1};
const keyB = {b: 2};

const myObject = {
  [keyA]: 'valueA',
  [keyB]: 'valueB'
};

myObject // Object {[object Object]: "valueB"}
```
上面代码中，[keyA]和[keyB]得到的都是[object Object]，所以[keyB]会把[keyA]覆盖掉，而myObject最后只有一个[object Object]属性
- Object.is()
用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。

```
Object.is('foo', 'foo')
// true
Object.is({}, {})
// false

//不同之处
+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```
- Object.assign()
Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。

```
var target = { a: 1 };

var source1 = { b: 2 };
var source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
```
Object.assign方法的第一个参数是目标对象，后面的参数都是源对象。
注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性

```
var target = { a: 1, b: 1 };

var source1 = { b: 2, c: 2 };
var source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
```
如果只有一个参数，Object.assign会直接返回该参数。
如果该参数不是对象，则会先转成对象，然后返回。
Object.assign可以用来处理数组，但是会把数组视为对象。

```
var obj = {a: 1};
Object.assign(obj) === obj // true

typeof Object.assign(2) // "object"

Object.assign([1, 2, 3], [4, 5])
// [4, 5, 3]
```
- 属性的遍历
    1. for...in
        for...in循环遍历对象自身的和继承的可枚举属性（不含Symbol属性）。
    2. Object.keys(obj)
        Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含Symbol属性）。
    3. Object.getOwnPropertyNames(obj)
        Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含Symbol属性，但是包括不可枚举属性）
    4. Object.getOwnPropertySymbols(obj)
        Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有Symbol属性。
    5. Reflect.ownKeys(obj)
        Reflect.ownKeys返回一个数组，包含对象自身的所有属性，不管是属性名是Symbol或字符串，也不管是否可枚举
- \_\_proto\_\_属性，Object.setPrototypeOf()，Object.getPrototypeOf()

\_\_proto\_\_属性（前后各两个下划线），用来读取或设置当前对象的prototype对象。目前，所有浏览器（包括 IE11）都部署了这个属性。

Object.setPrototypeOf方法的作用与\_\_proto\_\_相同，用来设置一个对象的prototype对象，返回参数对象本身。它是 ES6 正式推荐的设置原型对象的方法。

```
let proto = {};
let obj = { x: 10 };
Object.setPrototypeOf(obj, proto);

proto.y = 20;
proto.z = 40;

obj.x // 10
obj.y // 20
obj.z // 40
```
Object.getPrototypeOf()用于读取一个对象的原型对象
- 对象的扩展运算符
解构赋值：对象的解构赋值用于从一个对象取值，相当于将所有可遍历的、但尚未被读取的属性，分配到指定的对象上面。所有的键和它们的值，都会拷贝到新对象上面。

```
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x // 1
y // 2
z // { a: 3, b: 4 }
```
扩展运算符：扩展运算符（...）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中

```
let z = { a: 3, b: 4 };
let n = { ...z };
n // { a: 3, b: 4 }

let aClone = { ...a };
// 等同于
let aClone = Object.assign({}, a);

let ab = { ...a, ...b };
// 等同于
let ab = Object.assign({}, a, b);
```
详细的教程请看[对象的扩展](http://es6.ruanyifeng.com/#docs/object)
#### Class
JavaScript语言的传统方法是通过构造函数，定义并生成新对象

```
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2);
```
es6引入了Class（类）这个概念，作为对象的模板。通过class关键字，可以定义类

```
//定义类
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
```
constructor方法，这就是构造方法，而this关键字则代表实例对象。也就是说，ES5的构造函数Point，对应ES6的Point类的构造方法。

使用的时候，也是直接对类使用new命令，跟构造函数的用法完全一致。
```
class Bar {
  doStuff() {
    console.log('stuff');
  }
}

var b = new Bar();
b.doStuff() // "stuff"
```
构造函数的prototype属性，在ES6的“类”上面继续存在。事实上，类的所有方法都定义在类的prototype属性上面。

```
class Point {
  constructor(){
    // ...
  }

  toString(){
    // ...
  }

  toValue(){
    // ...
  }
}

// 等同于

Point.prototype = {
  toString(){},
  toValue(){}
};
```
- constructor方法
constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。
详细的教程请看[Class](http://es6.ruanyifeng.com/#docs/class)
