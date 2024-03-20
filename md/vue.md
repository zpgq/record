## vue 注意项总结

- vue2 在绑定事件中直接改变 data 中未定义的属性时更新会失效, 若想使用正常更新需使用$set(注意: 只要先.age在$set 设置 data 上未定义的属性, 那么$set 也无法加入响应式)

  ```
  data () {
    return {
      obj: {
        name: 111
      }
    }
  }

  // ==> 未收集到age, 视图未更新
  handleClick () {
    this.obj.age = 333
  }

  // ==> 使用$set加入响应式进而会更新视图
  handleClick () {
    this.$set(this.obj, 'age', 333);
  }

  // ==> 只要先.age在$set设置data上未定义的属性, 那么$set也无法加入响应式, 无法更新视图
  handleClick () {
    this.obj.age = 333
    this.$set(this.obj, 'age', 333);
  }
  ```

-

## Vue 的 created 生命周期异步时执行顺序问题

1. 异步请求数据, 传递到子组件, 子组件无法拿到 props(第二次轮训才能拿到数据) ==> 可在子组件上加上 v-if, 有数据的时候才渲染子组件。

## vue 渲染过程

模板引擎 ==> AST 语法树(**parse 解析器**) ==> 静态标记(**优化器**) ==> 输出 rander 函数(**代码生成器**) ==> VNode ==> 真实 DOM

1. ast 语法树 ==> js 对象描述语言本身, 即描述代码

```
const a = 1;  ==>
{
  indentifier: const,
  name: a,
  value: 1
}
```

2. 虚拟 dom ==> js 对象描述节点
   div 里面有 data 数据 ==>
   {
   tag: div,
   div: {data: [1, 2, 3]}
   }

## VNode 概念

1. 简单来说虚拟 dom 其实就是一个节点描述对象, 描述如何去创建真实的 dom 节点

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
- 组件节点 ==> componentOptions(props 等等)、componentInstance
- 函数式组件节点 ==> functionalContext、functionalOptions(props 等等)
- 克隆节点 ==> isClone = true

## VNode 作用

1. 渲染真实的 dom(**先创建 VNode, 再创建真实 dom 插入到页面**)
2. 对上一次 vnode 缓存对比, 只更新发生变化的节点(**vue 中等粒度, 状态发生改变只能通知到组件级别, 组件中众多状态只要一个变化就得重新渲染组件**)

## vue 概念知识笔记

1. 为什么 vue 使用异步更新列队
   vue 采用一组件一个 watcher, 若一个组件同一轮循中有两个状态改变, 那么 watcher 会收到两次通知, 从而进行两次渲染, 故 vue 实现一个列队将所有 watcher 实例缓存起来, 在下一次事件循环中触发渲染流程并清空队列(**更新 DOM 在微任务执行, 实际上 DOM 的回调也是使用的 vm.$nextTick 注册到微任务中的**)
2. 更新 dom 和默认 nextTick 都是在微任务执行 ==> **许先修改数据在执行 nextTick**

```
handle() {
  this.message = 'changed'
  this.$nextTick(function () {})
}
// 两行代码顺序不能颠倒
```

3. 使用 nextTick 更新数据后会将下一次 DOM 更新推至宏任务(nextTick 待确认)

## 全局 api 注意事项

1. vm.$off 移出事件的时候, 对比移出是从后面往前对比移出的, 防止轮询的时候跳过一个元素

## $on和$emit

```
A组件 -> $emit('send', 'aaa')
B组件 -> $on('send', res => {console.log(res) // aaa })
$emit => 事件, $on绑定事件
```

## 源码

- 为什么在 Observer 上另外声明一个 dep 且定义 ob 属性**每个 key 对应的 watcher 收集到的 dep 在一个闭包里面无法访问**
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
  1. 给 Vue.set()方法
  2. 数组劫持用的

## 优化

1. 写了 scope 需要避免使用元素选择器
2. 使用组件空内容不能使用单标签闭合(闭合了 vue 内部会自动生成闭合标签造成性能浪费**模版语法无法识别单标签闭合**)

## 问题

1. path: '/detail/:id' 从/detail/1 切换到/detail/2 组件不会触发变化

- 路由守卫检测变化 beforeRoutePpdata
- 通过 watch 监听$route

2. 通过不缩写的形式 v-bind 可以给组件绑定多个属性, 常用于子组件需要绑定父组件配置的多个属性

```
v-bind={type: 'number', value: 111}
```
