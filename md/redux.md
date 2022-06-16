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