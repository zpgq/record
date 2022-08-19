var designWidth = 750;  		// 设计稿宽度
var remPx = 200;               // 在屏幕宽度375px，的时候，设置根元素字体大小 100px
var scale = window.innerWidth / designWidth; //计算当前屏幕的宽度与设计稿比例
document.documentElement.style.fontSize = scale*remPx + 'px';