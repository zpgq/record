## webpack优化
1. 多入口
多个htmlWebpackPlugin
2. 抽离css
MiniCssExtractPlugin
3. 分割代码
```
optimization: {
    spliteChunks: {
        chunks: 'all',
        cacheGrops: {
            // 拆分第三方公共包
            vendor: {
                name: 'vendor', // chunk名字
                priority: 1, // 权重
                test: '/node_moduls/',
                minSize: 0, // 大小限制
                minChunks: 1, // 复用次数
            },
            common: {
                ...和vendor一样
            }
        }
    }
}

htmlWebpackPlugin({
    template: 'path.join(srcPath, 'index.html')',
    filename: 'index.html',
    chunks: ['index', 'vendor', 'common'] // 分割代码后需要引入对应的chunk
})
```
4. 懒加载
dymic
5. 出口output filename使用hashcontent


6. 优化打包速度
7. 优化产出代码


## 概念
1. modeule 模块 一切皆模块 如js、css、图片等等每个文件都是一个模块
2. chunk 多模块合并 如entry import() splitChunks
3. bundle 最终输出文件
