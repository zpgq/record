function Car() {
  this.model = 'default'
  this.type = 'car'
}

let car = new Car()

car.setModel = function (model) {
  this.model = model
}

car.setColor = function (color) {
  this.color = color
}

car.setColor('red')
car.setModel('轿车')

console.log(car)