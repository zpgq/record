function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.gender = 'male'
}

function Superhero(firstName, lastName, powers) {
  Person.call(this, firstName, lastName)

  this.powers = powers
}

Superhero.prototype = Object.create(Person.prototype)

let superman = new Superhero('clark', 'ket', ['fligt', 'heat-vision'])

console.log(superman)