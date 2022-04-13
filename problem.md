# vue问题笔记
## Vue的created生命周期异步时执行顺序问题
1. 异步请求数据, 传递到子组件, 子组件无法拿到props(第二次轮训才能拿到数据)  ==> 可在子组件上加上v-if, 有数据的时候才渲染子组件。 

## vuex相关
1. vuex使用 dispatch('user/getInfo')  ==> store中调用user模块action的getInfo方法
---

# npm包问题笔记
## 全局包安装后无法使用思路
   1. 先yarn global list查看全局包是否安装成功
   2. 安装成功则yarn global bin查看包的路径, 复制将其设置在系统环境变量Path中
---

# http/https问题笔记
## 请求错误
1. stalled阶段时TCP连接的检测过程，如果检测成功就会继续使用该TCP连接发送数据，如果检测失败就会重新建立TCP连接。所以出现stalled阶段过长，往往是丢包所致，这也意味着网络或服务端有问
---

# git相关问题笔记
## 切换分支
1. git clone 远程地址, 在git checkout -b dev切换到dev分支需要pull origin dev才能拿到最新的代码 ==> clone -b dev可以直接拿到远程dev的最新代码
---
