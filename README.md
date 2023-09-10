# **前端基础点复习**
**1.CSS父子元素定位的使用**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="/css/index.css">
  <title>复习html</title>
</head>
<body>
  <div class="zt">
    <!-- 版心 -->
    <div class="center">
    </div>
    <!-- 背景图 -->
    <div class="back-img">
      <img src="./img/download.jpg" alt="">
    </div>
  </div>
</body>
</html>


/* 去样式 */
* {
  margin: 0;
  padding: 0;
}

.zt {
  width: 1520px;
  height: 960px;
  margin: 0 auto;
  position: relative;
}

.center {
  width: 1200px;
  height: 100px;
  background-color: pink;
  margin: auto;
  position: absolute;
  z-index: 999;
  top: 0;
  right: 0;
  left: 0;
}

.back-img img{
  width: 100%;
  height: 100%;
  position: absolute;
  top:0;
}
```

