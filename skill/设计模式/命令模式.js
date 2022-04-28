let carManager = (function () {
    let carManager = {
        requestInfo(model, id) {
            return 'requestInfo' + 'model' + model + 'id' + id
        },
        buyVehicle(model, id) {
            return 'buyVehicle' + 'id' + id + 'model' + model
        },
        arrangeViewing(model, id) {
            return 'arrangViewing' + '(model)' + model + '(id)' + id
        }
    }
    return carManager
})()

carManager.execute = function (name) {
    console.log('[].slice.call(arguments, 1))', [].slice.call(arguments, 1))
    return carManager[name] && carManager[name].apply(carManager, [].slice.call(arguments, 1))
}
const result = carManager.execute('buyVehicle', 'foo', '2222')
console.log(result)
// console.dir(carManager)

const arr = [1, 2, 2, 3]
const sliceArr = arr.slice(1)
console.log(sliceArr)