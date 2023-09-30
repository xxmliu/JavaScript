# dom初体验

**DOM: Document Object Model 文档 对象 模型**

- 文档: html代码
- 对象: js对象
- 模型: html代码 转换成 js对象 的这套流程

**浏览器中真正显示的是 全局中的document 对象**

- 可以通过JS来修改document中的值, 进而影响到页面上的内容展示

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>dom</title>
  </head>
  <style>
    h1 {
      color: green;
    }
  </style>
  <body>
    <h1>hello word</h1>
    <p></p>
    <script>
      console.log(window); // 找到 document 属性
      // log: 会美化输出的结果, 让其更容易阅读
      console.log(document.body);
      console.log(document.head);
      console.log(document);
      // dir: 直接输出本体
      console.dir(document.body);
      // JS特点: 能够实现更强大的 带有逻辑性的操作
      // 制作一个时钟效果:
      // 通过定时器, 每隔1秒中, 就修改页面上的某个元素
      setInterval(() => {
        let now = new Date().toLocaleTimeString();
        // document.title : 就可以操作 head 中的 title 标签的内容
        document.title = now;
        // 同css, js也提供类似选择器的方案, 通过标签名来查找某些标签
        //get:查找,获取 elements: 元素们 by:通过 tag:标签 name:名字
        const h1s = document.getElementsByTagName("h1");
        console.log("h1s:", h1s);
        // 修改 找到的第一个 h1 标签的 内容
        h1s[0].innerHTML = now;

        const ps = document.getElementsByTagName('p')
        ps[0].innerHTML = now

        console.log("now:", now);
      }, 1000); // 1000毫秒 == 1秒
    </script>
  </body>
</html>
```

# 元素的事件

**事件:** 在元素上触发的一些事情, 能够触发的事件都被系统提前规定好 

- 操作元素的属性:事件相关: 由浏览器规定的一系列事件这些属性都以 on开头
- 鼠标点击: onclick
- 鼠标悬浮: onmouseover

https://www.runoob.com/jsref/dom-obj-event.html 

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>元素的事件</title>
  </head>
  <body>
    <!-- 事件: 在元素上触发的一些事情, 能够触发的事件都被系统提前规定好 -->
    <!-- https://www.runoob.com/jsref/dom-obj-event.html -->
    <button id="btn1" onclick="alert('Hello!')">Click Me!</button>
    <!-- 尝试通过 DOM方式, 给这个按钮添加事件 -->
    <button id="btn2">Hello!</button>
    <button id="btn3">点我打印 666</button>
    <script>
      const btn3 = document.getElementById("btn3");
      btn3.onclick = function () {
        alert("666");
      };
      // 1. 先查询到 btn2 元素
      const btn2 = document.getElementById("btn2");
      // 2. 为元素的onclick属性赋值
      btn2.onclick = function () {
        alert("DOM!!");
      };
      console.dir(btn2); // 查看onclick属性
      // id: 唯一标识; 说明理论上 只有一个 满足条件的元素
      // 所以 : getElementById 的结果是 元素本身
      // 区分: 昨天的根据标签名查找 tagName
      // 页面中可以存在多个 相同的标签, 例如 很多个 li. 所以查询结果是类数组
      // 从document中, 查找 id=btn1 的元素style操作
      const btn1 = document.getElementById("btn1");
      console.log("btn1:", btn1);
      // 所有 on 开头的属性, 都是事件相关的
      console.dir(btn1);
    </script>
  </body>
</html>
```

# style操作

样式相关

- style: 内联样式. 优先级最高

- class: 样式类

  ​	className: 本体. 一个字符串类型的值

  ​	classList: 通过构造函数生成的一个对象, 提供了操作className 的一系列方法

  ​		toggle: 切换

  ​		add: 添加

  ​		remove: 删除

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>style</title>
</head>
<body>
  <!-- 1个页面元素的样式, 由哪些因素决定? -->
  <!-- 1. 原本本身的样式: w3c的标准规定 -->
  <!-- 2. 浏览器品牌 的 个性化美化 -->
  <!-- 3. class: 用户通过 class方案 -->
  <!-- 4. style: 内联样式的个性化 -->
  <button id="btn1">点我变色</button>
  <hr>
  <div id="box1" style="width: 200px; height: 200px; background-color: gray;"></div>
  <script>


    // 1. 从document中查找到按钮元素
    let btn1 = document.getElementById('btn1')

    btn1.onclick = function () {
      // 内联样式的优先级是最高的, 当这里赋值时, 会覆盖 前三种因素的效果
      // onclick属性 属于 btn1, 触发时 是btn1 触发的, 所以this是btn1
      this.style.color = 'green'
      // JS规范: 属性名不允许带有 -, 所以默认会以 小驼峰的形式出现
      box1.style.backgroundColor = 'black'
    }

    let box1 = document.getElementById('box1')
    box1.onclick = function () {
      this.style.backgroundColor = 'red'
    }

  </script>
</body>
</html>
```

练习：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>style练习</title>
</head>

<style>

  * {
    margin: 0;
    padding: 0;
  }

  #box {
    width: 400px;
    height: 60px;
    line-height: 60px;
    display: flex;
    justify-content: center;
    background-color: #ccc;
  }

  #box > li {
    list-style: none;
    width: calc(100% / 4);
    height: 100%;
    text-align: center;
  }

</style>

<body>
  <ul id="box">
    <li>html</li>
    <li>css</li>
    <li>js</li>
    <li>dom</li>
  </ul>

  <script>

    // 需求: 点击li 让其变为红色
    // 问题: 要操作的元素个数>1个, 即多个. 考虑批量修改的方案
    // 利用 标签选择方案, 查询到所有的li
    let lis = document.getElementsByTagName('li')
    console.log(lis);

    // 用 for ... of 遍历这个伪数组
    for (const li of lis) {
      li.onclick = function () {
        // this: 此变量非常灵活, 需要运行时才知道代表什么
        // 所以: vscode 静态分析代码时 不知道this是什么, 所以无法提供准确的提示
        li.style.backgroundColor = 'red'
      }
    }

  </script>

</body>
</html>
```

# querySelectorAll

- query:查询 selector:选择器 all:所有
- 通过选择器查找所有符合的元素
- 此方式查询的结果, 是类数组类型, 但是其原型 NodeList中存在forEach方法可以实现遍历操作

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>querySelectorAll</title>
  </head>
  <style>
    * {
      margin: 0;
      padding: 0;
    }

    li {
      list-style: none;
    }

    #boy {
      width: 200px;
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: center;
      background-color: #ccc;
    }

    #boy > li {
      width: calc(100% / 3);
      text-align: center;
    }

    #girl {
      width: 200px;
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: center;
      background-color: gray;
    }

    #girl > li {
      width: calc(100% / 3);
      text-align: center;
    }


  </style>
  <body>
    <ul id="boy">
      <li>凯凯</li>
      <li>铭铭</li>
      <li>亮亮</li>
    </ul>
    <ul id="girl">
      <li>泡泡</li>
      <li>楠楠</li>
      <li>瑶瑶</li>
    </ul>
    <script>
      // querySelectorAll
      // query:查询 selector:选择器 all:所有
      // 通过选择器查找所有符合的元素
      // qsa
      const girl_lis = document.querySelectorAll("#girl>li");
      console.log(girl_lis);
      // 此方式查询的结果, 是类数组类型, 但是其原型 NodeList中存在forEach方法可以实现遍历操作
      girl_lis.forEach((li) => {
        li.onclick = function () {
          this.style.color = "pink";
        };
      });
      // document: 整个html代码
      // 要想精确查找: 先找 id=boy 的元素
      const boy = document.getElementById("boy");
      // 再从boy里面查, 实现元素的小范围查找
      const boy_lis = boy.getElementsByTagName("li");
      console.log(boy_lis);
      for (const li of boy_lis) {
        li.onclick = function () {
          li.style.backgroundColor = "blue";
          li.style.color = "red"; 
        };
      }
    </script>
  </body>
</html>
```

# querySelector和classList

**querySelector:** 直接查询到元素本身

**使用场景:** 我们明确知晓要查询的元素只有1个时, 采用此方案更合理

**classList** 是通过构造函数创建出的对象, 属于对 原始的className 的封装,提供强大的辅助功能

toggle: 开关, 切换

- 自动判断目标样式是否存在, 实现切换效果

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="./reset.css" />
    <title>class练习</title>
  </head>
  <style>
    li {
      display: inline-block;
      padding: 5px 10px;
      background-color: #ccc;
      border-radius: 6px;
      cursor: pointer;
    }

    li.active {
      color: white;
      background-color: orange;
    }

    .switch {
      width: 80px;
      background-color: #ccc;
      border-radius: 30px;
      display: flex;
      padding: 3px;
      cursor: pointer;
      transition: 0.5s;
    }

    .switch span {
      width: 30px;
      height: 30px;
      background-color: #666;
      border-radius: 50%;
      transition: 0.5s;
    }

    .switch.open {
      background-color: orange;
    }

    .switch.open > span {
      transform: translateX(145%);
      background-color: pink;
    }

    #box {
      width: 200px;
      height: 200px;
      background-color: gray;
      transition: 0.3s;
    }

    #box.open {
      border-radius: 50%;
      background-color: orange;
    }
  </style>
  <body>
    <h2>勾选你的技术栈:</h2>
    <ul>
      <li>HTML</li>
      <li>CSS</li>
      <li>JS</li>
      <li>DOM</li>
      <li>Vue</li>
      <li>Node.js</li>
    </ul>
    <hr />
    <div class="switch"><span></span></div>
    <hr />
    <div id="box"></div>
    <script>
      let lis = document.querySelectorAll("li");
      lis.forEach((li) => {
        li.onclick = function () {
          if (this.className == "") {
            this.className = "active";
          } else {
            this.className = "";
          }
        };
      });

      // querySelector: 直接查询到元素本身
      // 使用场景: 我们明确知晓要查询的元素只有1个时, 采用此方案更合理
      let my_switch = document.querySelector(".switch");
      console.log("my_switch:", my_switch);
      my_switch.onclick = function () {
        console.dir(this);
        // classList 是通过构造函数创建出的对象, 属于对 原始的className 的封装
        // 提供强大的辅助功能
        // toggle: 开关, 切换
        // 自动判断目标样式是否存在, 实现切换效果
        this.classList.toggle("open");
      };

      // let switchs = document.querySelectorAll('.switch')
      // console.log(switchs);
      //   switchs[0].onclick = function () {
      //     if(this.className == 'switch'){
      //       this.className = 'switch open'
      //     }else{
      //       this.className = 'switch'
      //     }
      //   }

      const box = document.querySelector("#box");
      box.onclick = function () {
        this.classList.toggle("open");
      }
      
    </script>
  </body>
</html>
```

# 唯一激活

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./reset.css">
  <title>唯一激活</title>
</head>
<style>

ul {
  width: 200px;
}

  li {
    padding: 10px;
    background-color: #ccc;
    margin-bottom: 10px;
    transition: 0.6s;
  }

  li.active {
    box-shadow: 0 0 2px 2px rgba(50, 50, 50, 0.1);
    padding-left: 30px;
    background-color: orange;
    color: white;
  }

</style>
<body>
  <ul>
    <!-- active: 激活, 代表此项目默认选中状态 -->
    <li class="active">阶段1: 晓宇</li>
    <li>阶段2: 亮亮</li>
    <li>阶段3: 小新</li>
    <li class="xx yy">阶段4: 铭铭</li>
    <li>阶段5: 文华</li>
  </ul>
  <script>

    

    let lis = document.querySelectorAll('li')
    lis.forEach(li => {
      li.onclick = function () {

        // 唯一性激活效果:
        // 先删除之前 激活的元素, 再激活新的
        // 预判: 只有1个处于激活状态, qs
        let li_active = document.querySelector('li.active')
        // 采用 classList 提供的 remove 方法, 删除指定的样式类
        li_active.classList.remove('active')

        // = : 会导致覆盖操作, 覆盖原有的值. 此写法存在风险.
        // this.className = 'active'

        // classList中提供了 add 方案, 会保留原有的class 然后添加新的
        this.classList.add('active')
      }
    })
  </script>
</body>
</html>
```

练习：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./reset.css">
  <title>唯一激活练习</title>
</head>
<style>

  ul {
    display: flex;
    justify-content: center;
    width: 600px;
    height: 40px;
    line-height: 40px;
    background-color: #002c69;
    color: #fff;
  }

  li {
    width: calc((100% - 100px) / 5);
    text-align: center;
    transition: 0.6s;
    cursor: pointer;
  }

  li.active {
    background-color: #F39700;
  }

</style>
<body>
  <ul>
    <li class="active">首页</li>
    <li>关于净美仕</li>
    <li>公司动态</li>
    <li>产品中心</li>
    <li>联系我们</li>
  </ul>
  <script>

    let lis = document.querySelectorAll('li')
    lis.forEach( li => li.onclick = function () { 
      // 找到激活的元素，然后用remove删除
      let li_active = document.querySelector('li.active')
      li_active.classList.remove('active')
      
      this.classList.add('active')
    } )

  </script>
</body>
</html>
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="./reset.css" />
    <title>唯一激活</title>
  </head>
  <style>
    ul {
      width: 600px;
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f2f5f6;
    }

    li {
      width: calc((100% - 100px) / 5);
      height: 30px;
      line-height: 30px;
      margin-right: 10px;
      border-radius: 30px;
      border: 1px solid #666;
      text-align: center;
      cursor: pointer;
    }

    li:hover {
      border: 1px solid #ff5d23;
      color: #ff5d23;
    }

    li.active {
      border: none;
      background-color: #ff5d23;
      color: white;
    }

    #box {
      display: flex;
    }

    #box > img {
      width: 140px;
      height: 140px;
      border-radius: 4px;
      margin: 4px;
      /* 原始比例 和 显示比例不同, 存在适配问题 */
      /* cover: 覆盖; 保持原有比例, 充满整个显示的区域 */
      object-fit: cover;
      transition: 0.5s;
    }

    #box > img.active {
      width: 305px;
    }
  </style>
  <body>
    <ul>
      <li class="active">网游竞技</li>
      <li>单机热游</li>
      <li>手游休闲</li>
      <li>娱乐天地</li>
      <li>颜值</li>
    </ul>

    <hr />

    <div id="box">
      <img class="active" src="./imgs/bigskin-1.jpg" alt="" />
      <img src="./imgs/bigskin-2.jpg" alt="" />
      <img src="./imgs/bigskin-3.jpg" alt="" />
      <img src="./imgs/bigskin-4.jpg" alt="" />
      <img src="./imgs/bigskin-5.jpg" alt="" />
    </div>

    <hr />

    <script>
      let lis = document.querySelectorAll("li");
      lis.forEach(
        (li) =>
          (li.onclick = function () {
            // 找到激活项用remove删除
            // let li_active = document.querySelector('li.active')
            // li_active.classList.remove('active')

            // 简单粗暴的做法: 遍历之前查到的每个li 都删除一次激活状态
            lis.forEach((li) => li.classList.remove("active"));

            this.classList.add("active");
          })
      );

      let imgs = document.querySelectorAll("img");
      imgs.forEach(
        (img) =>
          (img.onmouseover = function () {
            imgs.forEach((imgs) => imgs.classList.remove("active"));
            this.classList.add("active");
          })
      );
    </script>
  </body>
</html>
```

# 广告弹窗

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./reset.css">
  <title>广告弹窗</title>
</head>
<style>

  #cb {
    width: 500px;
    position: fixed;
    right: 0;
    bottom: 0;
    transform: translateY(106%);
    transition: 0.3s;
  }

  #cb .cha {
    width: 30px;
    position: absolute;
    top: -12px;
    left: -12px;
    cursor: pointer;
  }

  #cb.active {
    transform: translateY(0);
  }

  #cb .cha:active {
    opacity: 0.5;
  }

  #cb .gg {
    width: 100%;
  }

</style>
<body>
  <div id="cb">
    <img class="cha" src="./imgs/cha.png" alt="">
    <img class="gg" src="./imgs/banner3.png" alt="">
  </div>

  <script>
    setTimeout(() => {
      let cb = document.getElementById('cb')
      cb.classList.add('active')
    }, 3000);

    // 明确知晓: 关闭按钮只有一个
    let cha = document.querySelector('#cb>.cha')
    cha.onclick = function () { 
      let cb = document.getElementById('cb')
      cb.classList.remove('active')
    }
  </script>
</body>
</html>
```

# 属性操作

- 1个元素上, 自带很多属性
- 系统属性: 官方默认提供的, 每个属性都有自己的作用
- 自定义属性: 添加一些自己的属性, 有两种添加方式

​			**旧方案, 不规范: 随便写, 需要用固定方法来操作**

​					自定义属性: 用使用专业的方法来操作

​						Attribute: 属性

​    					getAttribute: 读取元素上的自定义属性的值

​			**新方案: 用 data- 做开头, 存储在 dataset 属性中**

​						读取使用 data- 声明的属性, 从 dataset 中读取

​						多个单词 是 小驼峰命名法

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>属性操作练习</title>
  </head>

  <link rel="stylesheet" href="reset.css" />
  <style>

    ul {
      display: flex;
      margin-top: 10px;
    }

    li {
      margin: 0 10px 10px 0;
      background-color: #eee;
      padding: 10px 25px;
      border-radius: 4px;
      cursor: pointer;
    }

    li.active {
      color: #fff;
      background-color: orange;
    }

  </style>
  <body>
    <h2>请选择今日的午餐:</h2>
    <ul>
      <!-- 如何在元素上 存储单价信息? 通过自定义属性实现-->
      <li data-price="22">黄焖鸡</li>
      <li data-price="18">红烧牛肉面</li>
      <li data-price="35">老乡鸡</li>
      <li data-price="30">麻辣烫</li>
      <li data-price="15">水果捞</li>
      <li data-price="25">盖浇饭</li>
    </ul>
    <div id="box">消费金额: <b>0</b></div>

    <script>
      let lis = document.querySelectorAll('li')
      lis.forEach(li => li.onclick = function () { 
        this.classList.toggle('active')

        let li_active = document.querySelectorAll('li.active')
        let total = 0
        li_active.forEach(li=> {
          // string * number = number
          let price = li.dataset.price * 1
          total += price
        })

        let b = document.querySelector('#box>b')
        b.innerHTML = total
      })
    </script>

  </body>
</html>
```

