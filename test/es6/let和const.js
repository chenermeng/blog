import "babel-polyfil"

/* let */
// let用来声明变量,用法类似var,但是声明的变量仅在let命令所在的代码块中有效
{
    let a = 10;
    var b = 1;
}
// a => ReferenceError: a is not defined.
// b => 1

// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;




for (let i = 0; i < 10; i++) {
    console.log(i)
}

var a = [];
for (let i = 0; i < 10; i++) {
    a[i] = function () {
        console.log(i);
    };
}
a[6](); //6
