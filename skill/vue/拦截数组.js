const arrayProto = Array.prototype
const arrayMethods = Object.create(arrayProto)

;[
  'push',
  'pop'
].forEach(function (method) {
  const original = arrayProto[method]
  Object.defineProperty(arrayMethods, method, {
    value: function mutator(...args) {
      console.log('拦截方法触发')
      return original.apply(this, args)
    }
  })
  // arrayMethods[method] = function mutator(...args) {
  //   console.log('拦截方法触发了')
  //   return original.apply(this, args)
  // }
})

const arr = []
arr.__proto__ = arrayMethods
arr.push('111')
console.dir(arr)