## webpack优化
- 概念 一般从优化打包速度、优化产出代码两方面去优化
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
6. HappyPack开启多进程打包
```
new HappyPack({
    id: 'bable',
    loaders: ['bable-loader?cacheDirectory]
})
```
注意：小项目开启多线程会减低速度(进程开销)
7. ParalleUglifyPlugin压缩js
8. 使用dll优化
```
// 打包dll DllPlugin=>
// webpack.dll.js =>
entry: {
    react: ['react', 'react-dom']
},
output: {
    filename: '[name].dll.js',
    path: distParh,
    library: '_dll_[name]'
},
plugins: [
    new DllPlugin({
        name: '_dll_[name]',
        path: path.join(distPath, '[name].manifest.json') // 输出的映射文件
    })
]

// 脚本 =>
“scrirpts”： {
    "dll": "webpack --config build/webpack.dll.js" // dll的配置文件地址
}

// 使用打包好的dll DllReferencePlugin=>
// index.html文件 =>
<script src="./react.dll.js"></script>

// webpack.dll.js =>
plugins: [
    new DllReferencePlugin({
       manifest: require(path.join(distPath, 'react.mainfest.json')) // 引用映射文件
    })
]
```





## 概念
1. modeule 模块 一切皆模块 如js、css、图片等等每个文件都是一个模块
2. chunk 多模块合并 如entry import() splitChunks
3. bundle 最终输出文件
