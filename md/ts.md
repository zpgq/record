## type和interface
- 相同点
    1. type通过&, interface通过extends(声明的类型都要满足, 即继承)
- 不同点
    1. type不能重复声明。 interface可以重复声明, 声明的类型会自动合并(类似extends)
    2. type可以定义基本类型
    3. 可以通过typeof操作定义
    4. type可以通过|实现多类型声明
