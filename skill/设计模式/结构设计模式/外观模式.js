/**
 * 外观模式
 * 1. 将一些兼容或者复杂的逻辑隐藏起来, 使其使用更加简化、更加语义化
 */
// 逻辑组合
var module = (function () {
    var _private = {
        i: 5,
        get: function () {
            console.log("current value:" + this.i);
        },
        set: function (val) {
            this.i = val;
        },
        run: function () {
            console.log("running");
        },
        jump: function () {
            console.log("jumping");
        }
    };
    return {
        // 私有方法
        facade: function (args) {
            _private.set(args.val);
            _private.get();
            if (args.run) {
                _private.run();
            }
        }
    };
}());

// Outputs: "current value: 10" and "running"
module.facade( {run: true, val:10} );

// 兼容
// var addMyEvent = function( el,ev,fn ){

//     if( el.addEventListener ){
//              el.addEventListener( ev,fn, false );
//        }else if(el.attachEvent){
//              el.attachEvent( "on" + ev, fn );
//        } else{
//             el["on" + ev] = fn;
//      }
 
//  };