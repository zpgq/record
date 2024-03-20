## 属性

- 样式 style
  1. 获取行间样式
     - el.style
     - el.getAttribute('style')
     - getComputedStyle(el)
  2. 获取所有样式
     - getComputedStyle(el)
       兼容注意: getComputedStyle 在 ie8 有兼容问题, ie8 使用 el.currentStyle

## 事件委托机制

- 先捕获后冒泡, 阻止捕获或者冒泡在当前绑定的事件下使用 e.stopPropagation()
  1.  阻止捕获(捕获后的事件都不会触发了, 触发事件元素==>捕获 html>body>app)
  ```
  <div class='app'>
     <ul>
        <li>捕获/冒泡</li>
     </ul>
  </div>
  app.addEventListener('click', function (e) { e.stopPropagation() }, true)
  ```
  2.  阻止冒泡(冒泡后的事件都不会触发了, 触发事件元素==>捕获 html>body>app>ul>li>, 冒泡 li>ul>app)
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

## hash 路由和 h5 history

1. 区别

- hash 路由 onhashchange 监听 hash 路由的变化
- h5 history 是通过 onpopstate 监听前进后退
- h5 有封装好的 pushState, replaceState
- hash 路由对 url 不明感, h5 实现单页面项目需要后端设置都返回 index.html

## 节点

1. 常用创建节点类型
   ```
   const text = document.createTextNode('文本节点')
   const comment = document.createComment('注释节点')
   const ele = document.createElement('div') // 元素节点
   ```
