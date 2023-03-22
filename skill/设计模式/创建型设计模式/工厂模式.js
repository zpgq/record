/**
 * 工厂模式
 */

function Car(options) {
    this.doors = options.doors || 4;
    this.state = options.state || 'brand new'
    this.color = options.color || 'silver'
}

function Truck(options) {
    this.state = options.state || 'used'
    this.wheelSize = options.wheelSize || 'large'
    this.color = options.color || 'blue'
}

// 抽象工厂(注册, 获取)
let AbstractVehicleFactory = (function () {
    let types = {}
    return {
        // 从私有变量中取出构造函数, 并实例化
        getVehicle: function (type, customizations) {
            let Vehicle = types[type];
            // 调用的时候才实例化
            return (Vehicle ? new Vehicle(customizations) : null)
        },
        // 注册保存进私有变量
        registerVehicle: function (type, Vehicle) {
            let proto = Vehicle.prototype;
            // 工厂公共方法
            proto.sayHi = function () {
                console.log('sayhi', type)
            }
            types[type] = Vehicle
            // return AbstractVehicleFactory 能够链式注册
            return AbstractVehicleFactory
        }
    }
})()

AbstractVehicleFactory.registerVehicle("car", Car);
AbstractVehicleFactory.registerVehicle("truck", Truck);

var car = AbstractVehicleFactory.getVehicle("car", {
    color: "lime green",
    state: "like new"
});

var truck = AbstractVehicleFactory.getVehicle("truck", {
    wheelSize: "medium",
    color: "neon yellow"
});

console.log('car', car)
console.log('truck', truck)