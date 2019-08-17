// 写出一个方法求字符串字节的长度
// var str = "213131ddq"
// function bytesLength(str) {
//     var count = str.length;
//     for(var i = 0; i < str.length; i ++) {
//         if(str.charCodeAt(i) > 255) {
//             count ++;
//         }
//     }
//     return count;
// }
// var str = "d212e2fjsnfj";
// function bytesLength(str) {
//     var count = 0;
//     for (var i = 0; i < str.length; i++) {
//         if (str.charCodeAt(i) > 255) {
//             count += 2;
//         } else {
//             count ++;
//         }
//     }
//     return count;
// }