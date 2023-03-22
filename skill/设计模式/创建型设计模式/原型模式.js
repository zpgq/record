/**
 * 原型模式
 * 1. 借用一个新的构造函数连接其原型, 返回一个实例对象
 */

let beget = (function () {
    function F() { }
    return function (proto) {
        F.prototype = proto
        return new F()
    }
})()

function Father() {
    this.name = 'father'
    this.age = 45
}
const son = beget(Father.prototype)

Father.prototype.sayName = function () {
    console.log('sayName', this.name)
}

son.name = 'son'
son.age = 18

son.sayAge = function () {
    console.log('sayAge', this.age)
}

son.sayName()
son.sayAge()

const father = new Father()
father.sayName()
father.sayAge()


// 圣杯模式
// function inherit(Son, Father) {
//     function F() { }
//     F.prototype = Father.prototype;
//     Son.prototype = new F();
//     Son.prototype.constuctor = Son;
//     Son.prototype.uber = Father.prototype
// }
// function Son() {
//     this.name = 'son'
//     this.age = 18
// };
// function Father() {
//     this.name = 'father'
//     this.age = 45
// }

// inherit(Son, Father)

// Son.prototype.sayAge = function () {
//     console.log('sayAge', this.age)
// }
// Father.prototype.sayName = function () {
//     console.log('sayName', this.name)
// }

// const son = new Son();
// const father = new Father()
// son.sayName()
// father.sayAge()