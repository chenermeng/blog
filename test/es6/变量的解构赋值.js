/**
 * Created by chenmeng on 2017/3/23.
 */
// 数组的解构赋值
let [a, b, c] = [1, 2, 3];

// 不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组
var [x, y] = [1, 2, 3];
x // 1
y // 2

let [aa, [bb], d] = [1, [2, 3], 4];
aa // 1
bb // 2
d // 4

// 对象的解构赋值
let { foo, bar } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"

var { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"

// 对象的解构也可以指定默认值
var {x = 3} = {};
x // 3

var {x, y = 5} = {x: 1};
x // 1
y // 5

var {x:y = 3} = {};
y // 3

var {x:y = 3} = {x: 5};
y // 5
