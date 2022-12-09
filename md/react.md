## ref 
- ref变化useRef并不会被通知, 可以借用useCallback ref、useState使其变成响应式
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

## useCallback、useMemo、memo
1. useCallback 对于子组件渲染优化 (配合memo用于优化子组件的渲染次数)
2. useMemo 对于当前组件高开销的计算优化
3. memo自动检测当前组件的props, 若改变则重新渲染当前组件
理解: 使用了useMemo和useCallback作用在子组件时, 需要配合memo才能减少子组件重新渲染

## state说明
- 相同
    1. 同作用域多次修改state会合并修改, 若不想合并参数可使用回调函数的方式
       ```
        // ==> + 1
        this.setState({count: this.state.count + 1})
        this.setState({count: this.state.count + 1})

        // ==> +2
        setCount((prev) => {
            return prev + 1
        });
        setCount((prev) => {
            return prev + 1
        });
       ```
- 区别
    1. class的state会浅合并(assign), useState不会
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
- 异步同步
- 注意项
    1. 改变成一个固定的对象会无限触发(**通过浅比较(Object.is)对比是否需要重新渲染**)
        ```
        const [count, setCount] = useState(0);
        () => setCount({name: 1})
        1. 当前count为0, 改成{name: 1};
        2. 当前count为{name: 1}, 改成{name: 1}
        3. 当前count为{name: 1}, 改成{name: 1}
            ....
        ```
    2. 原生事件直接打印状态为初始值不变化, 但在render内变化(**状态回调会返回上一次的值==>变化**)
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
    3. 在setState内会被缓存(即使是默认值也会被缓存), 无修改不会重新渲染(diff对比无变化)
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

        const [tabs, setTabs] = useState(tabLists[0]) // 缓存了tabLists[0], Test组件只渲染一次且props为{count: 0}
        const tabs = tabLists[0] // 未缓存, Test组件渲染两次props第二次打印为{count: 2}

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

## 实例
- 通过ref取值实例
    ```
    const handleChange = (event) => {
        const value = event.target.value
        const name = event.target.name;
        this.setState({
            [name]: value
        })
    }
    <input
        name='test'
        onChange={handleChange}
    >
    ```

## 受控和非受控组件
- 受控组件
在受控组件上指定 value 的 prop 会阻止用户更改输入。如果你指定了 value，但输入仍可编辑，则可能是你意外地将value 设置为 undefined 或 null。**value**
    ```
    this.state = {
        text: '1'
    }
    <input type="text" name="text" value={this.state.text} />
    ```
- 非受控组件
表单中的value会覆盖dom节点的值, 非受控组件推荐使用defaultValue, 不会造成 DOM 上值的任何更新。**defaultValue**
    ```
    this.input = React.createRef();
    <input type="text" ref={this.input} />
    console.log(this.input.current.value)
    ```

## 规范/小技巧
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
    - 使用useCallback的时候可以适当利用useState回调写法, 以防止改变依赖数据导致未更新数据
        ```
        const toggleModal = useCallback(() => {
            setState(prevState => ({
                ...prevState,
                modalOpen: !prevState.modalOpen
            }))
        }, [])
        ```