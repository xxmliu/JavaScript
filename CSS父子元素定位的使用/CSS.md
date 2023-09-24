# CSS画出0.5px的线

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>0.5px的线</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }
    .px {
      width: 100px;
      height: 1px;
      background-color: #000;
      transform: scaleY(0.5);
    }
  </style>
</head>
<body>
  <p class="px"></p>
</body>
</html>
```



# CSS父子元素定位的使用

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
