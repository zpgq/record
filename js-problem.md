## 预编译环节
1. 创建AO, GO
2. 变量提升、形参提升
3. 实参赋值给形参
4. 函数整体提升

## 作用域
1. 函数在被定义的时候就出现一个[[scope]]属性, 所有的属性方法都存在其里面, 包父函数的AO, GO

## 闭包
1. 基本概念
   - 对周围状态进行捆绑
2. 闭包代码说明
   ````
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
   ````

## 原型和原型链
1. __proto__和getPrototypeOf说明
   - p.__proto__是一个非标准获取 **对象** 原型方法, 可以使用Object.getPrototypeOf(p)代替
     ```
     let p = new Person()
     p.__proto__ 和Object.getPrototypeOf(p)效果一样
     p.__proto__ = obj 和Object.getPrototypeOf(p, obj)效果一样的
     ```
   注意：
    - 对象能通过__proto__或者getPrototypeOf来访问原型, 函数只可以通过prototype来访问原型
   - getPrototypeOf只能访问到通过__proto__和setPrototypeOf设置的的属性, 不能访问到通过prototype设置的属性
2. 属性在实例对象身上、构造函数身上、构造函数原型身上说明
   - 实例对象(里面的方法可以通过实例对象访问)
     - 构造函数this.属性
      ```
      function Person() { this.age = "11" }
      class Person() {constructor() { this.age = "111" }}
      class { age = "111" }
      ```
     - 实例对象里面可以看到此属性
   - 构造函数(里面的属性方法只能通过构造函数本身访问, 既静态属性)
     - 构造函数.属性
      ```
      function Person() {} Person.age = "111"
      class Person{ static age = "111" }
      ```
     - 构造函数里面可以看到, 既实例对象原型里面的constructor里面
   - 构造函数原型(里面的属性方法可以通过实例对象访问, 用于继承)
     - 构造函数.prototype.属性
      ```
      function Person() {} Person.prototype.age = "111"
      class Person{} Person.prototype.age = "111"
      ```
     - 构造函数原型身上可以看到此属性
3. new构造函数详解**原型链的基本应用**
   ````
   Person.prototype.lastName = "zzz" 
   //实例对象person原型prototype身上的属性
   function Person(age) {
       // var this = { 
       //     __proto__: Person.prototype 
       // }
       // new构造函数隐士的第一步

       this.name = "ssss";  
       //实例person对象自己身上的属性
       // new构造函数的第二步

       // return this
       // new构造函数隐士的第三步
   }
   let person = new Person("sss")
   `````
---

## 运算符问题问题
   ```
   false && console.log("a") 
   ```
   // 控制台未打印
   ```
   false || console.log("a")
   ```
   // 控制台打印出a