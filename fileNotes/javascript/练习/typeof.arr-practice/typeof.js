// 数组去重
// 1.先var一个新函数
// 2.利用属性名相同
// 3.原型上写 object.prototype.函数名 = function
// Array.prototype.unique = function () {
//     var tem = {};
//     var arr = [];
//     for(var i = 0; i < this.length; i ++) {
//         if(!tem[this[i]]) {
//             tem[this[i]] = "abc";
//             arr.push(this[i]);
//         }
//     }
//     return arr;
// }




// typeof方法的封装
// 注意 
// 1.var个函数来接收数据判断
// 2.object.prototype.tostring.call[object]是用来区别包装类原始值，数组和对象的。
// function type(target) {
//     var tem = {
//         "[object Array]" : "Array",
//         "[object object]" : "Object",
//         "[object Number]" : "Number - object",
//         "[object Boolean]" : "Boolean - Object",
//         "[object String]" : "String - object"
//     }
//     if(target == null) {
//         return null;
//     }
//     if(typeof(target)== "function") {
//         return "function";
//     }
//     if(typeof(target) == "object") {
//         var str = tem.prototype.tostring.call[target];
//         return tem[str];
//     }eles{
//         return typeof(target);
//     }
// }