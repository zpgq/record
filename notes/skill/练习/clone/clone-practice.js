// 克隆
// 遍历对象（for in）
// 1.判断是不是原始值 typrof()
// 2.判断是数组还是对象 三种方法
// 3.建立相应的数组和对象。
// 递归
// 注意：
// 1，原始值可以直接复制因为原始值在栈内存里面
// 2，引用值复制的是栈，但是引用值复制的是地址，所以要循环里面的知道是原始值。
function deepClone(target, origin) {
    var origin = origin || {};
        toStr = origin.prototype.toString
        toArr = "[object Array]" ;
        if(prop in target) {
            if(target.hasOwnproperty[prop]) {
                if(toStr.call(target[prop]) == toArr) {
                    target[prop] == [];
                }else{
                    target[prop] == {};
                }
                deepClone(target[prop], origin[prop]);
            }else{
                origin[prop] = target[prop]
            }
        }
}