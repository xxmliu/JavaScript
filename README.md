# **前端CSS基础点复习**
**CSS父子元素定位的使用**

首页展示，利用定位完成。

```html

  <div class="zt">
      <!-- 背景图 -->
      <div class="back-img">
        <img src="./img/download.jpg" alt=""/>
      </div>
      <!-- 版心 -->
      <div class="center">
        <!-- 导航栏 -->
        <div class="nav">
          <!-- logo -->
          <div class="logo">
            <img src="./img/logo.png" alt=""/>
          </div>
          <!-- 导航内容 -->
          <ul>
            <li>首页</li>
            <li>笔记</li>
            <li>关于</li>
            <li>售后</li>
            <li>登录</li>
          </ul>
        </div>
        <!-- 练习浮动/定位 -->
        <div class="fd">
          <div class="fd1"></div>
          <div class="fd1"></div>
          <div class="fd1"></div>
        </div>
      </div>
    </div>



/* 去样式 */
* {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
}

.zt {
  width: 1520px;
  height: 960px;
  margin: 0 auto;
  position: relative;
}

/* 背景图 */
.back-img img{
  width: 100%;
  height: 100%;
  position: absolute;
  top:0;
}

/* 版心 */
.center {
  width: 1200px;
  margin: auto;
  position: absolute;
  z-index: 999;
  top: 0;
  right: 0;
  left: 0;
}


/* 导航栏 */
.nav {
  width: 100%;
  height: 100px;
  display: flex;
}

/* logo */
.nav .logo img {
  height: 100%;
  position: relative;
}

/* 导航标题 */
.nav ul {
  display: flex;
  line-height: 100px;
  text-align: center;
  position: absolute;
  right: 0;
}

.nav ul li {
  color: #fff;
  font-size: 30px;
  margin-left: 40px;
}

.nav ul li:hover {
  border-bottom: 1px solid #fff;
}

/* 定位练习 */
.fd {
  width: 500px;
  height: 500px;
  position: absolute;
  top:300%;
}

.fd .fd1 {
  width: 300px;
  height: 100px;
  background-color: red;
  margin-bottom: 100px;
}
```

# **JS高级基础复习**

- ### ***arguments函数重载***

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

- ### instanceof: 判断对象是否是指定构造函数创建的

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

