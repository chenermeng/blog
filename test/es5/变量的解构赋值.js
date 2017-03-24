"use strict";

/**
 * Created by chenmeng on 2017/3/23.
 */
// 数组的解构赋值
var a = 1,
    b = 2,
    c = 3;

// 不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组

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

// 对象的解构赋值
var _foo$bar = { foo: "aaa", bar: "bbb" },
    foo = _foo$bar.foo,
    bar = _foo$bar.bar;

foo; // "aaa"
bar; // "bbb"

var _foo$bar2 = { foo: 'aaa', bar: 'bbb' },
    baz = _foo$bar2.foo;

baz; // "aaa"

// 对象的解构也可以指定默认值
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