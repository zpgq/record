function Car(options) {
  this.state = options.state || 'brand new';
  this.color = options.color || 'silver'
}

function Truck(options) {
  this.state = options.state || 'used'
  this.color = options.color || 'blue'
  this.wheelSize = options.wheelSize || 'larger'
}

function VehicleFactory() {}

VehicleFactory.prototype.vehicleClass = Car;

VehicleFactory.prototype.createVehicle = function (options) {

  if (options.vehicleType === 'car') {
    this.vehicleClass = Car;
  } else {
    this.vehicleClass = Truck;
  }
  
  return new this.vehicleClass(options)
}

let carFactory = new VehicleFactory()

let car = carFactory.createVehicle({
  vehicleType: 'car',
  color: 'yellow',
})

console.log(car)