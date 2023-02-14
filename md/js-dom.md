## 1.1 节点
1. 常用创建节点类型
   ```
   const text = document.createTextNode('文本节点')
   const comment = document.createComment('注释节点')
   const ele = document.createElement('div') // 元素节点
   ```

## 1.2 属性
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
