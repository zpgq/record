## ref变化useRef并不会被通知, 可以借用useCallback ref、useState使其变成响应式
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