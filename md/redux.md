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


## 通过Provide, connect使用redux(可以将组件内的方法和state转化成props)
1. 创建好store, reducer, action
2. 要用的组件使用Provider包裹一下传递store
   ```
    import store from '../redux/store'
    <Provider store={store}>
        <TodoList />
    <Provider>
   ```
3. 使用和操作
    ```
        class Redux extends Component {
           render() {
             const {inputChange, onClickBtn, list, inputValue } = this.props
             return (
               <div>
                 <input value={inputValue} onChange={inputChange}/>
                 <button onClick={onClickBtn}>提交</button>
                 <ul>
                   {
                     list.map( (item, index) => {
                       return (<li key={index}> { item } </li>)
                     })
                   }
                 </ul>
               </div>
             )
           }
         }

         // 组件的state转化成props
         const stateToProps = (state) => {
           return {
             inputValue: state.inputValue,
             list: state.list
           }
         }

         // 组件的方法转化成props
         const dispatchToProps = (dispatch) => {
           return {
             inputChange(e) {
               let action = {
                 type: CHANGE_INPUT,
                 value: e.target.value
               }
               dispatch(action)
             },
             onClickBtn() {
               let action = {
                 type: ADD_ITEM
               }
               dispatch(action)
             }
           }
         }

         export default connect(stateToProps, dispatchToProps)(Redux)
    ```