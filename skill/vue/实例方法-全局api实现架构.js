function Vue(options) {
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
randerMixin(Vue)

function initMixin(Vue) {
  Vue.prototype._init = function(options) {}
}
function stateMixin(Vue) {
  Vue.prototype.$set = function() {
    console.log('set')
  };
  Vue.prototype.$delete = function() {};
  Vue.prototype.$watch = function(expOrFn, cb, options) {};
}
function eventsMixin(Vue) {
  Vue.prototype.$on = function (event, fn) {}
  Vue.prototype.$once = function (event, fn) {}
  Vue.prototype.$emit = function (event, fn) {}
}
function lifecycleMixin(Vue) {
  Vue.prototype.$forceUpdate = function () {}
  Vue.prototype.$destroy = function () {}
}
function randerMixin (Vue) {
  Vue.prototype.$nextTick = function (fn) {}
}

const vm = new Vue({data: {name: '1'}})
vm.$set()

