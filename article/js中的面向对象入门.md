### 什么是对象
我们先来看高程三中是如何对对象进行定义的
> "无序属性的集合，其属性可以包括基本值、对象或者函数"，对象是一组没有特定顺序的的值。对象的没个属性或方法都有一个俄名字，每个名字都映射到一个值。

简单来理解对象就是由属性和方法来组成的

### 面向对象的特点
－封装
> 对于一些功能相同或者相似的代码，我们可以放到一个函数中去，多次用到此功能时，我们只需要调用即可，无需多次重写。

在这里我们可以理解为创造对象的几种模式：单例模式，工厂模式，构造函数模式,原型模式等。

- 继承
> 子类可以继承父类的属性和方法

- 多态(重载和重写)
    1. 重载：严格意义上说js中没有重载的功能，不过我们可以通过判断函数的参数的不同来实现不同的功能来模拟重载。
    2. 重写：子类可以改写父类的属性和方法

### javascript中的封装
- **单例模式**
小王在一个小公司，就自己一个前端，所以他写js都是这样的

```
var a = 1;
function getNum(){
    return 1;
}
```
后来公司又招了个前端小明，于是变成他们2个一起写同一个js了。一天小王发现自己写的getNum方法出问题了，原来是小华写的js中也有个getNum的函数，代码合并后把他的覆盖掉了，于是便找小华理论去，经过一番妥协后，两人都把自己的代码改了改

```
var xiaoming = {
    num:1,
    getNum:function(){
        return 1;
    }
}

var xiaohua = {
    num:2,
    getNum: function(){
        return 2;
    }
}
```
这就是我们所谓的单例模式(命名空间)
> 我们把描述同一个事物的方法或者属性放到同一个对象里，不同事物之间的方法或者属性名相同相互也不会发生冲突。

**单例模式的优劣**
1. 使用单例模式，我们可以实现简单的模块化开发
```
var utils = {
    getCss:function(){
        //code
    },
    getByClass:function(){
         //code
    },
    setCss:function(){
        //code
    }
}
```
我们可以把自己写好的工具方法放到一个单独的js文件中，然后直接引入即可。
2. 避免了全局变量名的冲突
需要注意的是，我们在引入各个模块的时候，需要注意引入的顺序，引入顺序是按照各模块之间的相互依赖进行前后排列的；
3. 缺点：
  -  单例模式只是一定程度上避免了变量名的冲突，但并不能彻底解决此问题，而且在不同的对象下，我们可能会有很多功能相同的代码，最终造成大量的冗余代码。
 -  单例模式让每个对象有了自己独立的命名空间，但是并不能批量生产的问题，每一个新的对象都要重新写一份一模一样的代码。

```
var person1 = {
    name:'小明',
    age:24,
    showName:function(){
          console.log('我的名字是：'+this.name)
    }
};
var person1 = {
    name:'小华',
    age:25,
    showName:function(){
          console.log('我的名字是：'+this.name)
    }
};
```

-  **工厂模式**
  1. 工厂模式其实就是把需要一个个的编写的对象,放在一个函数中统一的进行创建，说白了就是普通函数的封装。
  2. 工厂模式总共3步骤：
      1）引进原材料 --- 创建一个空对象
      2）加工原材料 --- 加工对象：给对象添加属性和方法；
      3）输出产品 --- 返回对象：return 对象；

```
function CreatePerson(name,age){
        var obj={};//1.创建一个空对象
        //2.加工对象
        obj.name=name;
        obj.age=age;
        obj.showName=function(){
            console.log('我的名字是：'+this.name)
        };
        return obj;//3.输出对象；
}
var person1 = CreatePerson('小明',23)
var person2 = CreatePerson('小华',23)
person1.showName(); //我的名字是：小明
person2.showName(); //我的名字是：小华
```
- 工厂模式的优缺点
    1. 既然叫工厂模式，它就和我们周围的工厂一样，我们只需要把原材料放进去，就能得到我们需要的产品了。
    2. 工厂模式也解决了单例模式的批量生产的问题，避免了单例模式中的大量冗余代码，进行系统的封装，提高代码的重复利用率
    3. 不过工厂模式跟我们js内置类的调用方法不同
- **构造函数模式**
    1. 可以创建一个自定义的类，并且可以new出实例
    2. 构造函数做的就是类和实例打交道。

```
    //构造函数：首字母大写(约定俗成)；
    function CreatePerson(name,age){ //创建一个自定义的类
        //构造函数中的this，都是new出来的实例
        //构造函数中存放的都是私有的属性和方法；
        this.name=name;
        this.age=age;
        this.showName=function(){
             console.log('我的名字是：'+this.name)
        }
    }
   //实例1
    var person1 = new CreatePerson('小明',25)
   //实例2
    var person2 = new CreatePerson('小华',24)
```
这里说一下工厂模式和构造函数模式的区别：

```
1. 在调用的时候不同：
工厂模式：调用的时候，只是普通函数的调用createPerson();
构造函数模式：new CreatePerson();
2. 在函数体内不同：
工厂模式有三步：1）创建对象 2）加工对象 3）返回对象；
构造函数模式只有1步： 只有加工对象； 因为系统默认会为其创建对象和返回对象；
3. 构造函数默认给我们返回了一个对象，如果我们非要自己手动返回的话：
    (1)手动返回的是字符串类型：对以前实例上的属性和方法没有影响；
    (2)手动返回的是引用数据类型:以前实例身上的属性和方法就被覆盖了；实例无法调用属性和方法；
```
构造函数的方法都是私有方法，每个实例调用的都是自己私有的方法，同样也会有许多重复的代码。

我们可以使用原型模式来解决每个实例中都有相同方法的函数的问题
- **原型模式**

```
    function CreatePerson(name,age){
        this.name=name;
        this.age=age;
    }
    // 我们把公有的方法放到函数的原型链上
    CreatePerson.prototype.showName = function(){
             console.log('我的名字是：'+this.name)
    }
    var person1 = new CreatePerson('小明',25)
    var person2 = new CreatePerson('小华',24)
    person1.showName() //小明
```
**原型模式的关键：**

```
1）每个函数数据类型（普通函数，类）上，都有一个属性，叫prototype。
2）prototype这个对象上，天生自带一个属性，叫constructor:指向当前这个类；
3）每个对象数据类型（普通对象，prototype，实例）上都有一个属性，
   叫做__proto__:指向当前实例所属类的原型；
```
这3句话理解了，下边的东西就可以不用看了  //手动滑稽

通过例子我们来看这几句话是什么意思

```
 function CreatePerson(name,age){
        this.name=name;
        this.age=age
}
CreatePerson.prototype.showName=function(){
             console.log('我的名字是：'+this.name)
}
var person1 = new CreatePerson('小明',25);
console.dir(person1)
```

在chrome浏览器控制台中显示

![chrome](http://upload-images.jianshu.io/upload_images/2791152-983ab1348c4052b3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> 从图中可以看出，person1这个对象上有name和age两个属性，
person1的\_\_proto\_\_指向了它的构造函数(CreatePerson)的prototype上，
而且还有一个showName的方法。
并且它们中有一条链关联着： person1.\_\_proto\_\_ === CreatePerson.prototype

接着来看

 ```
function Foo(){
    this.a=1;
}
Foo.prototype.a=2;
Foo.prototype.b=3;
var f1 = new Foo;  //没有参数的话括号可以省略
console.log(f1.a) //1
console.log(f1.b) // 3

以这个为例,
当我们查找f1.a时，因为f1中有这个属性,所以我们得出 f1.a=1;
当我们查找f1.b时，f1中没有这个属性,我们便顺着f1.__proto__这条链去
它的构造器的prototype上找,所以我们得出了 f1.b = 3;
```

![原型图1](http://upload-images.jianshu.io/upload_images/2791152-3f6e15f60c0ab7f5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

接着来说，Foo.prototype是个对象,那么它的\_\_proto\_\_指向哪里呢
还记的刚刚说的那句
**每个对象数据类型（普通对象，prototype，实例）上都有一个属性，叫做\_\_proto\_\_:指向当前实例所属类的原型**
此外，我们应该知道
**每一个对象都是function Object这个构造函数的实例**
![obj](http://upload-images.jianshu.io/upload_images/2791152-bd4036554ac68132.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

所以我们可以接着还原这个原型图
![原型图2](http://upload-images.jianshu.io/upload_images/2791152-510616128b18e5d2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

等等，图上貌似多了个个Object.prototype.\_\_proto\_\_ 指向了null，这是什么鬼？
> 我们这么来理解，Object.prototype是个对象，
那么它的\_\_proto\_\_指向了它的构造函数的prototype上，
最后发现了还是指向它自身，这样转了个圈貌似是无意义的,于是便指向了null


还没完,我们发现对象都是函数(构造器)创造出来的，那么函数是谁创造的呢？石头里蹦出来的么？
**在js中,function都是由function Function这个构造器创造的，每一个函数都是Function的实例**

![Function](http://upload-images.jianshu.io/upload_images/2791152-e6724690bddfeb87.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

现在基本上我们就能得出了完整的原型图了

![原型图](http://upload-images.jianshu.io/upload_images/2791152-1cf52ba71ee3d7ff.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

是不是有点乱？根据我们刚刚讲的是能把这个图理顺的，
这里需要注意下，Function.\_\_proto\_\_是指向它的prototype的

多说一点,判断数据类型的方法时，我们知道有个instanceof的方法
比如

```
A instanceof B
```
instanceof判断的规则就是:
>  沿着A的\_\_proto\_\_这条线查找的同时沿着B的prototype这条线来找，如果两条线能找到同一个引用(对象)，那么就返回true。如果找到终点还未重合，则返回false。

再来看我们之前的那个例子

 ```
function Foo(){
    this.a=1;
}
Foo.prototype.a=2;
Foo.prototype.b=3;
var f1 = new Foo;  //没有参数的话括号可以省略
console.log(f1.a) //1
console.log(f1.b) // 3

当我们查找f1.a时，因为f1中有这个属性,所以我们得出 f1.a=1;
当我们查找f1.b时，f1中没有这个属性,我们便顺着f1.__proto__这条链去它的构造器的prototype上找,所以我们得出了 f1.b = 3;
```
**当我们查找一个对象的属性时,先在这个对象的私有空间内查找，如果没找到,就顺着对象的\_\_proto\_\_这条链去它的构造器的ptototype上查找,如果还没找到,接着沿\_\_proto\_\_向上查找,直到找到Object.prototype还没有的话,这个值就为undefined,这就是所谓的原型链**

列举下网页中的一些相关的原型链

![dom](http://upload-images.jianshu.io/upload_images/2791152-888f8878f69d19d8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

有兴趣的同学可自行通过浏览器控制台看看我们常用的方法都是在哪个类上定义的，比如getElementsByTagName,addEventListener等等


#### 继承
在这里就主要说一下组合继承(call + 原型链)

```
function Father(){
    this.xxx= 80;
    this.yyy= 100;
    this.drink = function(){}
}
Father.prototype.zzz= function(){}
var father = new Father;
function Son(){
    this.aaa = 120;
    this.singing = function(){}
    Father.call(this);
}
Son.prototype = new Father;
Son.prototype.constructor = Son;
var son = new Son
console.dir(son)
```

![组合继承](http://upload-images.jianshu.io/upload_images/2791152-c722f8c34452825e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这么写有个不好的地方就是：子类私有的属性中有父类私有的属性，子类公有的属性中也有父类私有的属性；
根据我们前边的知识，我们可以这么来改写

```
function Father(){
    this.xxx= 80;
    this.yyy= 100;
    this.drink = function(){}
}
Father.prototype.zzz= function(){}
var father = new Father;
function Son(){
    this.aaa = 120;
    this.singing = function(){}
    Father.call(this);
}
Son.prototype.__proto__ = Father.prototype
var son = new Son
console.dir(son)
```

最后来一张思维导图

![面向对象入门](https://github.com/chenermeng/blog/blob/master/img/%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1.png?raw=true)

如有错误，欢迎指正！
