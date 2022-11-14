## DOM部分
1. 常用创建节点类型
   ```
   const text = document.createTextNode('文本节点')
   const comment = document.createComment('注释节点')
   const ele = document.createElement('div') // 元素节点
   ```

## 属性
 - 样式style
      1. 获取行间样式
         - el.style
         - el.getAttribute('style')
         - getComputedStyle(el)
      2. 获取所有样式
         - getComputedStyle(el)
      兼容注意: getComputedStyle在ie8有兼容问题, ie8使用el.currentStyle
