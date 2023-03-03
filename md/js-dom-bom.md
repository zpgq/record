## 属性
 - 样式style
      1. 获取行间样式
         - el.style
         - el.getAttribute('style')
         - getComputedStyle(el)
      2. 获取所有样式
         - getComputedStyle(el)
      兼容注意: getComputedStyle在ie8有兼容问题, ie8使用el.currentStyle

## 事件委托机制
- 先捕获后冒泡, 阻止捕获或者冒泡在当前绑定的事件下使用e.stopPropagation()
   1. 阻止捕获(捕获后的事件都不会触发了, 触发事件元素==>捕获html>body>app)
   ```
   <div class='app'>
      <ul>
         <li>捕获/冒泡</li>
      </ul>
   </div>
   app.addEventListener('click', function (e) { e.stopPropagation() }, true)
   ```
   2. 阻止冒泡(冒泡后的事件都不会触发了, 触发事件元素==>捕获html>body>app>ul>li>, 冒泡li>ul>app)
   ```
   <div class='app'>
      <ul>
         <li>捕获/冒泡</li>
      </ul>
   </div>
   app.addEventListener('click', function (e) { e.stopPropagation() })
   ```

## 阻止事件冒泡传播
```
   document.onClick=function(e){
      var e = e||window.event; // 兼容IE9的event写法
      if(e.stopPropagation){
         e.stopPropagation();//W3C标准
      }else{
         e.cancelBubble=true;//IE
      }
   }
```

## hash路由和h5 history
1. 区别
 - hash路由onhashchange监听hash路由的变化
 - h5 history是通过onpopstate监听前进后退
 - h5 有封装好的pushState, replaceState
 - hash路由对url不明感, h5实现单页面项目需要后端设置都返回index.html

## 节点
1. 常用创建节点类型
   ```
   const text = document.createTextNode('文本节点')
   const comment = document.createComment('注释节点')
   const ele = document.createElement('div') // 元素节点
   ```
