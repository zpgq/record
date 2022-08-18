## 移动端像素
1. 分辨率就是物理像素**最小颗粒**, 即设备像素(由操作系统决定, 可变化)
2. css中的px就是逻辑像素, 即设备独立像素**谷歌调试器中的大小**(每个设备固定)
3. dpr**像素比** = 物理像素/逻辑像素
4. 屏幕密度 = (横^2分辨率 + 纵^2分辨率)开根/手机尺寸(手机对角线)

## BFC
- 触发条件
   1. overflow不为visible
   2. 非块级元素(inline-block, table-cell, flex, inline-flex)
   3. 脱离文档流的定位(fixed/absolute)
   4. 浮动
- 规则
   1. BFC内浮动元素参与计算(解决了margin塌陷)
   2. BFC内兄弟元素垂直margin会重叠
   3. BFC内独立计算不受外部元素影响(两个元素浮动margin不会合并)

## IFC
- 触发条件
    一个块级元素中仅包含内联级别元素
- 规则
    1. 垂直方向的margin不生效
    2. text-align、vertical-align属性生效