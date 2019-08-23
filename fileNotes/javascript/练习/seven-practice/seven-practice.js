// function jc(n) {
//     if(n == 1) {
//         return 1;
//     }
//     return n * jc(n-1);
// }




// 输入一个数字，逆转输出汉语
// function reverse() {
//     var str = '';
//     var num = parseInt(window.prompt('input'));
//     for(i = num.length - 1; i >= 0; i --) {
//         str += num[i];
//     }
//     document.write(str);
// }


// 加法累计
// function add() {
//     sum = 0;
//     for(i = 0; i < arguments.length; i ++){
//     sum += arguments[i];
//     }
//     document.write(sum);
// }
// add(1, 9);


// 问题是
// 1 case后面带的必须加上''。
// 2 需要有终止循环，不然会漏下来。
// 告知动物就能知道动物的叫声
// function sound(animal) {
//     switch(animal) {
//         case "dog":
//         console.log('wang!');
//         return;
//         case 'cat':
//         console.log('miao');
//         return;
//         case 'chiken':
//         console.log('jiji');
//         return;
//     }
// }
// sound('cat');