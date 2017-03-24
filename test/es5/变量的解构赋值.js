"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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
// 函数参数的解构赋值
function add(_ref5) {
  var _ref6 = _slicedToArray(_ref5, 2),
      x = _ref6[0],
      y = _ref6[1];

  return x + y;
}
add([1, 2]); // 3

[[1, 2], [3, 4]].map(function (_ref7) {
  var _ref8 = _slicedToArray(_ref7, 2),
      a = _ref8[0],
      b = _ref8[1];

  return a + b;
});
// [ 3, 7 ]