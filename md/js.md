## 1.1 预编译

1. 创建 AO 对象(Active Object), GO(函数定义[[scope]]属性, 包含所有属性方法)
2. 形参和变量声名提升，值为 undefind
3. 实参和形参相统一(实参值赋值给形参)
4. 函数整体提升

## 1.2 闭包(对周围状态进行捆绑)

```
var x = 1
function person() {
    const y = function () { x = 2; console.log("全局x进行绑定形成闭包", x) }
    y()
    console.log("全局x进行绑定形成闭包", x)
}
person();
console.log("闭包造成泄漏", x)
console.log("=============")
var x = 1;
function f() {
    var x;
    const y = function () { x = 2; console.log("函数f内的x绑定", x) }
    y()
    console.log("函数f内的x绑定", x)
}
f()
console.log("访问全局的x", x)
```

## 1.3 原型和原型链

### 1.3.1 原型

- **proto**和 getPrototypeOf(p.**proto**是一个非标准获取 **对象** 原型方法, 可以使用 Object.getPrototypeOf(p)代替)

  ```
  let p = new Person()
  p.__proto__  === Object.getPrototypeOf(p)
  p.__proto__ = obj === Object.setPrototypeOf(p, obj)
  // 1. 对象能通过__proto__或者getPrototypeOf来访问原型, 函数只可以通过prototype来访问原型
  // 2. getPrototypeOf只能访问到通过__proto__和setPrototypeOf设置的的属性, 不能访问到通过prototype设置的属性
  ```

- 属性在实例对象身上、构造函数身上、构造函数原型身上说明

  1.  实例对象(里面的方法可以通过实例对象访问)

  - 构造函数 this.属性

    ```
    function Person() { this.age = "11" }
    class Person() {constructor() { this.age = "111" }}
    class { age = "111" }
    ```

  - 实例对象里面可以看到此属性

  2.  构造函数(里面的属性方法只能通过构造函数本身访问, 既静态属性)

  - 构造函数.属性

    ```
    function Person() {} Person.age = "111"
    class Person{ static age = "111" }
    ```

  - 构造函数里面可以看到, 既实例对象原型里面的 constructor 里面

  3.  构造函数原型(里面的属性方法可以通过实例对象访问, 用于继承)

  - 构造函数.prototype.属性

    ```
    function Person() {} Person.prototype.age = "111"
    class Person{} Person.prototype.age = "111"
    ```

  - 构造函数原型身上可以看到此属性

  4.  **注意:**
      - class
        ```
        class Person { sayHi = () => { } } // 此函数是在实例上加方法
        class Person { sayHi() { } } // 此函数在构造函数原型上添加此方法, 且属性为不可遍历属性(不高亮)
        ```
      - 一般属性放在实例上(会创建多个), 方法放在原型上(只会创建一个, 共用方法)**详情可看构造器模式**

### 1.3.2 原型链(**prototype 也是一个对象，顾也会有**proto**属性**)

- 实例对象.**proto** ==> 构造函数的 prototype(通过里面的**proto**连接) ==> Object.prototype ==> null
- 原型链的基本应用**new 详解**
  ```
  let o = new Foo("sss")
  var o = new Object(); // 创建一个空的实例对象
  o.__proto__ = Foo.prototype; // 实例对象原型指向构造函数原型
  Foo.call(o); // this指向实例对象
  ```

## 1.4 继承模式

- 传统继承

  ```
  function Father() {}
  Son.prototype = new Father()
  function Son() {}
  let son = new Son()
  ```

  缺点: 1.父函数的实例属性也会继承 2.无法传递参数

- 借用构造函数

  ```
  function Father() {}
  function Son() {
     Father.call(this)
  }
  let son = new Son()
  ```

  缺点: 无法继承父函数原型上的属性方法, 多执行了一个函数

- 组合式继承

  ```
  function Father() {}
  function Son() {
     Father.call(this);
  }
  Son.prototype = new Father()
  ```

- 圣杯模式(借用一个构造函数充当中间件)
  ```
  function Father() {}
  function Son() {
     Father.call(this);
  }
  function inherit(Son, Father) {
     function F() {}
     F.prototype = Father.prototype;
     Son.prototype = new F();
     Son.prototype.constructor = Son;
     Son.prototype.uber = Father.prototype
  }
  ```

## 1.5 Promise

- promise 的两种用法

  ```
  const p1 = Promise.resolve('成功状态传递的数据')
  p1.then(res => console.log(res))

  const p2 =  new Promise((resolve, reject) => { resolve('成功状态传递的数据') })
  p2.then(res => console.log(res))
  ```

- promise 传递函数

  ```
  function myExecutorFunc() {
     return '成功状态传递的数据'
  }
  const p1 = Promise.resolve(myExecutorFunc)
  p1.then(res => console.log(res()))

  function myExecutorFunc(resolve, reject) {
     resolve('成功传递的数据')
  }
  const p1 = new Promise(myExecutorFunc)
  p1.then(res => console.log(res))
  ```

## 1.6 event loop 事件循环

- 主进程执行 -> 主线程内**所有**微任务微任务立即执行 -> 渲染 -> 宏任务 1 执行(宏任务 1 内的所有微任务立即执行) -> 宏任务 2 执行(宏任务 2 内的所有微任务立即执行) -> ...同层级下的所有宏任务 -> 渲染

  ```
  setTimeout(() => {
      p1.then(res => console.log('3'))
      console.log('2')
  }, 0)

  setTimeout(() => {
      p1.then(console.log('4')) // promise没有使用回调函数包裹相当于同步任务
      console.log('5')
  }, 0)

  console.log('1')

  // ==> 1, 2, 3, 4， 5

  // 主线程内**所有**微任务微任务立即执行示例 ==>
  setTimeout(() => {
    console.log('宏任务')
   });

   new Promise(resolve => {
      resolve('')
   }).then(res => {
      console.log('1')
   }).then(res => {
      console.log('2')
   })

   new Promise(resolve => {
      resolve('')
   }).then(res => {
      console.log('3')
   }).then(res => {
      console.log('4')
   })

   console.log('主进程')
   // ==> 主进程, 1, 3, 2, 4, 宏任务
  ```

## 1.7 原始值(复制堆内值, 不会影响原来的值)引用值(复制栈的地址, 指向相同影响原来的值)

- 引用值引用复制地址指向相同会影响原来的值(包括通过传参使用), 若赋值成一个原始值则不会影响到原来的值

  ```
  let obj = {
     name: '111',
     age: '111'
  }

  let obj1 = obj

  // ==> 通过传参也会影响原来的值
  const getObj = (newObj) => {
     newObj.newAge = '333'
     return newObj
  }
  console.log('getObj', getObj(obj1))
  console.log('after', obj) // 有newAge333

  // ==> 赋值成一个原始值则不会影响到原来的值
  const getObj = (newObj) => {
     newObj = 333
     return newObj
  }
  console.log('getObj', getObj(obj1)) // 333
  console.log('after', obj) // {name: '111', age: '111'}
  ```

- 浅复制引用值操作第一层不会影响原来的值, 操作第二层及其他层会影响原来的值(**从第 N 层浅复制, 第 N 层就算第一层**)

  ```
     const obj = {
           name: 111,
           frends: {
              name: 222,
           }
     }
     // ==> 浅复制引用值操作第一层不会影响原来的值
     const copyObj = { ...obj }
     copyObj.name = 333
     console.log('copyObj', copyObj) // { name: 333, frends: { name: 222 } }
     console.log('obj', obj) // { name: 111, frends: { name: 222 } }

     // ==> 操作第二层及其他层会影响原来的值
     const copyObj = { ...obj }
     copyObj.frends.name = 333
     console.log('copyObj', copyObj) // { name: 111, frends: { name: 333 } }
     console.log('obj', obj) // { name: 111, frends: { name: 333 } }

     // 从第N层浅复制, 第N层就算第一层 ==>
     const copyFrends = { ...obj.frends };
     copyFrends.name = 333
     console.log('copyFrends', copyFrends) // {name: 333}
     console.log('obj', obj) // { name: 111, frends: { name: 222 }}
  ```

- for, map, foreach 循环操作原始值不会影响原来的值, 操作引用值影响原来的值
  1.  操作原始值
      ```
         const arr = [1, 2, 3];
         console.log(arr); // 1, 2, 3
         const result = arr.map(item => {
            item = 3;  // 操作原始值
            return item
         });
         console.log(result) // 3, 3, 3
      ```
  2.  操作引用值
      ```
         const arr1 = [{age: 1}, {age: 2}, {age: 3}]
         console.log(arr1); // [{age: 1}, {age: 1}, {age: 1}]
         const result1 = arr1.map(item => {
            item.age = 1;  // 操作引用值
            return { ...item }
         });
         console.log(result1) // [{age: 1}, {age: 1}, {age: 1}]
      ```
  3.  展开操作原始值, 覆盖值(**不会影响原来的值**)
      ```
         const arr1 = [{ age: 1 }, { age: 2 }, { age: 3 }]
         console.log(arr1); // [{age: 1}, {age: 2}, {age: 3}]
         const result1 = arr1.map(item => {
            return {
               ...item,
               age: 1
            }
         });
         console.log(result1) // [{age: 1}, {age: 1}, {age: 1}]
      ```

## 模块(require)(import)

- es6 的模块(export, import)和(export default, import), commonjs 模块(module.exports, require)和(exports, require)
  1. es6 模块
  - import 导入的变量相当于 const 导入, 如果导入执行另一个地址会报错
    `import testName from './test'
 testName = 'aaa'  // 报错`
  2. commonjs 模块
  - 始终导出一个对象, 且以 module.exports 导出的执行为基准
  3. 两者相同点
     - 导出为一个对象时, 直接修改值会影响原来的值

## 1.8 类型转换

- 类数组转化成数组 Array.from()**转化后才可以使用数组方法**
  ```
  // 类数组 ==>
  const obj = {
     0: {name: 0},
     1: {name: 1},
     length: 2
  }
  // 数组 ==>
  const arr = Array.from(obj)
  ```
- 使用 Number 转化, 需先使用取反!!转化成 boolea 类型, 防止出现 NaN(**Number(undefined) === NaN**)
  ```
  const validFlag = undefined;
  Number(!!validFlag)
  ```

## 总结

- 假值总结(**undefined, null, false, 0, NaN, ''**)

  1.  循环数组时, item 判断下是否为空为空时不操作, 防止假值不是 false 操作对象报错(false.name === undefined, 其他的假值.name 报错)
  2.  值为 null 时解构设默认值值为 null, 但 undefined 解构设默认值时值

      ```
      const obj = {name: null}
      const { name = {} } = obj // 打印name为null

      const obj = {name: undefined}
      const { name = {} } = obj // 打印name为{}
      ```

- 运算符且(&&), 或(||)

  ```
  false && console.log("a") // 控制台未打印
  false || console.log("a") // 控制台打印出a
  ```

- ++**重新赋值操作 count = count + 1, 是一个表达式**、+1**未赋值, 原有的值未改变**
  ``
  let count = 0;

      count + 1
      console.log(count) // 0

      count ++
      console.log(count); // 1 ...累加

  ``

- 区分数据类型方法

  1.  区分数组和对象
      - isArray( [] )、Object.prototype.toString.call( [] )、[] instansof Array

- js 精度问题
  1.  字符串超过 16 位转成数字会失去精度(往后的都是 0)**通过 JSON.parse 或者 Number 等等**
  2.  0.1 + 0.2 != 0.3
- 类似方法说明
  1.  处理字符推荐使用 substring, slice 具有有类似效果
  ```
  const resultColunms =  [
     {
        name: 11
     },
     null,
     {
        name: 222
     }
  ]
  resultColunms.map(item => item && item.name) // 正常
  resultColunms.map(item => item.name) // 报错
  ```
