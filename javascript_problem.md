javascript问题笔记
===============================================
## 作用域
1. 函数在被定义的时候就出现一个[[scope]]属性, 所有的属性方法都存在其里面
2. 函数在执行的进行js三部曲, 在第二步预编译时候[[scope]]属性里面产生一个执行期上下文(AO)**每次执行AO都会产生一个新的, 每次函数执行完AO就会被销毁**
3. [[scope]]属性里面会存在一个属性, 能访问到上级函数的东西, 即作用域链**站在巨人的肩膀上, 子函数定义的时候就有父函数的AO和GO，即里面的可以访问外面的外面不能访问里面的**

## 闭包
- 形成条件
1. 函数嵌套
2. 内部函数访问外部函数局部变量
- 详解
1. 子函数的[[scope]]里面， 
在父函数销毁AO之前(函数执行完毕), 子函数保存了父函数的一些变量或者方法

## 原型和原型链
1. 构造函数就是函数, 在定义的时候就会产生一个属性prototype, 即原型
2. 对象有__proto__, 函数有prototype和__proto__, 全部都可以理解成对象且里面都有constructor值为构造函数 **__proto__指向一个真的空对象注意需要添加constructor属性**
3. 原型链
    - 对象沿着__proto__找自己的原型prototype
    - 在通过自己的prototype中的__proto__找父原型的prototype
    - 在通过父原型的prototype中的__proto__访问父父的原型

4. new构造函数详解**原型链的基本应用**
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


