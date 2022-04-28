// 闭包单例模式
let SingLeton = (function () {
    let instance = null;
    return function (name) {
        this.name = name;
        if(instance) {
            return instance
        }
        return instance = this;
    }
})()
SingLeton.prototype.sayName = function () {
    console.log(this.name)
}

let winner = new SingLeton('winner')
console.log(winner.sayName())
let sunner = new SingLeton('sunner')
console.log(sunner.sayName())
console.log(winner === sunner)


// 代理版单例模式
// let proxySingleton = (function () {
//     let instance = null;
//     return function (name) {
//         if(instance) {
//             return instance
//         }
//         return instance = new CreateSingleton(name);
//     }
// })()
// function CreateSingleton(name) {
//     this.name = name
// }
// CreateSingleton.prototype.getName = function () {
//     console.log(this.name)
// }

// let winner = new proxySingleton('winner')
// console.log(winner.getName())
// let sunner = new proxySingleton('sunner')
// console.log(sunner.getName())

// console.log(sunner === winner)