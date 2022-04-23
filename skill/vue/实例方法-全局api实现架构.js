function Vue(options) {
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
randerMixin(Vue)

function initMixin(Vue) {
  Vue.prototype._init = function (options) { }
}
function stateMixin(Vue) {
  Vue.prototype.$set = function (target, key, val) {
    // 处理数组情况
    if (Array.isArray(target)) {
      target.length = Math.max(target.length, key)
      target.splice(key, 1, val)
      return val
    }

    // 处理key在data中已存在的情况
    if (key in target && !(key in Object.prototype)) {
      target[key] = val;
      return val;
    }

    const ob = target.__ob__
    // 处理target不是Vue实例、实例根数据的情况
    if (target._isVue || (ob && ob.vmCount)) {
      warn(`警告`)
      return
    }

    // 处理不是响应式数据的情况
    if (!ob) {
      target[key] = val;
      return val
    }

    // 除了以上情况
    defineReactive(ob.value, key, val)
    ob.dep.notify()
    return val
  };
  Vue.prototype.$delete = function (target, key, val) {
    // 数组的情况
    if (Array.isArray(target)) {
      target.splice(key, 1)
      return
    }

    const ob = target.__ob__
    // 处理target不是Vue实例、实例根数据的情况
    if (target._isVue || (ob && ob.vmCount)) {
      warn(`警告`)
      return
    }

    // 如果需要删除的熟悉自身没有则推出程序
    if (!hasOwn(target, key)) return
    delete target[key]

    // 如果ob不存在, 则终止程序, 即不是响应式数据
    if (!ob) return
    ob.dep.notify()
  };
  Vue.prototype.$watch = function (expOrFn, cb, options) { };
}
function eventsMixin(Vue) {
  Vue.prototype.$on = function (event, fn) {
    const vm = this;
    if (Array.isArray(event)) {
      for (let i = 0; i < event.length; i++) {
        this.$on(event[i], fn)
      }
    } else {
      // vm实例_events中保存事件注册列表
      // _events在vue._init初始化方法时创建 ==> vm._events = Object.create(null)
      (vm._events[event]) || (vm._events[event] = []).push(fn)
    }
    return vm
  }
  Vue.prototype.$once = function (event, fn) {
    const vm = this;
    function on () {
      vm.$off(event, on)
      fn.apply(vm, arguments)
    }
    // $off移出事件if(cb === fn || cb.fn === fn ) {}, 故on.fn = fn目的是为了从事件列表中移出改事件
    on.fn = fn;
    vm.$on(event, fn);
    return vm
  }
  Vue.prototype.$emit = function (event, fn) {
    const vm = this;
    let cbs = vm._events[event]
    if(cbs) {
      const args = toArray(arguments, 1)
      for (let i = 0; i < cbs.length; i ++) {
        try {
          cbs[i].apply(vm, args)
        } catch (error) {
          warn('警告')
        }
      }
    }
  }
}
function lifecycleMixin(Vue) {
  Vue.prototype.$forceUpdate = function () {
    const vm = this;
    if (vm._watcher) {
      vm._watcher.updata()
    }
  }
  Vue.prototype.$destroy = function () {
    
  }
}
function randerMixin(Vue) {
  Vue.prototype.$nextTick = function (fn) { }
}

const vm = new Vue({ data: { name: '1' } })

vm.$set()

