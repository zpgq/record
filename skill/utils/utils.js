(function (window) {
    //构造函数
    var uTils = function () {
        return new uTils.fn.init()
    }

    uTils.fn = uTils.prototype = {
        constructor: uTils,
        init: function () { }
    }
    uTils.fn.init.prototype = uTils.fn;

    // 两种扩展方式
    uTils.extend = uTils.fn.extend = function (options) {
        var target = this;
        var copy;
        for (const name in options) {
            copy = options[name];
            target[name] = copy;
        }
        return target;
    }

    //直接添加在构造函数上
    uTils.extend({
        myFunction: function () {
            console.log("这是构造函数身上的方法")
        }
    })

    //添加到原型上
    uTils.fn.extend({
        protoFunction: function () {
            console.log("这是原型上的方法")
        }
    })

    window.uTils = window.$u = uTils;
})(window)