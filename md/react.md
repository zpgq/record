## ref变化useRef并不会被通知, 可以借用useCallback ref、useState使其变成响应式
    ``
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
    ``

## useCallback、useMemo、memo
1. useCallback 对于子组件渲染优化 (配合memo用于优化子组件的渲染次数)
2. useMemo 对于当前组件高开销的计算优化
3. memo自动检测当前组件的props, 若改变则重新渲染当前组件
理解: 使用了useMemo和useCallback作用在子组件时, 需要配合memo才能减少子组件重新渲染

## class的state
- 基于上一次的state上操作需要使用回调函数(state可能是异步的)
```
this.state = { count: 1}
this.setState(state => ({count: state.count + 1}))
```

## hooks的state
- 这个初始 state 参数只有在第一次渲染时会被用到 ==> **值未改变不会触发render(浅比较)**
  1. 改变成一个固定的原始值只触发两次render
     ```
     const [count, setCount] = useState({name: 1});
     () => setCount(1)
     1. 当前count为{name: 1}, 改成1;
     2. 当前count为1
     ```
  2. 改变成一个固定的对象会无限触发(**{} !== {}**)
     ```
     const [count, setCount] = useState(0);
     () => setCount({name: 1})
     1. 当前count为0, 改成{name: 1};
     2. 当前count为{name: 1}, 改成{name: 1}
     3. 当前count为{name: 1}, 改成{name: 1}
        ....
     ```