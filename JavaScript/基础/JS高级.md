# ***arguments函数重载***

```js
function zhekou(money) {
    // 判断实参的个数,  3个 就是满减
    if (arguments.length == 3) {
        if (money >= arguments[1]) { //超过满减条件
            money -= arguments[2]
        }
    }

    // 两个参数
    // 判断实参的个数,  2个 就是打折
    if (arguments.length == 2) {
        // 参数2: 字符串类型 - 代表 vip
        // 参数2: 数字类型 - 折扣
        // typeof转类型判断是否为数字/字符串
        if (typeof arguments[1] == 'number') {
            money *= arguments[1]
        }
        if (typeof arguments[1] == 'string') {
            if (arguments[1] == 'vip1') {
                money *= 0.95
            }
            if (arguments[1] == 'vip2') {
                money *= 0.8
            }
        }
    }

    return money
}

// zhekou : 计算折扣价格的函数
// 使用方式:
console.log(zhekou(3000, 0.8)) // 消费3000 打八折
console.log(zhekou(3000, 0.6)) // 6折

console.log(zhekou(3000, 2000, 500)) // 满2000 减500
console.log(zhekou(3000, 3000, 700)) // 满3000 减700

console.log(zhekou(3000, 'vip1')) // 95折
console.log(zhekou(3000, 'vip2')) // 8折
```

# instanceof: 判断对象类型

**instanceof和typeof类似**

- instanceof 判断对象是否是指定构造函数创建的

- **typeof**判断JS基本数据类型

- **instanceof**判断JS对象数据类型

```js
function calc() {
    // 判断数组长度是1位
    if(arguments.length == 1){
        if(typeof arguments[0] == 'number'){
            return arguments[0] * arguments[0]
        }
    }
    // 判断数组长度是2位
    if(arguments.length == 2){
        if(typeof arguments[0,1] == 'number'){
            return arguments[0] + arguments[1]
        }
    }
    // 判断数组长度是3位
    if(arguments.length == 3){
        if(typeof arguments[0,1,2] == 'number'){
            return arguments[0] * arguments[1] * arguments[2]
        }
    }

    // 数组类型
    // instanceof: 判断对象是否是指定构造函数创建的
    if(arguments[0] instanceof Array) {
        // let一个变量保存总和
        let total = 0
        // for循环出数组里的值
        for(let i = 0; i<arguments[0].length; i++){
            total += arguments[0][i]
        }
        // 退出循环return
        return total
    }
}


// 实现一个 calc 函数, 预期效果如下
console.log(calc(10)) //算出数字的平方, 即 10 * 10
console.log(calc(20)) //算出数字的平方, 即 20 * 20
console.log(calc(10, 20)) //算出和值, 即 10 + 20
console.log(calc(10, 20, 30)) //算出乘积, 即 10 * 20 * 30

console.log(calc([11, 22, 33])) //数组类型, 则计算出数组内容的和
```

# this的用法

- 是函数中自带的一个变量, 指向函数`运行时`所在的对象 -- **非常灵活**

使用场景?

- 为函数提供了另一种执行方式
  - 传统方案: 通过传递参数的方式  把对象传入
  - 当前方案: 把函数作为参数传递到对象里执行 -- 反过来

```js
// 矩形对象:
var r1 = { length: 10, width: 20 }
var r2 = { length: 100, width: 120 }

// area函数: 用于计算 矩形的面积  长 * 宽

// 传统做法:
function area(rect) {
    return rect.length * rect.width
}

console.log(
    area(r1), area(r2)
);


// this模式的函数
function area1() {
    // this: 运行时服务的对象, 所在的
    return this.length * this.width
}

// 1. 把 area1 存储到对象中 :  上门服务
r1.area1 = area1
console.log(r1)
// 2. 执行 r1 中的 area1 函数
console.log(
    r1.area1()
)
// 3. 执行完毕后, 从对象中删除.
delete r1.area1

// 练习: 把 area1 放到 r2 执行
// 1. 上门服务:  函数存入r2中
r2.area1 = area1
// 2. 在 r2 中执行
console.log(r2.area1())
// 3. 删除
delete r2.area1
```

```js
// 立方体 长*宽*高
var c1 = { length:10, width:20, height:30 }

// 创建一个volume函数
function volume() {
    // 传入之后调用c1，这里this指c1本身
    return this.length * this.width * this.height
}

// 将volume传入到c1对象中
c1.volume = volume
// 调用c1对象中的volume
console.log(c1.volume())

// 结束后删除
delete c1.volume
```

# call的用法

```js
// call: 短暂拜访
// 函数 具有一个短暂拜访对象的方法 -- call
function area() {
    return this.length * this.width
}

var r1 = { length: 10, width: 20 }

// 任务: 把 area 函数临时放到 r1 对象中执行
console.log(
    area.call(r1) // area函数短暂拜访 r1 对象
)

console.dir(area) // dir: 直接输出函数对象

// 练习: 立方体
var c1 = { length: 10, width: 20, height: 30 }

// 1. 制作 volume 函数, 计算 体积=长*宽*高
// 把此函数放到 c1 中执行, 获取其体积
function volume() {
    return this.length * this.width * this.height
}
console.log(volume.call(c1))

// 2. 制作 area 函数, 计算 面积=(长x宽 + 长x高 + 宽x高)*2
// 把此函数放到 c1 中执行, 获取其面积
function area1() {
    return (this.width * this.length + this.length * this.height + this.width * this.height) * 2
}

console.log(area1.call(c1))
```

```js
var emp1 = { name: "亮亮", salary: 30000 } //月薪
var emp2 = { name: "凯凯", salary: 10000 }
var emp3 = { name: "泡泡", salary: 20000 }

// 所得税汇算函数  shui
// 年薪 10~ 15w   扣税 5%
// 年薪 >15 ~ 20  扣税 10%
// 年薪 >20 ~ 30  扣税 15%
// 年薪 >30 ~ 40  扣税 20%
// >40  扣税40%;   <10  不扣税
function shui() {
    // 算年薪
    let total = this.salary * 12
    // 小于10w
    if( total<100000 ) return 0
    // 年薪10~15w
    if( total>=100000 && total<150000 ) return total * 0.05
    // 年薪15~20w
    if( total>=150000 && total<200000 ) return total * 0.1
    // 年薪20~30
    if( total>=200000 && total<300000 ) return total * 0.15
    // 年薪30~40
    if( total>=300000 && total<400000 ) return total * 0.2
    // 大于40
    if( total>=400000 ) return total * 0.4
}

// call短暂访问emp对象，结束后离开
console.log(shui.call(emp1));
console.log(shui.call(emp2));
console.log(shui.call(emp3));
```

- call传参

​		参数1: 指定函数执行时所在的对象, 即 this 的指向

​		参数2 之后 : 传递给函数的实参列表

```js
var emp = { ename: '亮亮', salary: 20000 }

// 制作一个函数, 用于获取员工  n 个月的总薪资
function total(n) {
    return this.salary * n
}

console.log(
    // 6个月
    // 参数1: 指定函数执行时所在的对象, 即 this 的指向
    // 参数2 之后 : 传递给函数的实参列表
    total.call(emp, 6)
)

///////////////////////
var x = { a: 10 }

function show(b, c, d) {
    return this.a + b + c + d
}

console.log(
    show.call(x, 20, 30, 40)
);
```

# apply用法

函数的一个属性, 作用和 call 方法极其相似:

- 相同点：

  函数.apply(对象): 把函数临时放到对象里执行, 修改函数中的this指向

- 不同点:

​		实参通过 数组类型 进行传递:  **函数.apply(对象, [实参, 实参, ...])**  

- 用途:

​		如果函数接收的是实参列表, 但是我们只有数组类型, 则利用此函数实现数组转实参列表的效果

```js
// call: 临时把函数放对象里执行
// apply: 临时把函数方对象执行
var emp = { name: "凯凯", salary: 10000 };
// 年终奖 , 扣税
function total(zhong, shui) {
    return 12 * this.salary + zhong - shui; //年终奖
}
// 区别: 实参传递不同
// call: 实参要1个1个传递
console.log(total.call(emp, 50000, 30000));
// apply: 实参要放数组里传递
console.log(total.apply(emp, [50000, 30000]));
```

```js
// 制作一个 sum 函数, 能够计算出 所有实参的总和
function sum() {
    let total = 0
    for(let i = 0; i < arguments.length; i++){
        total += arguments[i]
    }
    return total
}


let nums = [21, 32, 43, 6546, 65, 3]
// 用sum函数,求出 nums 数组中的元素总和
console.log(sum.apply(1,nums));

// 练习:
// max: 求出实参列表中的最大值
// max函数不接收数组
console.log(Math.max(nums));
// 参数1: 随便书写, max的执行不依赖于this
console.log(Math.max.apply(null, nums))
// 练习: 求最小值
console.log(Math.min.apply('', nums))


// 预期用法:
console.log(sum(11, 22, 33))
console.log(sum(5, 4, 32, 14, 45, 67))
```

# bind的用法

提前绑定 函数和运行时的资源, 简化后续调用时的格式  

作用: 把函数和其运行时需要的资源捆绑在一起, 返回新的函数  

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>bind</title>
</head>
<body>

  <!-- 问题: 在HTML代码中, 掺杂过多的 JS 代码, 导致些许混乱 -->
  <button onclick="total.call(emp, 50000, 30000)">计算年薪</button>
  <br>
  <!-- 触发bind函数 -->
  <button onclick="total_bind()">计算年薪</button>

  <script>

    let emp = { ename: "凯凯", salary: 10000 }
    
    function total(zhong, shui) {
      alert(this.salary * 12 + zhong - shui)
    }
    
    // bind: 绑定
    // 作用: 把函数和其运行时需要的资源捆绑在一起, 返回新的函数
    var total_bind = total.bind(emp, 50000, 30000)

    console.dir(total_bind);

  </script>
</body>
</html>
```

# call、apply、bind的区别

**函数触发的三种方案**  

- call: 临时把函数放在对象中执行, 用于设定this的指向
- apply: 临时把函数放对象中执行, 可以把数组 转为 参数列表
- bind: 提前绑定 函数和运行时的资源, 简化后续调用时的格式

# 构造函数

构造函数: 功能是用于构建创造对象的函数, 称为构造函数，函数名大驼峰

```js
// 给老师建立档案
var teachers = [
    // 代码中 不应该出现 大批量的复制粘贴情况.
    // 通常用函数实现复用 -- 重复使用
    { ename: "晓宇", age: 18, phone: "18989787444" },
    { ename: "亮亮", age: 28, phone: "18944444446" },
    { ename: "小新", age: 38, phone: "18933338944" },
    { ename: "铭铭", age: 32, phone: "18985478784" },
    { ename: "文华", age: 35, phone: "15689789879" },
    { ename: "凯凯", age: 25, phone: "13659879797" },
];
console.log(teachers);

// 新建一个 Teacher 函数, 帮我们生成 讲师 对象
// 函数名大驼峰
function Teacher(ename, age, phone) {
    var obj = {};
    obj.ename = ename;
    obj.age = age;
    obj.phone = phone;
    return obj;
}
// 构造函数: 功能是用于构建创造对象的函数, 称为构造函数.
var t1 = Teacher("凯凯", 32, "10086");
console.log(t1);
```

# new运算符

- new运算符: 搭配构造函数使用时, 可以自动完成一些代码
- 函数前存在 new 运算符, 则认为此函数为构造函数

```js
// 创建一个构造函数函数
// new运算符: 搭配构造函数使用时, 可以自动完成一些代码
function Student(name, age, number){
    // this非常灵活: 默认代表函数运行时所在对象
    // 如果是 new 运算符触发, 则this指向 当前构造出来的对象
    // 省略的代码如下:

    // this = {}
    this.name = name
    this.age = age
    this.number = number
    // return this
}

// 当系统发现 函数前存在 new 运算符, 则认为此函数为构造函数
// 就会自动辅助此函数 完成一些构造函数 特有的代码
let s1 = new Student('张三', '22', '001')
console.log(s1);
```

# 三目运算符

```js
let arr = [1, 2, 3, 4, -2, -4, -6]

for(let i = 0; i < arr.length; i++){
  console.log(arr[i] > 0 ? '正数' : '负数');
}
```

# 原型和原型链

- 构造函数构造出来的对象，都有一个`__proto__`属性 ，这个`__proto__`指向构造函数的prototype

- 总结:为什么要设计原型模式?

  ​	节省内存

- 如何节省的?

  ​	把公共的方法存储在 共享的对象 : 构造函数.prototype 中

- new 运算符生成对象时, 自动为对象关联 `__proto__`到 共享对象 prototype 上

- JS引擎的原型链设计, 全自动

  ​	如果 对象.属性 对象自身没有, 则自动到`__proto__` 中查找!

```js
// 制作生成矩形对象的构造函数 Rect
function Rect(length, width) {
    // new运算符构造对象时, 会额外默认完成
    // 为当前构造的对象, 关联其父元素 为 构造函数的prototype
    // this.__proto__ = Rect.prototype
    this.length = length;
    this.width = width;
    // 新增计算面积的方法
    // this.area = function () {
    // return this.length * this.width
    // }
}
// 构造函数 -- 相当于 母亲角色, 能生对象
// 构造函数必然存在 prototype 属性, 即其丈夫
// prototype.constructor : 关联到构造函数, 即丈夫的妻子
console.dir(Rect); //查看 prototype 属性
// 把共享的方法,存储在 prototype 原型中
Rect.prototype.area = function () {
    return this.length * this.width;
};
// 用法:
// r1: 母亲通过new方案 生下来的对象
var r1 = new Rect(10, 20); // {length: 10, width:20}
console.log(r1);
// 母亲的丈夫 == 孩子的父亲
// 原型属性的名称 : __proto__ 是未经美化的原属性名
// 由于官方的要求, 浏览器必须按照固定规则 美化后再显示
console.log(Rect.prototype == r1.__proto__); // true
console.log(
    // JS引擎自带 原型链机制:
    // 白话文: 我自己没有的东西, 找我爸爸要
    // 专业: 自身没有的属性, 到原型链__proto__中查找
    r1.area()
);
// 构造函数能够反复多次调用, 每次调用都会执行函数中的代码
var r2 = new Rect(20, 30);
var r3 = new Rect(40, 50);
// 代表两个对象中的area 函数非同一个
console.log(r2.area == r3.area); //false
// 问题: 在构造函数中, 为对象添加方法属性, 导致内存的浪费. 因为方法是可以共享的
```

# 数组的元素

```js
var a = 5; // 字面量写法: 属于语法糖
console.log(a.toFixed(2));
//构造写法
var a = new Number(5);
console.log(a);
// 数组
var nums = [11, 22, 33, 44, 55];
console.log(nums);
// 为数组的原型增加一个求和的方法 sum
Array.prototype.sum = function () {
    // this: 函数运行时所在的对象
    let total = 0
    for(let i = 0; i < this.length; i++){ 
        total += this[i]
    }
    return total
};
console.log(nums.sum());
```

# 数组的高阶函数

**高阶函数: 函数中使用了其他函数, 就叫高阶函数**  ----不属于ES6的新特性

- every：和逻辑与&&相似，全都满足条件
- some：和逻辑或||相似，至少有一个满足
- filter：把满足条件的过滤出来
- map：映射，把数组每个元素处理返回值后，返回新的数组

```js
// 数组的高阶函数 -- 不属于ES6的新特性
// 高阶函数: 一个函数的内部使用了其他函数, 常见的带有回调函数的函数;
console.log(Array.prototype);
// every: 每一个
// 数组中, every可以自动遍历数组, 检查每一个元素是否符合指定条件
// every最终结果: 全真则真, 有假为假; 与 逻辑与操作相似 &&
var nums = [12, 432, 453, 65, -32, 12, 43];
// 需求: 判断数组中 是否 所有的/每一个 值都是正数
// 实参: 要求函数类型
// every会自动遍历数组, 把数组中的每个元素 都传递给 箭头函数
var res = nums.every((value, index, array) => {
    // 三个参数: 值, 序号, 数组本身
    // 关系: array[index] == value
    console.log(value, index, array);
    // 返回 判断的结果, 例如 >0 代表正数
    return value > 0;
});
console.log(res ? "都是正数" : "非都是正数");
```

```js
// some: 一些, 至少有一个
// 只要存在 1个 满足条件的元素, 就算真; 类似逻辑或 ||
var nums = [21, 3, 34, -54, 65, 34, 43, 6];
// 判断: 是否存在负数
var res = nums.some((value, index, array) => {
    练习;
    return value < 0; // 判断结果: 是否有值是负数
});
// 简化
var res = nums.some((value) => value < 0);
console.log(res ? "存在负数" : "不存在负数");
```

```js
// filter: 过滤
// 把数组中满足条件的元素 过滤出来, 形成新的数组
var nums = [12, 3, 54, 23, 43, 65, 67];
// 把大于20的元素找出来
var res = nums.filter((value, index, array) => {
    return value > 20;
});
var res = nums.filter((value) => value > 20);
console.log(res);
```

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>map</title>
    </head>
    <body>
        <ul id="box">
            <li></li>
        </ul>
        <div id="box1"></div>
        <script>
            // map: 映射
            // 把数组中的元素 按照规律进行转换, 形成新的数组
            var nums = [1, 2, 3, 4, 5, 6];
            var res1 = nums.map((value, index, array) => {
                return value * 2;
            });
            var res1 = nums.map((value) => value * 2);
            console.log(res1);

            // 实战练习
            var skills = ["html", "css", "js", "dom"];
            // 把每个元素放在 li 标签里: <li>html</li>
            var res2 = skills.map((value, index, array) => {
                return `<li>${value}</li>`;
            });
            var res2 = skills.map((value) => `<li>${value}</li>`);
            // 如何把数组转化/拼接成字符串? join
            // join的参数, 代表间隔的符号, 默认是 逗号
            console.log(res2.join(""));
            box.innerHTML = res2.join("");
            console.log(res2);

            // 练习
            let names = ['泡泡', '小亮', '小新', '小明']
            let res3 = names.map(value => `<button>${value}</button>`)
            box1.innerHTML = res3.join('')

        </script>
    </body>
</html>

```

# AJAX用法和封装AJAX

AJAX练习：

```js
function url1() {
    let url = 'https://api.xin88.top/car/news.json'
    const xhr = new XMLHttpRequest()
    xhr.open('get',url)
    // 回调函数
    xhr.onload = function () { 
        let data = JSON.parse(xhr.response)
        console.log(data);
        // 把请求的数组放到li
        let res = data.data.list.map(value => `<li>${value.title}</li>`)
        box.innerHTML = res.join(' ')
    }
    xhr.send()
}
url1()

// 练习
function url2() { 
    let url = 'https://mfresh.xin88.top/data/news_select.php'
    // 1. 利用AJAX 请求接口中的数据
    // 2. 把数据中的内容, 转为 li 标签, 显示出标题
    // 3. 把 li 标签显示到页面上
    const xhr = new XMLHttpRequest()
    xhr.open('get', url)
    xhr.onload = function () { 
        let data = JSON.parse(xhr.response)
        console.log(data);
        let res = data.data.map(value => `<li>${value.title}</li>`)
        box1.innerHTML = res.join(' ')
    }
    xhr.send()
}
url2()

// 练习
function url3() { 
    let url = 'https://api.xin88.top/douban/movies.json'
    const xhr = new XMLHttpRequest()
    xhr.open('get', url)
    xhr.onload = function () { 
        let data = JSON.parse(xhr.response)
        let res = data.subjects.map( value => `<li>${value.title}</li>` )
        box2.innerHTML = res.join(' ')
    }
    xhr.send()
}
url3()
```

封装AJAX：

```js
// 需求:
// get(地址, 回调函数)
// callback:回调; 简写: cb
function get(url, cb) {
  let xhr = new XMLHttpRequest();
  xhr.open('get', url);
  xhr.onload = function () { 
    let data = JSON.parse(xhr.response);

    cb(data)    // 传到回调函数中
  }
  xhr.send();
}
```

使用封装的AJAX：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="referrer" content="no-referrer">
  <title>AJAX练习</title>
  <style>

    * {
      margin: 0;
      padding: 0;
    }

    #box {
      display: flex;
      flex-wrap: wrap;
    }

    li {
      margin: 10px;
      list-style: none;
      border-radius: 9px;
      box-shadow: 3px 3px 3px #ccc;
    }
    li:hover {
      box-shadow: 5px 5px 5px gray;
    }

    li > img {
      border-radius:  9px 9px 0 0;
    }

    li > div {
      position: relative;
    }

    li > div > b {
      margin-left: 10px;
    }

    li > div > span {
      color: #AB934D;
      position: absolute;
      right: 5%;
    }

  </style>
</head>
<body>
  <ul id="box">
    <li>
      <img src="" alt="">
      <div>
        <b></b>
        <span></span>
      </div>
    </li>
  </ul>
  <script src="./common.js"></script>
  <script>
    let url = 'https://api.xin88.top/douban/movies.json'
    get(url, data => {
      console.log(data);
      let res = data.subjects.map(value => {
        return `
        <li>
          <img src="${value.cover}" alt="图片丢失">
          <div>
            <b>${value.title}</b>
            <span>${value.rate}</span>
          </div>
        </li>
        
        `
      })
      box.innerHTML = res.join(' ')
    })
  </script>
</body>
</html>
```

# forEach的用法

***数组的遍历操作: 4种方案***

- **for循环遍历**

- **for..in** 

  用于遍历对象类型, key是属性名, 字符串类型

  由于数组属于对象类型的一种, 所以可以用for..in遍历. 但是并不合适

- **for..of** 

  来自 ES6

  **特色:** 直接遍历值;

  **区别：****for..in**先拿属性名 再通过属性名拿值，**for..of** 更加直接

- **forEach** 

  来自 ES6

  没有返回值, 只是存粹的遍历数组

- 取舍问题:

  通常对数组采用 forEach 方案

  对 伪数组 / 类(似)数组 采用 for..of 方案

  伪数组/类数组: 内容与数组的结构相同, 但是原型不是数组的，无法使用forEach，如arguments。

```js
// 数组的遍历操作: 4种方案
var names = ["mike", "lucy", "lily", "john"];

// 1. for
for (let i = 0; i < names.length; i++) {
    console.log(i, names[i]);
}
// 2. for..in : 用于遍历对象类型, key是属性名, 字符串类型
// 由于数组属于对象类型的一种, 所以可以用for..in遍历. 但是并不合适
for (const key in names) {
    console.log(key, names[key]);
}
// 3. for..of 来自 ES6
// 特色: 直接遍历值;
// 区别for..in. 先拿属性名 再通过属性名拿值
// for..of 更加直接
for (const value of names) {
    console.log(value);
}
// 4. forEach 来自 ES6
// 没有返回值, 只是存粹的遍历数组
names.forEach((value, index, array) => {
    console.log(index, value);
});
////////////////////////////
// 取舍问题:
// 通常对数组采用 forEach 方案
// 对 伪数组 / 类(似)数组 采用 for..of 方案
function show() {
    // 伪数组/类数组: 内容与数组的结构相同, 但是原型不是数组的
    console.log(arguments);
    // 无法使用forEach
    // arguments.forEach()
    // for..of 可以遍历
    for (const value of arguments) {
        console.log(value);
    }
    // 另一种方案: 把其原型替换成数组的prototype
    Object.setPrototypeOf(arguments, Array.prototype);
    arguments.forEach((value, index) => {
        console.log(index, value);
    });
}
show(11, 22, 333, 44, 55, 66);
```

练习：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>forEach练习</title>
</head>
<body>
  <div id="box"></div>
  <script>
    let nums = [12, 23, 34, 45, 56, 67]

    // for-of方法
    let sum = 0
    for (const value of nums) {
      sum += value
    }
    console.log(sum);

    sum = 0
    // forEach方法
    nums.forEach(value => {
      sum += value
    })
    console.log(sum);

    ////////////////////////////////
    // 结合 html
    var skills = ['html', 'css', 'js', 'dom']
    // 把元素转化成 button 标签, 拼接到一起形成字符串
    var template = '' //模板
    skills.forEach(value => template += `<button>${value}</button>`)
    console.log(template);
    box.innerHTML = template

  </script>
</body>
</html>
```

# reduce的用法

**reduce:** 减少, 合并

把数组中的元素 经过处理之后, 合并成 1个值

把数组的元素 累加到一起, 得到总和

- 参数1: 每个元素都被此函数处理, 其中 box 形参, 接收的是 当前的总和
- 参数2: 初始时的 总和

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>reduce</title>
  </head>
  <body>
    <div id="box"></div>
    <script>
      // reduce: 减少, 合并
      // 把数组中的元素 经过处理之后, 合并成 1个值
      var nums = [1, 2, 3, 4, 5, 6, 7, 8];
      // 任务: 把数组的元素 累加到一起, 得到总和
      // 参数1: 每个元素都被此函数处理, 其中 box 形参, 接收的是 当前的总和
      // 参数2: 初始时的 总和
      var res = nums.reduce((box, value, index, array) => {
        return box + value;
      }, 0);
      console.log(res);
      /////////////////////////////////////////////////////////////////
      var skills = ["js", "dom", "html", "css"];
      // 把元素转为按钮标签, 拼接到一起
      var res = skills.reduce((box, value) => {
        return box + `<button>${value}</button>`;
      }, "");
      console.log(res);
      box.innerHTML = res;
    </script>
  </body>
</html>
```

结合html练习：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="./common.js"></script>
  <title>reduce练习</title>
  <style>

    *{
      margin: 0;
      padding: 0;
    }

    #box {
      width: 400px;
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: center;
      background-color: #ccc;
    }

    #box > li {
      width: 80px;
      height: 100%;
      list-style: none;
      text-align: center;
    }

    #box > li:hover {
      background-color: #666;
    }

    #box1 {
      display: flex;
      height: 330px;
      margin-top: 40px;
    }
    
    #box1 > li {
      list-style: none;
      border-radius: 6px;
      margin-right: 20px;
      box-shadow: 5px 5px 5px #ccc;
    }

    #box1 > li:hover {
      box-shadow: 6px 6px 6px #666;
    }

    #box1 > li > img {
      border-radius: 6px 6px 0 0;
    }

    #box1 > li > div {
      position: relative;
    }

    #box1 > li > div > b {
      position: absolute;
      left: 5%;
      color: orange;
    }

    #box1 > li > div > span {
      position: absolute;
      right: 5%;
    }

  </style>
</head>
<body>
  <ul id="box"></ul>
  <ul id="box1"></ul>
  <script>

    // 把请求到的数据 中的 name 属性, 放到 li 标签中, 进行展示
    // 采用 reduce 方案实现
    function url1() {
      let url = 'https://api.88-hao.top/movie-actors?page=1&pagesize=5'
      get(url, data => {
        console.log(data);
        let res = data.data.reduce((box, value) => {
          return box + `<li>${value.actor_name}</li>`
        },'')
        box.innerHTML = res
      })
    }
    url1()

    function url2() {
      let url = 'https://api.88-hao.top/movie-infos?page=1&pagesize=3'
      get(url, data => {
        console.log(data);
        let res = data.data.result.reduce((box,value) => {
          return box + `
          <li>
            <img src="${value.cover}" alt="">
            <div>
              <b>${value.score}</b>
              <span>${value.title}</span>
            </div>
          </li>
          `
        }, '')
        box1.innerHTML = res
      })
    }
    url2()

  </script>
</body>
</html>
```

# 数组数据转HTML代码

- map 搭配 join 使用

​		缺点: 用map和join 两个函数完成任务

- forEach 搭配 外部的变量

​		缺点: 需要额外的外部变量

- reduce

​		缺点: 理解上有难度, 使用少
