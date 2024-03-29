## state

- 相同

  1. 同作用域多次修改 state 会合并修改, 若不想合并参数可使用回调函数的方式

     ```
      const [count, setCount] = useState(0)
      this.state = {count: 0}
      // ==> 多次修改state会合并修改
      setCount(count + 1) // 1
      setCount(count + 1) // 1

      this.setState({count: this.state.count + 1}) // 1
      this.setState({count: this.state.count + 1}) // 1

      // ==> 不想合并参数可使用回调函数的方式
      setCount((prev) => prev + 1); // 2
      setCount((prev) => prev + 1); // 3

      setState((prev) => ({count: prev + 1})) // 2
      setState((prev) => ({count: prev + 1})) // 3
     ```

- 区别

  1. class 的 state 会浅合并(assign), useState 不会

     ```
      // class ==>
      this.state = {
          posts: [],
          comments: []
      }
      this.setState({
          posts: response.posts
      }); // 第一次setState
      this.setState({
          comments: response.comments
      }); // 第二次setState会完整保留this.state.posts

      // hooks ==>
      const [obj, setObj] = useState({
          posts: [],
          comments: []
      })
      setObj({
         arr: res,
      })
      setObj((prevState) => ({
        ...prevState,
        arr1: res
      }))

     ```

- 注意项

  1. 改变成一个固定的对象会无限触发 re-render, 若改变成一个原始值则只会触发一次 re-render(通过浅比较(Object.is)对比上一次的值判断是否需要重新渲染)**每次 setState 都是重新声明一个变量覆盖原有的变量, 故导致改变成一个固定对象无限 re-render**

     ```
     // ==> 改变成一个固定的对象会无限触发re-render
     const [person, setPerson] = useState({age: 0});
     const handleClick = () => setPerson({age: 1})
     return (
         <div onClick={handleClick}>
             { Math.random() }
             { person.age }
         </div>
     )

     // ==> 改变成一个固定的对象会无限触发re-render
     const [person, setPerson] = useState(0);
     const handleClick = () => setPerson(1)
     return (
         <div onClick={handleClick}>
             { Math.random() }
             { person }
         </div>
     )
     ```

  2. 当 state 为一个引用值需要修改值时, 直接修改可能导致无法更新, 赋值给一个新变量在修改即可正常(**未赋值给一个新变量 Object.is 为 true(浅拷贝后操作深层数据后, 深层数据值作为依赖依据会更新)**)

     ```
     const [obj, setObj] = useState({name: 'before'})

     // ==> 直接赋值, 无更新
     const handleClick = () => {
         obj.name = 'after'
         setObj(obj)
     }
     return (
         obj.name // 'before'
     )

     // ==> 赋值给一个新变量, 在修改, 更新
     const handleClick = () => {
         const newObj = { ...obj }
         newObj.name = 'after'
         setObj(obj)
     }
     return (
         obj.name // 'after'
     )
     ```

     // ==> 浅拷贝后操作深层数据后, 深层数据值作为依赖依据会更新
     const [count, setCount] = useState(a: {b: 1})
     const handleClick = useCallback(() => {
     const newCount = {...count}
     console.log('newCount', newCount) // a: {b: 4}
     console.log('count', count) // a: {b: 4}
     newCount.a.b = 4
     setCount(newCount)
     }, [count.a.b])

     return (
     {count.a.b} // 点击后变成 4
     )

  3. 原生事件直接打印状态为初始值不变化, 但在 render 内变化(**状态回调会返回上一次的值==>变化**)

     ```
     const [count, setCount] = useState(0)
     document.addEventListener('click', () => {
         // 多次点击无变化 ==>
         setCount(1);
         console.log(count);
         // 点击变成1 ==>
         setCount(prevState => 1)
     })
     ```

  4. 在 setState 内会被缓存(即使是默认值也会被缓存), 无修改不会重新渲染(diff 对比无变化)**context 的 Provider 直接赋值总是新的值会重新渲染, 可以利用 state 初始值会被缓存的特性优化 context 防止过多渲染**

     ```
     const [count, setCount] = useState<any>(0);
     const tabLists: any = [
         {
             key: 1,
             comp: <Test count={count} />
         },
         {
             key: 2,
             comp: <Test1 count={count} />
         }
     ]

     // ==> 缓存了tabLists[0], Test组件只渲染一次且props为{count: 0}
     const [tabs, setTabs] = useState(tabLists[0])
     // ==> 未缓存, Test组件渲染两次props第二次打印为{count: 2}
     const tabs = tabLists[0]

     useEffect(() => {
         setCount(2)
     }, [])
     return (
         {
             tabs.comp
         }
     )

     // Test ==>
     const Test = (props) => {
         console.log(props);
     }
     ```

## ref

- ref 变化 useRef 并不会被通知, 可以借用 useCallback ref、useState 使其变成响应式

  ```
  function MeasureExample() {
  const [height, setHeight] = useState(0);

  const measuredRef = useCallback(node => {
      if (node !== null) {
          setHeight(node.getBoundingClientRect().height);
      }
  }, []);

  return (
      <>
          <h1 ref={measuredRef}>Hello, world</h1>
          <h2>The above header is {Math.round(height)}px tall</h2>
      </>
  );
  }
  ```

- 自定义属性传递 ref 和使用 ref 属性传递 ref 能达到一样的效果, 推荐尽量使用 ref 传递 ref(**不会透传, 下一级组件接收上一级组件所有属性时, 不会接收多余自定义的 ref 属性**)

## useCallback、useMemo、memo(**使用了 useMemo 和 useCallback 作用在子组件时, 需要配合 memo 才能减少子组件重新渲染**)

- useCallback 对于子组件渲染优化 (配合 memo 用于优化子组件的渲染次数)
- useMemo 对于当前组件高开销的计算优化
- memo 自动检测当前组件的 props, 若改变则重新渲染当前组件
- 使用后注意项

  - useState 中利用 setCount 回调函数, 修改原有的值不会受 useMemo, useCallback 的影响, 而直接在外面修改 count 会使用缓存中的值 0, 导致一直是 1

    ```
    const [count, setCount] = useState(0)

    // ==> 使用回调
    const handleClick = useCallback(() => {
        console.log('count', count) // 0
        setCount((prevCount: any) => {
            console.log('prevCount', prevCount) // 累加1, 2, 3
            return prevCount + 1
        })
    }, [])

    // ==> 直接在外面修改state
    const handleClick = useCallback(() => {
        console.log('count', count) // 一直是0
        const newCount = count + 1 // 一直是1
        setCount(newCount)
    }, [])

    const renderButon = useMemo(() => {
        return (
            <div onClick={handleClick}>点击获取count</div>
        )
    }, [])
    ```

## 受控和非受控组件

- 受控组件
  在受控组件上指定 value 的 prop 会阻止用户更改输入。如果你指定了 value，但输入仍可编辑，则可能是你意外地将 value 设置为 undefined 或 null。**value**
  `    this.state = {
        text: '1'
    }
    <input type="text" name="text" value={this.state.text} />
   `

- 非受控组件
  表单中的 value 会覆盖 dom 节点的值, 非受控组件推荐使用 defaultValue, 不会造成 DOM 上值的任何更新。**defaultValue**
  `    this.input = React.createRef();
    <input type="text" ref={this.input} />
    console.log(this.input.current.value)
   `

## 组件通讯

- 父组件获取子组件的函数, 函数触发时机在父函数上(**hooks useImperativeHandle, class 组件可以直接访问实例**)

  ```
  // ==> 父组件声明ref并使用
  const getSonRef = useRef();
  const handleClick = () => {
      // ==> 触发时机
      ref.current.getData()
  }

  // ==> 子组件接受ref声明函数执行子组件的函数
  const getData = () => {
      console.log('getData')
  }
  useImperativeHandle(getSonRef, () => ({
      getData() {
          getData()
      }
  }))

  // ==> 组组件为class组件时
  class Son extends React.component {
      getData = () => {
           console.log('子函数')
      }
  }
  ```

- 父组件获取子组件的函数, 函数触发时机在子函数身上(**高阶函数**)

  ```
  const CommentListWithSubscription = withSubscription(
      CommentList,
      (DataSource, props) => DataSource.getComments(props.id)
  );

  function withSubscription(WrappedComponent, selectData) {
      // ...并返回另一个组件...
      return class extends React.Component {
          constructor(props) {
          super(props);
          this.handleChange = this.handleChange.bind(this);
          this.state = {
              // ==> 触发时机
              data: selectData(DataSource, props)
          };
          }

          componentDidMount() {
              // ...负责订阅相关的操作...
              DataSource.addChangeListener(this.handleChange);
          }

          componentWillUnmount() {
              DataSource.removeChangeListener(this.handleChange);
          }

          handleChange() {
              this.setState({
                  // ==> 触发时机
                  data: selectData(DataSource, this.props)
              });
          }

          render() {
              // ... 并使用新数据渲染被包装的组件!
              // 请注意，我们可能还会传递其他属性
              return <WrappedComponent data={this.state.data} {...this.props} />;
          }
      };
  }
  ```

## 规范

- hooks
  - 组件封装
    1. 小驼峰封装组件**组件是封装到当前组件内**
       ```
       const renderList = () => <div></div>
       ```
    2. 大头峰封装组件**组件是封装到当前组件外**
       ```
       <List />
       ```

## jsx

- 假值(0 会被渲染, 其他假值则不会被渲染出来)

## 总结

- react 改变数据最好不要修改原数据, 因为 1. 在很多 api 内可以拿到上一次的数据且将其用于比较。 2. 直接修改原数据可能造成不更新(**useState**)
- 高阶组件需要注意 ref, key, 容器组件属性(高阶组件不建议直接修改传入组件, 一般通过组合方式实现功能如下)
  ```
  function logProps(WrappedComponent) {
  return class extends React.Component {
  componentDidUpdate(prevProps) {
  console.log('Current props: ', this.props);
  console.log('Previous props: ', prevProps);
  }
  render() {
  // 过滤掉非此 HOC 额外的 props，且不要进行透传
  const { extraProp, ...passThroughProps } = this.props;

                    // 将 input 组件包装在容器中，而不对其进行修改。Good!
                    return <WrappedComponent {...this.passThroughProps} />;
                }
            }
        }
        ```

## fiber

1. 调度器
2. 创建列队任务
3. 更新 fiber
4. 处理更新列队
