## type 和 interface

- 相同点
  1. 都有继承机制
- 不同点
  1. type 不能重复声明。 interface 可以重复声明, 声明的类型会自动合并(类似 extends)
  2. type 通过&实现继承效果
  3. type 可以通过|实现多类型声明
  4. type 可以定义基本类型
  5. 可以通过 typeof 操作定义

## declare 声明

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
