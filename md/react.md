# react-router
## 路由跳转的三种方法
1. 通过query传递参数
```
this.props.history.push('pathname/${query}')

path: 'pathname/:id'

this.props.match.query
```

2. 通过search
```
this.props.history.push('pathname?id=xx&name=xx')

path: 'pathname'

this.props.location.search
```

3. 通过state
```
this.props.history.push({pathname: 'pathname', state: 111})

path: 'pathname'

this.props.lcoation.state
```

## hash和history路由区别
- hash路由会带上#
- 刷新页面会丢失state

## 路由基础说明
- withRouter
将一般组件包装成路由组件, 即props.history

- switch
惰性匹配, 即匹配到了就不会往下匹配了

- BroserRouter
包裹路由

```
    <BrowserRouter>
        <Link to="pathname"></Link>
        <Switch>
            <Route path="pathname" component={component}>
        </Switch>
    </BrowserRouter>

    // Link中的to或者说push(pathname), 从上到下匹配匹配switch中的路由
```

# redux
- 工作流
store ==> reducers(prevState, action) ==> store

- reducers ==> 改变store函数
- store ==> createStore
- action ==> 调用reducers中的函数
- constant ==> 方法函数名常量文件

- 注意：改变状态不会更新页面, 需要setState才能更新页面

- 同步action, 即一个object
- 异步action, 即一个function