/**
 * 构造器模式
 * 1. 方法放在原型上防止重复声明
 */

function Car(model, year, miles) {
    this.model = model;
    this.year = year;
    this.miles = miles;
}

Car.prototype.toString = function () {
    return this.model + 'has done' + this.miles + 'miles'
}

const civic = new Car('Honda Civic', 2009, 20000);
const mondo = new Car('ford mondeo', 2010, 500);

console.log('civic', civic.toString())
console.log('mondo', mondo.toString())