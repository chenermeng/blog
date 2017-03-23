"use strict";

require("babel-polyfil");

/* let */
// let用来声明变量,用法类似var,但是声明的变量仅在let命令所在的代码块中有效
{
    var aa = 10;
    var bb = 1;
}
// a => ReferenceError: a is not defined.
// b => 1

// 不存在变量提升
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
var bar = 2;

// 不允许重复声明
/* 报错
function aa() {
    let a = 10;
    var a = 1;
}

// 报错
function bb() {
    let a = 10;
    let a = 1;
}*/

// let声明的变量仅在块级作用域内有效
var a = [];

var _loop = function _loop(i) {
    a[i] = function () {
        console.log(i);
    };
};

for (var i = 0; i < 10; i++) {
    _loop(i);
}
a[6](); //6

/*
 const 声明一个只读的常量,一旦声明，常量的值就不能改变

const PI = 3.1415;
PI // 3.1415

PI = 3;
// TypeError: Assignment to constant variable.*/