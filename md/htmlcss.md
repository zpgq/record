## 1.1 移动端适配

- dpr**像素比** => 物理像素/逻辑像素(可使用 window.devicePixelRatio 获取)
  - 物理像素**最小颗粒**, 即分辨率, 即设备像素(由操作系统决定, 可变化)
  - 逻辑像素**css 中的 px**, 即谷歌浏览器模拟移动端显示的尺寸数值, 即设备独立像素
- 理想视口(布局视口大小 === 视觉视口, 即 meta 标签 name="viewport" width=device-width)
- 兼容不同类型设备
  - rem 适配 ==> 利用 rem 都是基于 html 标签的 font-size 进行计算的
    - 可以将**当前适配设备**的 html 标签的 font-size 设为**当前适配设备宽度**或者**100px**
    ```
    var designWidth = 375;  		// 设计稿宽度
    var scale = window.innerWidth / designWidth; //计算当前屏幕的宽度与设计稿比例
    document.documentElement.style.fontSize = scale*100 + 'px';
    ```
  - vw 适配 ==> 都是相对于视口宽度来计算的( 1vw === 当前适配设备宽度 \* 0.01 )
    - 可以利用 postcss-px-to-viewport 插件进行计算

## 1.2 重点概念总结

### 1.2.1 BFC

- 触发条件
  1.  overflow 不为 visible
  2.  非块级元素(inline-block, table-cell, flex, inline-flex)
  3.  脱离文档流的定位(fixed/absolute)
  4.  浮动
- 规则
  1.  BFC 内浮动元素参与计算(解决了 margin 塌陷)
  2.  BFC 内兄弟元素垂直 margin 会重叠
  3.  BFC 内独立计算不受外部元素影响(两个元素浮动 margin 不会合并)

## 1.2.2 IFC

- 触发条件
  一个块级元素中仅包含内联级别元素
- 规则
  1.  垂直方向的 margin 不生效
  2.  text-align、vertical-align 属性生效

## 1.2.3 层叠水平

- 顺序(同层若果跌在一起, 后面的覆盖前面的, 见下面实例)

  1.  层叠上下文
  2.  负 z-index
  3.  block 块状水平盒子
  4.  float 浮动盒子
  5.  inline-inline-block 水平盒子
  6.  z-index: auto/z-index: 0
  7.  正 z-index

- 形成层叠上下文情况(在负的 z-index 下面, 每个层叠上下文完全独立于它的兄弟元素，每个层叠上下文是自包含的：当一个元素的内容发生层叠后，该元素就会作为整体将会在父级叠上下文中按顺序进行层叠)

  1.  根元素 html
  2.  定位 absolute|relative, 且 z-index 不为 auto
  3.  定位为 fixed|sticky
  4.  display 为 flex/inline-flex, 且 z-index 不为 auto
  5.  opacity 值小于 1
  6.  transform 值不为 none
      ...

- 实例

  ```
  .container {
     position: relative;
     background: #ddd;
     margin-top: 10px;
  }

  .container>div {
     width: 200px;
     height: 200px;
     line-height: 200px;
     color: #333;
     text-align: center;
     font-size: 18px;
     font-weight: bold;
     border: 1px dashed #e6e6e6;
  }

  .float {
     float: left;
     background-color: deeppink;
  }

  /* 1. inline-blcok元素总是在上面 ==> */
  .inline-block {
     display: inline-block;
     background-color: yellowgreen;
     margin-left: -100px;
  }

  /* 形成层叠上下文后会看到，和 HTML 代码中 DOM 的堆放顺序有关，后添加的 div 会 叠在先添加的 div 之上, 即#div2总是在#div1之上 ==> */
  .container2>div {
     opacity: 0.9;
  }

  <div class="container container2">
     <div class="inline-block">#div1 inline-block</div>
     <div class="float"> #div2 float:left</div>
  </div>
  <div class="container container2">
     <div class="float"> #div1 float:left</div>
     <div class="inline-block">#div2 inline-block</div>
   </div>

  ```

## 1.3 规范

- 标签嵌套问题
  - p 标签里面套 div
  - div 直接嵌套 li
- css 书写顺序
  1.  定位
  2.  自身属性
  3.  文字
  4.  背景
  5.  其他

## 1.4 常用属性

### 1.4.1 flex

- flex 复合属性(默认值 0 1 auto)

  1.  flex-grow**剩余扩展比**
  2.  flex-shrink**超过收缩比**
  3.  flex-basis**初始长度**

- flex 调整元素自身属性**align-self**
  1.  align-self: flex-end; // 副轴从后面开始
