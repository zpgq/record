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
     p.__proto__ = obj 和Object.setPrototypeOf(p, obj)效果一样的
     ```
   注意：
    - 对象能通过__proto__或者getPrototypeOf来访问原型, 函数只可以通过prototype来访问原型
   - getPrototypeOf只能访问到通过__proto__和setPrototypeOf设置的的属性, 不能访问到通过prototype设置的属性
2. 原型链 ==> 实例对象.__proto__ ==> 构造函数的prototype(通过里面的__proto__连接) ==> Object.prototype ==> null
   - 注意: prototype 也是一个对象顾也会有__proto__属性
3. 属性在实例对象身上、构造函数身上、构造函数原型身上说明
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
4. new构造函数详解**原型链的基本应用**
   ````
   let o = new Foo("sss")

   var o = new Object(); // 创建一个空的实例对象
   o.__proto__ = Foo.prototype; // 实例对象原型指向构造函数原型
   Foo.call(o); // this指向实例对象
   `````

## 继承模式
1. 传统继承
   ```
   function Father() {}
   Son.prototype = new Father()
   function Son() {}
   let son = new Son()
   ```
   缺点: 父函数的实例属性也会继承
2. 借用构造函数
   ```
   function Father() {}
   function Son() {
      Father.call(this)
   }
   let son = new Son()
   ```
   缺点: 无法继承父函数原型上的属性方法, 多执行了一个函数
3. 共享原型
   ```
   function Father() {}
   function Son() {}
   Son.prototype = Father.prototype
   ```
   缺点: 修改子函数原型会影响父函数的原型
4. 圣杯模式(借用一个构造函数充当中间件)
   ```
   function inherit(Son, Father) {
      function F() {}
      F.prototype = Father.prototype;
      Son.prototype = new F();
      Son.prototype.constructor = Son;
      Son.prototype.uber = Father.prototype
   }
   ```

## 运算符问题问题
   ```
   false && console.log("a")
   ```
   // 控制台未打印
   ```
   false || console.log("a")
   ```
   // 控制台打印出a

## 区分数据类型方法总结
1. 区分数组和对象
- isArray( [] )、Object.prototype.toString.call( [] )、[] instansof Array