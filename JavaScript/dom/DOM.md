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

- 所有 **on** 开头的属性, 都是事件相关的

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

