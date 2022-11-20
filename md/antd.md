## 1.1 表单(form)
- html
    1. form.item里面可以使用data-name自定义属性相对应关联属性(ts使用name会报类型错误)
- css
    1. 可能存在可编辑表格不能不能换行的情况, 可在table表情设置table-layout: fiexd属性来满足换行
    2. 需要撑起form.item内的高度宽度子元素需要设置display: inline-flex
- js
    1. validator需要返回promise对象不然会提醒, 可以return Prmise.resolve 或者 async validator() {}
    2. 表单在validator中使用validateFields会抛出异常, 提交在校验会造成阻塞