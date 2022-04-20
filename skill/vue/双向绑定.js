const seen = new Set()
function _traverse(val, seen) {
    if(typeof val !== 'object') {
        return
    }
    if(val.__ob__) {
        const depId = val.__ob__.dep.id;
        if(seen.has(depId)) {
            return
        }
        seen.add(depId)
    }
    for (const key in val) {
        console.log('traverse==>', val[key])
        _traverse(val[key])
    }
}
function traverse(val) {
    _traverse(val, seen)
    seen.clear()
}
const bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  const segments = path.split('.');
  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]];
    }
    return obj
  }
}
class Watcher {
    constructor(vm, expOrFn, cb, options = {}) {
        this.vm = vm;

        if(options.deep) {
            this.deep = true
        }else{
            this.deep = false;
        }

        this.deps = []
        this.depIds = [];

        if(typeof expOrFn === 'function') {
            this.getter = expOrFn
        }else{
            this.getter = parsePath(expOrFn);
        }
        this.cb = cb;
        this.value = this.get();
    }
    get() {
        window.target = this
        let value = this.getter.call(this.vm, this.vm)
        // 读对象数据 收集依赖
        if(this.deep) {
            traverse(value, seen)
        }
        window.target = undefined;
        return value
    }
    updata() {
        const oldVal = this.value
        this.value = this.get()
        this.cb.call(this.vm, oldVal, this.value)
    }
    addDep(dep) {
        const id = dep.id
        if(this.depIds.indexOf(id) === -1) {
            this.depIds.push(id)
            this.deps.push(dep)
            dep.addSub(this)
        }
    }
    teardown() {
        let i = this.deps.length;
        while(i --) {
            this.deps[i].removeSub(this)
        }
    }
}

let uid = 0
class Dep {
    constructor() {
        this.id = uid ++
        this.subs = []
    }
    addSub(sub) {
        this.subs.push(sub)
    }
    depend() {
        if(window.target) {
            window.target.addDep(this)
        }
    }
    notify = function () {
        const subs = this.subs.slice()
        subs.forEach(sub => sub.updata())
    }
    removeSub(sub) {
        const index = this.subs.indexOf(sub)
        if(index > 1) {
            return this.subs.splice(index, 1)
        }
    }
}

function observe(value) {
    if(typeof value !== 'object') {
        return 
    }
    let ob;
    if(value.__ob__ && value.__ob__ instanceof Observe) {
        ob = value.__ob__
    }else{
        ob = new Observe(value)
    }
    return ob
}
function defineReactive(data, key, val) {
    let childOb = observe(val); // 收集数组依赖
    const dep = new Dep()
    Object.defineProperty(data, key, {
        get() {
            dep.depend()
            if(childOb) {
                childOb.dep.depend() // 收集数组依赖
            }
            return val
        },
        set(newVal) {
            if(val === newVal) return
            val = newVal;
            dep.notify();
        }
    })
}
function def(obj, key, val) {
    Object.defineProperty(obj, key, {
        value: val
    })
}
const arrayMethods = Object.create(Array.prototype)
;[
    'push',
]
.forEach(method => {
    const original = Array.prototype[method]
    def(arrayMethods, method, function mutator(...args) {
        const result = original.apply(this, args)
        const ob = this.__ob__;
        let inserted
        switch (method) {
            case 'push':
                inserted = args
                break;
            
        }
        inserted && ob.dep.notify()
        ob.dep.notify()
        return result
    })
})
class Observe {
    constructor(value) {
        this.value = value;
        this.dep = new Dep();
        typeof value === 'object' && def(value, '__ob__', this)
        if(Array.isArray(value)) {
            value.__proto__ = arrayMethods
            this.observeArray(value)
        }else{
            this.walk(value)
        }
    }
    walk(obj) {
        const keys = Object.keys(obj)
        for(let i = 0; i < keys.length; i ++) {
            defineReactive(obj, keys[i], obj[keys[i]])
        }
    }
    observeArray(items) {
        for(let i = 0; i < items.length; i ++) {
            observe(items[i])
        }
    }
}

class Vue{
    constructor(options) {
        this.data = options.data;
        new Observe(this.data);
    }
}

const vm = new Vue({
    data: {
        name: 111,
        age: 222,
        arr: [333, 444],
        obj: {
            name: 'person',
        }
    }
})

Vue.prototype.$watch = function(expOrFn, cb, options = {}) {
    const watcher = new Watcher(vm, expOrFn, cb, options);
    if(options.immediate) {
        cb.call(vm, watcher.value)
    }
    return function unwatchFn() {
        watcher.teardown()
    }
}

vm.$watch('data.obj', function(oldVal, newVal) {
    console.log('oldVal', oldVal)
    console.log('newVal', newVal)
}, {deep: true, immediate: true})

vm.data.obj.name = 1




