# Vue的插值语法{{}}

在js表达式中可以直接访问vue对象的data中声明的变量，也可以进行数据的运算、方法的调用。Vue在背后做了大量的工作，通过声明式的语法（在data中声明变量），实现在页面中直接通过 {{}} 语法引用data变量。**并且data**中定义的这些变量将拥有响应式的特点（一旦**data**中变量的值有变化，**Vue**将操作关联的**DOM**元素，自动更新UI）

```html
<div>{{ js表达式 }}</div>
```

```html
<div id="app">
  <h1>电影详情</h1>
  <img :src="url" alt="">
  <h3>电影名称：{{ name }}</h3>
  <h3>电影主演：{{ actors.join('/') }}</h3>
  <h3>电影类型：{{ type }}</h3>
  <h3>电影上映日期：{{ showingon }}</h3>
  <hr>
  <button id="btn1">坚如磐石</button>
  <button id="btn2">奥本海默</button>
</div>

<script>
  // 创建Vue对象，管理 #app，动态设置文本内容
  let vm = new Vue({
    data: {
      url:'https://p0.pipi.cn/mmdb/fb738633be1b128d3357e2418539bafea3dbb.jpg?imageView2/1/w/464/h/644',
      name:'坚如磐石',
      actors: ['雷佳音', '张国立', '于和伟'],
      type: '动作 悬疑 剧情',
      showingon: '2023-09-28'
    },
    el: '#app'
  })

  let btn1 = document.getElementById('btn1')
  btn1.onclick = function() { 
    vm.url = 'https://p0.pipi.cn/mmdb/fb738633be1b128d3357e2418539bafea3dbb.jpg?imageView2/1/w/464/h/644'
    vm.name = '坚如磐石',
      vm.actors = ['雷佳音', '张国立', '于和伟'],
      vm.type = '动作 悬疑 剧情',
      vm.showingon = '2023-09-28'
  }

  let btn2 = document.getElementById('btn2')
  btn2.onclick = function() { 
    vm.url = 'https://p0.pipi.cn/mmdb/fb738633537f2a8ea38ea34efb781c44a0ea1.jpg?imageView2/1/w/464/h/644'
    vm.name = '奥本海默',
      vm.actors = ['基里安·墨菲', '小罗伯特·唐尼', '弗洛伦斯·皮尤'],
      vm.type = '剧情 传记 历史',
      vm.showingon = '2023-08-30'
  }
</script>
```

# Vue中的事件绑定  

```html
<div id="app">
  <h1>电影详情</h1>
  <img :src="url" alt="" width="150px">
  <h3>电影名称：{{ name }}</h3>
  <h3>电影主演：{{ actors.join('/') }}</h3>
  <h3>电影类型：{{ type }}</h3>
  <h3>电影上映日期：{{ showingon }}</h3>
  <input 
         @focus="inputType = 'text'" 
         @blur=" inputType = 'password'" 
         :type="inputType" 
         placeholder="请输入验证码">
  <hr>
  <button @click="clickBtn1()">坚如磐石</button>
  <button @click="clickBtn2()">奥本海默</button>
</div>
<script>
  // 创建Vue对象，管理 #app，动态设置文本内容
  let vm = new Vue({
    data: {
      url:'https://p0.pipi.cn/mmdb/fb738633be1b128d3357e2418539bafea3dbb.jpg?imageView2/1/w/464/h/644',
      name:'坚如磐石',
      actors: ['雷佳音', '张国立', '于和伟'],
      type: '动作 悬疑 剧情',
      showingon: '2023-09-28',
      inputType: 'password'
    },
    methods: {
      clickBtn1(){
        // this就是new出来的Vue对象，可以直接修改其属性
        // data中声明的属性具有响应式的特点，所以当属性被修改
        // 页面内容将自动更新
        this.url = 'https://p0.pipi.cn/mmdb/fb738633be1b128d3357e2418539bafea3dbb.jpg?imageView2/1/w/464/h/644'
        this.name = '坚如磐石',
          this.actors = ['雷佳音', '张国立', '于和伟'],
          this.type = '动作 悬疑 剧情',
          this.showingon = '2023-09-28'
      },
      clickBtn2(){
        this.url = 'https://p0.pipi.cn/mmdb/fb738633537f2a8ea38ea34efb781c44a0ea1.jpg?imageView2/1/w/464/h/644'
        this.name = '奥本海默',
          this.actors = ['基里安·墨菲', '小罗伯特·唐尼', '弗洛伦斯·皮尤'],
          this.type = '剧情 传记 历史',
          this.showingon = '2023-08-30'
      }
    },
    el: '#app'
  })
</script>
```

# Vue中元素属性的动态绑定  

```html
<input 
   @focus="inputType = 'text'" 
   @blur=" inputType = 'password'" 
   :type="inputType" 
   placeholder="请输入验证码"
 />
```

```js
data: {
  inputType: 'password'
},
```

