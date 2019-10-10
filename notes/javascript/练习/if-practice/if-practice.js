// 用else if一定要满足互斥（一个数字不可能同时满足两条语句）
var score = parseInt(window.prompt('input'));
if(score >=90 && score <= 100){
    document.write("ali");
}
else if(score >=80 && score <90){
    document.write('tencent');
}
else if(score >= 70 && score <80){
    document.write('baidu');
}
else if(score >=60 && score <70){
    document.write('mogu');
}
else if(score<60){
    document.write('你肯定不是我的');
}


// 全部会执行一遍效率低一点
// var score = parseInt(window.prompt('input'));
// if(score >=90 && score <= 100){
//     document.write("ali");
// }
// if(score >=80 && score <90){
//     document.write('tencent');
// }
// if(score >= 70 && score <80){
//     document.write('baidu');
// }
// if(score >=60 && score <70){
//     document.write('mogu');
// }
// if(score<60){
//     document.write('你肯定不是我的');
// }
