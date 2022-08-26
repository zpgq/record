## Vue的created生命周期异步时执行顺序问题
1. 异步请求数据, 传递到子组件, 子组件无法拿到props(第二次轮训才能拿到数据)  ==> 可在子组件上加上v-if, 有数据的时候才渲染子组件。

## vue渲染过程
模板引擎 ==> AST语法树(**parse解析器**) ==> 静态标记(**优化器**) ==> 输出rander函数(**代码生成器**) ==> VNode ==> 真实DOM
1. ast语法树 ==> js对象描述语言本身, 即描述代码
```
const a = 1;  ==>
{
  indentifier: const,
  name: a,
  value: 1
}
```
2. 虚拟dom ==> js对象描述节点
div里面有data数据 ==>
{
  tag: div,
  div: {data: [1, 2, 3]}
}

## VNode概念
1. 简单来说虚拟dom其实就是一个节点描述对象, 描述如何去创建真实的dom节点
 ```
  class VNode{
    constructor(tag, data, children, text, ele, context, componentOptions, asyncFactory) {
      this.tag = tag  // 元素节点名称
      this.data = data  // 状态数据
      this.children = children  // 子节点
      this.isClone = false  // 是否是克隆对象
      ...
    }
    
  }
 ```
2. 节点类型
  - 注释节点
  - 文本节点
  - 元素节点
  - 组件节点 ==> componentOptions(props等等)、componentInstance
  - 函数式组件节点 ==> functionalContext、functionalOptions(props等等)
  - 克隆节点 ==> isClone = true

## VNode作用
1. 渲染真实的dom(**先创建VNode, 再创建真实dom插入到页面**)
2. 对上一次vnode缓存对比, 只更新发生变化的节点(**vue中等粒度, 状态发生改变只能通知到组件级别, 组件中众多状态只要一个变化就得重新渲染组件**)

## vue概念知识笔记
1. 为什么vue使用异步更新列队
  vue采用一组件一个watcher, 若一个组件同一轮循中有两个状态改变, 那么watcher会收到两次通知, 从而进行两次渲染, 故vue实现一个列队将所有watcher实例缓存起来, 在下一次事件循环中触发渲染流程并清空队列(**更新DOM在微任务执行, 实际上DOM的回调也是使用的vm.$nextTick注册到微任务中的**)
2. 更新dom和默认nextTick都是在微任务执行 ==> **许先修改数据在执行nextTick**
```
handle() {
  this.message = 'changed'
  this.$nextTick(function () {})
}
// 两行代码顺序不能颠倒
```
3. 使用nextTick更新数据后会将下一次DOM更新推至宏任务(nextTick待确认)

## 全局api注意事项
1. vm.$off移出事件的时候, 对比移出是从后面往前对比移出的, 防止轮询的时候跳过一个元素

## $on和$emit
```
A组件 -> $emit('send', 'aaa')
B组件 -> $on('send', res => {console.log(res) // aaa })
$emit => 事件, $on绑定事件
```

## 源码
- 为什么在Observer上另外声明一个dep且定义ob属性**每个key对应的watcher收集到的dep在一个闭包里面无法访问**
  ```
      ==>Observer
        this.dep = new Dep();
        def(value, "__ob__", this);
      ==>defineProperty get
         if (childOb) {
            childOb.dep.depend();
            if (Array.isArray(value)) {
              dependArray(value);
            }
          }
  ```
  1. 给Vue.set()方法
  2. 数组劫持用的

## 优化
1. 写了scope需要避免使用元素选择器
2. 使用组件空内容不能使用单标签闭合(闭合了vue内部会自动生成闭合标签造成性能浪费**模版语法无法识别单标签闭合**)

## 问题
1. path: '/detail/:id' 从/detail/1切换到/detail/2组件不会触发变化
  - 路由守卫检测变化beforeRoutePpdata
  - 通过watch监听$route
