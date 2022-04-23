class Vue {
    constructor(opitons) {
        const vm = this
        vm._data = opitons.data;
        const keys = Object.keys(vm._data)
        let i = keys.length
        while (i--) {
            const key = keys[i];
            proxy(vm, '_data', key);
        }
    }
}


function proxy(target, sourceKey, key) {
    // let sharedPropertyDefinition = {
    //     enmuerator: true,
    //     configureble: true,
    // }
    // sharedPropertyDefinition.get = function proxyGetter() {
    //     console.log(this[sourceKey][key], 'key')
    //     return 'this[sourceKey][key]'
    // }
    // sharedPropertyDefinition.set = function proxySetter(val) {
    //     this[sourceKey][key] = val
    // }
    Object.defineProperty(target, key, {
        enumerable: true,
        configurable: true,
        get() {
            return this[sourceKey][key]
        },
        set(val) {
            this[sourceKey][key] = val
        }
    })
}

const vm = new Vue({
    data: {
        name: 1
    }
})

vm._data.test = 'test'
console.dir(vm)
