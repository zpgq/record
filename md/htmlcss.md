## 1.1 移动端适配
- dpr**像素比** => 物理像素/逻辑像素(可使用window.devicePixelRatio获取)
   - 物理像素**最小颗粒**, 即分辨率, 即设备像素(由操作系统决定, 可变化)
   - 逻辑像素**css中的px**, 即谷歌浏览器模拟移动端显示的尺寸数值, 即设备独立像素
- 理想视口(布局视口大小 === 视觉视口, 即meta标签name="viewport" width=device-width)
- 兼容不同类型设备
   - rem适配 ==> 利用rem都是基于html标签的font-size进行计算的
      - 可以将**当前适配设备**的html标签的font-size设为**当前适配设备宽度**或者**100px**
     ```
     var designWidth = 375;  		// 设计稿宽度
     var scale = window.innerWidth / designWidth; //计算当前屏幕的宽度与设计稿比例
     document.documentElement.style.fontSize = scale*100 + 'px';
     ```
   - vw适配 ==> 都是相对于视口宽度来计算的( 1vw === 当前适配设备宽度 * 0.01 )
      - 可以利用postcss-px-to-viewport插件进行计算
## 1.2 BFC/IFC
### 1.2.1 BFC
- 触发条件
   1. overflow不为visible
   2. 非块级元素(inline-block, table-cell, flex, inline-flex)
   3. 脱离文档流的定位(fixed/absolute)
   4. 浮动
- 规则
   1. BFC内浮动元素参与计算(解决了margin塌陷)
   2. BFC内兄弟元素垂直margin会重叠
   3. BFC内独立计算不受外部元素影响(两个元素浮动margin不会合并)
## 1.2.2 IFC
- 触发条件
   一个块级元素中仅包含内联级别元素
- 规则
   1. 垂直方向的margin不生效
   2. text-align、vertical-align属性生效

## 1.3 规范
- 标签嵌套问题
   - p标签里面套div
   - div直接嵌套li
- css书写顺序
   1. 定位
   2. 自身属性
   3. 文字
   4. 背景
   5. 其他

## 1.4 常用属性
### 1.4.1 flex
- flex复合属性(默认值0 1 auto)
   1. flex-grow**剩余扩展比**
   2. flex-shrink**超过收缩比**
   3. flex-basis**初始长度**