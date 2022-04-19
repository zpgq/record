function parsePath(data) {
    const arr = data.split('.')
    return function(obj) {
        for(let i = 0; i < arr.length; i ++) {
            obj = obj[arr[i]]
        }
        return obj
    }
}
class Watcher {
    constructor(vm, expOrFn, cb) {
        this.vm = vm;
        this.getter = parsePath(expOrFn);
        this.cb = cb
        this.value = this.get();
    }
    get() {
        window.target = this
        let value = this.getter.call(this.vm, this.vm)
        window.target = undefined;
        return value
    }
    updata() {
        const oldVal = this.value
        this.value = this.get()
        this.cb.call(this.vm, oldVal, this.value)
    }
}

class Dep {
    constructor() {
        this.subs = []
    }
    addSub(sub) {
        this.subs.push(sub)
    }
    depend() {
        if(window.target) {
            this.subs.push(window.target)
        }
    }
    notify = function () {
        const subs = this.subs.slice()
        subs.forEach(sub => sub.updata())
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
    // 递归把对象处理成原始值
    // if(typeof val === 'object') {
    //     new Observe(val);
    // }
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
            name: 'obj'
        }
    }
})

Vue.prototype.$watch = function(expOrFn, cb) {
    new Watcher(vm, expOrFn, cb);
}

vm.$watch('data.obj.name', function(oldVal, newVal) {
    console.log('oldVal', oldVal)
    console.log('newVal', newVal)
})

vm.data.obj.name = 222

// vm.$watch('data.name', function(oldVal, newVal) {
//     console.log('oldVal', oldVal)
//     console.log('newVal', newVal)
// })

// vm.data.name = 10;
// vm.data.arr.push(1)



