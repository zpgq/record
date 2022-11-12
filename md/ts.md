## type和interface
- 相同点
    1. 都有继承机制
- 不同点
    1. type不能重复声明。 interface可以重复声明, 声明的类型会自动合并(类似extends)
    5. type通过&实现继承效果
    4. type可以通过|实现多类型声明
    2. type可以定义基本类型
    3. 可以通过typeof操作定义

## declare声明
    ```
    <script>
        var myMap = new Map();
    </script>
    <script src="./index.ts"/>

    // myMap.set('key', 'value'); // 直接使用报错

    // 先声明下类型就不会报错 ==>
    declare myMap: Map<string, string>; // 声明在运行上下文之中存在一个叫做 myMap 的变量
    myMap.set('key', 'value'); // 直接使用报错
    ```