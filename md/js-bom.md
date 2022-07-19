## hash路由和h5 history
1. 区别
 - hash路由onhashchange监听hash路由的变化
 - h5 history是通过onpopstate监听前进后退
 - h5 有封装好的pushState, replaceState
 - hash路由对url不明感, h5实现单页面项目需要后端设置都返回index.html