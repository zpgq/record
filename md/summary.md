## react和vue的区别
1. 更新
   - 默认情况下更新状态react子组件都会跟着更新**react只能知道状态更新了无法知道哪里更新了**
   - vue只会更新当前用到该状态的组件**vue收集依赖机制能够精确到哪里发生了变化, 采用一个组件为一个watcher**
2. 优化策略
   - react采用的是快速响应用户**jsx灵活动态的, fiber**
   - vue采用是优化每个任务, 挤压CPU运算量**模版语法是静态的可以标记, 只对比动态的地方**
3. 数据
    - react采用的是数据不可变
    - vue采用的是数据响应式

## 浏览器兼容问题
- css
   1. 不同浏览器默认margin、padding不同
      解决: reset.css样式重置
   2. css3新属性
      解决: 加前缀
   3. 块属性float后, 设有横向margin, IE6后面一块被顶到下一行
      解决: 
   4. 设置较小高度标签（一般小于10px），在IE6，IE7，页面中高度超出自己设置的高度
      解决: 设置的设置line-heihgt小于高度或者overflow: hidden等等
   5. inline-block导致文字对齐有间隙
      解决: 利用vertical-align: middle;
   6. 最小高度不生效问题
      解决: 使用width方式min-width不生效
      ```
         #box{
            width: 80px;
            height: 35px;
         }
         html>body #box{
            width: auto;
            height: auto; 
            min-width: 80px; 
            min-height: 35px;
         }
      ```
   7. 超链接访问样式出现问题
      解决: 按顺序设置样式
      ```
         a:link{}
         a:visited{}
         a:hover{}
         a:active{}
      ```
- js
   1. 阻止事件冒泡传播
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
- 复制功能
   浏览器禁用了非安全域的 navigator.clipboard 对象, 无clipboard.writeText方法
   解决: 非安全域退回到 document.execCommand('copy'); 保证功能一直可用
   ```
   // 先给要复制的文本或者按钮加上点击事件后，并将要复制的值传过来
    async copyValue(val) {
      if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard 向剪贴板写文本
        this.$message.success('复制成功')
        return navigator.clipboard.writeText(val)
      } else {
        // 创建text area
        const textArea = document.createElement('textarea')
        textArea.value = val
        // 使text area不在viewport，同时设置不可见
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        this.$message.success('复制成功')
        return new Promise((res, rej) => {
          // 执行复制命令并移除文本框
          document.execCommand('copy') ? res() : rej()
          textArea.remove()
        })
      }
    },
   ```