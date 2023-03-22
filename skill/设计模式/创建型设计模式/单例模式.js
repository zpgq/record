/**
 * 单例模式
 * 1. "唯一"(多次使用只创建了一个实例)和"可全局访问"
 */

let ProxyCreateSingleton = (function () {
    let instance = null;
    return function (name) {
        if (instance) {
            return instance
        }
        return instance = new Singlton(name);
    }
})();

let Singlton = function (name) {
    this.name = name;
}

Singlton.prototype.getName = function () {
    console.log('prototype', this.name);
    return this.name
}

const winner = new ProxyCreateSingleton('winner')
console.log('winner', winner.getName()) // 唯一打印的都是winner
const summry = new ProxyCreateSingleton('summry')
console.log('summry', summry.getName()) // 唯一打印的都是winner




