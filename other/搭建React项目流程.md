#	从零开始搭建React项目

###	安装Create-React-App

​	项目搭建是基于create-react-app脚手架的，以前开发过程中，也曾自己搭建过一些脚手架，由于水平有限，对于webpack实在玩不熟，最后考虑到效率和普及性，决定还是使用官方脚手架，再做一些适应性调整。好了，话多说，首先本地安装node之后(可以安装一下yarn)命令行运行

```json
npm install -g create-react-app 
//或者
yarn install -g create-react-app
```

​		安装如果较慢的话，可以尝试切换为淘宝的镜像源，这样可能会稍微快一点。

```json
npm config set registry https://registry.npm.taobao.org
//
yarn config set registry https://registry.npm.taobao.org
```

###	创建项目

​		安装完脚手架之后，就可以创建项目。找一个存放项目的文件夹，进入到命令行，运行命令

```json
create-react-app my-app
```

​		创建项目的快慢，根据自己网速，一版都不会太慢。创建完成之后，项目目录如下：

```json
├─.git
├─node_modules //项目依赖包。
├─public
│      favicon.ico
│      index.html
│      logo192.png
│      logo512.png
│      manifest.json
│      robots.txt
├─src
│       App.css
│       App.js
│       App.test.js
│       index.css
│       index.js
│       logo.svg
│       serviceWorker.js
│       setupTests.js 
│  .gitignore
│  package.json
│  README.md
│  yarn.lock
```

进入项目目录，启动运行

```json
cd my-app //进入到my-app的目录下
//启动运行
npm start
//或者
yarn start
```

​	项目启动成功之后，浏览器会自动打开http://localhost:3000端口，看到下图我们的项目就算创建成功了。

![](D:\Typroa\assets\1590396008200.png)

###	安装antd-design

```js
yarn add antd
//
npm install antd -D
```

安装成功之后，修改App.js

```js
import React from 'react';
import {Button } from 'antd';
import 'antd/dist/antd.css';
function App() {
  return (
    <div style={{textAlign:"center",marginTop:100}}>
          <Button type="primary">测试</Button>
   </div>
  );
}

export default App;
```

再次启动运行项目，在浏览器访问http://localhost:3000，看到下图，证明antd-design安装成功。

![](D:\Typroa\assets\1590717908921.png)

### 配置按需加载

​		项目打包时，如果不配置按需加载，项目打包时，会将所有安装的依赖打包进来，造成项目体积大，影响加载速度，配置按需加载安装react-app-rewired和babel-plugin-import插件，命令如下。

```js
npm install react-app-rewired babel-plugin-import 
//或者
yarn add react-app-rewired babel-plugin-import  -D
```

​		安装完成之后，调整package.json文件的项目运行命令scripts

```js
"scripts": {
   	 /*"start": "react-scripts start",*/-
    "start": "react-app-rewired start",
    /*"build": "react-scripts build",*/-
    "build": "react-app-rewired build", 
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```

​		做完之后，再次启动项目，我们会发现项目启动失败，提示找不到config-overrides.js文件，因为配置按需加载需要对create-react-app的一些配置进行覆盖，所以我们需要自己写一些配置。按照提示在项目的跟目录下创建config-overrides.js

```json
├─.git
├─node_modules //项目依赖包。
├─public
│      favicon.ico
│      index.html
│      logo192.png
│      logo512.png
│      manifest.json
│      robots.txt
├─src
│       App.css
│       App.js
│       App.test.js
│       index.css
│       index.js
│       logo.svg
│       serviceWorker.js
│       setupTests.js 
│  .gitignore
│  package.json
│  config-overrides.js  +
│  README.md
│  yarn.lock
```

​		覆盖create-react-app的配置，我们需要借助customize-cra工具，有兴趣的话，可以在github看一下customize-cra的文档，里面有对一些接口的说明。

```json
yarn add customize-cra
//或者
npm install customize-cra -D
```

​		安装成功之后，修改config-overrides.js文件

```json
const {
    override,
    fixBabelImports,
} = require('customize-cra');
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    })
)
```

再次启动项目之后，项目启动成功，如上2图。但是还有一个问题存在，需要手动引入样式，我们修改一下APP.js,不再手动引入样式

```js
import React from 'react';
import {Button } from 'antd';
//import 'antd/dist/antd.css';
function App() {
  return (
    <div style={{textAlign:"center",marginTop:100}}>
          <Button type="primary">测试</Button>
   </div>
  );
}

export default App;
```

页面刷新之后，我们会发现页面按钮的样式丢失。如下所示：

![1590722490108](D:\Typroa\assets\1590722490108.png)

###	配置less ，less-loader

​		为了解决手动引用样式问题，方便全局配置antd不同的样式，同时也方便我们对antd的一些样式做一些调整，适应我们自己的项目（写css覆盖antd样式会不生效，有兴趣可以尝试一下）需要安装less，less-loader，

```
yarn add less less-loader
//或者
npm install less less-loader -D
```

​		安装成功之后，再次修改config-overrides.js。

```js
const {
    override,
    fixBabelImports,
    addLessLoader
} = require('customize-cra');
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({//less-loader6.x配置
        lessOptions: {
            javascriptEnabled: true,
            modifyVars: {
                '@primary-color': '#1DA57A'//配置主题颜色；antd提供了其它主题颜色，可根据需要进行切换
            },
        },
    })
)
//less-loader5.x配置
// addLessLoader({ //配置主题颜色
//        javascriptEnabled: true,
//        modifyVars: {
//           '@primary-color': '#1890ff',
//           '@font-size-base': '15px'
//      },
//}),
```

​		注意最新安装的less-loader都是最新的6.x版本，如果是5.x版本，请按照5.x版本的配置。再次启动项目，我们会发现按钮样式出现。

到此为止，一个react+antd项目基本上就算搭建完成了。下面我们可以做一些相应的优化。

### 替换moment.js

​		antd的底层用了一些moment.js,打包进去的话，会造成项目体积过大。我们可以使用day.js这个更小巧的插件。

```
yarn add antd-dayjs-webpack-plugin
//或者
npm install antd-dayjs-webpack-plugin -D
```

​	安装成功之后，再次修改config-overrides.js

```js
const {
    override,
    fixBabelImports,
    addLessLoader,
    addWebpackPlugin
} = require('customize-cra');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        lessOptions: {
            javascriptEnabled: true,
            modifyVars: {
                '@primary-color': '#1DA57A'
            },
        },
    }),
    addWebpackPlugin( //使用day.js替换moment,减小打包时的体积
        new AntdDayjsWebpackPlugin()
    ),
)
```

### 关闭sourceMap

​		create-react-app在打包之后，在build文件夹下除了js文件，我们还会看到后缀为.map的文件，这是为了方便开发时在浏览器调试使用的，但是当项目部署上线的时候，这些内容就没有作用了，如果部署上去，会造成源码泄漏的风险。所以在打包时，需要关闭sourceMap模式。再次修改config-overrides.js。

```js
const {
    override,
    fixBabelImports,
    addLessLoader,
    addWebpackPlugin
} = require('customize-cra');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
if (process.env.NODE_ENV === 'development') {//开发模式开启sourceMap
    process.env.GENERATE_SOURCEMAP = "true";
} else if (process.env.NODE_ENV === 'production') {//打包模式关闭sourceMap
    process.env.GENERATE_SOURCEMAP = "false";
}
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        lessOptions: {
            javascriptEnabled: true,
            modifyVars: {
                '@primary-color': '#1DA57A'
            },
        },
    }),
    addWebpackPlugin( //使用day.js替换moment,减小打包时的体积
        new AntdDayjsWebpackPlugin()
    ),
)
```

###	配置路径（alias）别名

​		在实际的项目开发中，我们经常会遇到引用组件或者工具函数出现下面的情况,

```josn
import Header from '../../../../components/Header';
```

这样看起来，不方便引用，也不美观，配置路径别名，可以更方便我们的引用。再次修改config-overrides.js

```js
const {
    override,
    fixBabelImports,
    addLessLoader,
    addWebpackPlugin,
    addWebpackAlias
} = require('customize-cra');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const path = require("path");
if (process.env.NODE_ENV === 'development') {
    process.env.GENERATE_SOURCEMAP = "true";
} else if (process.env.NODE_ENV === 'production') {
    process.env.GENERATE_SOURCEMAP = "false";
}
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        lessOptions: {
            javascriptEnabled: true,
            modifyVars: {
                '@primary-color': '#1DA57A'
            },
        },
    }),
    addWebpackPlugin( //使用day.js替换moment,减小打包时的体积
        new AntdDayjsWebpackPlugin()
    ),
    addWebpackAlias({//配置路径别名
        "@": path.resolve(__dirname, "src")
    }),
)
```

###	开启Gzip

​		首屏的加载速度会直接影响到用户的体验，所以为了提高加载速度，我们都是尽可能的压缩项目体积，或者采取动态加载，分包方式，外部引用等方式，优化体验。下面说的是开启Gzip的方式，项目打包生成.gz文件，再配合ngnix部署，提升加载速度。借助插件compression-webpack-plugin，可以完成此项配置。

```json
yarn add compression-webpack-plugin
//或者
npm install compression-webpack-plugin -D
```

​		安装成功之后，修改config-override.js文件。

```js
const {
    override,
    fixBabelImports,
    addLessLoader,
    addWebpackPlugin,
    addWebpackAlias,
} = require('customize-cra');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const path = require("path");
if (process.env.NODE_ENV === 'development') {
    process.env.GENERATE_SOURCEMAP = "true";
} else if (process.env.NODE_ENV === 'production') {
    process.env.GENERATE_SOURCEMAP = "false";
}
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        lessOptions: {
            javascriptEnabled: true,
            modifyVars: {
                '@primary-color': '#1DA57A'
            },
        },
    }),
    addWebpackAlias({ //配置路径别名
        "@": path.resolve(__dirname, "src")
    }),
    addWebpackPlugin((config) => {
        config.options.plugins.push(new AntdDayjsWebpackPlugin()); //替换moment包
        config.options.plugins.push( //打包开启gzip的压缩
            new CompressionWebpackPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: /\.js$|\.css$|\.html$/,
                threshold: 10240,
                minRatio: 0.8,
            })
        )
    })
)
```





