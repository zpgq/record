## 1.1 表单(form)
- html
    1. form.item里面可以使用data-name自定义属性相对应关联属性(ts使用name会报类型错误)
- css
    1. 可能存在可编辑表格不能不能换行的情况, 可在table表情设置table-layout: fiexd属性来满足换行
    2. 需要撑起form.item内的高度宽度子元素需要设置display: inline-flex
- js
    1. 校验
        - validator时需要返回promise对象不然会提醒, 可以return Prmise.resolve 或者 async validator() {}
        - 表单在form.item的rules的validator中设置关联校验validateFields会抛出异常, 得在onChange中去设置关联校验
            ```
            validator(_, value) {
            const receivedAmount = getFieldValue([index, i, 'receivedAmount'])
                if (value && receivedAmount && receivedAmount <= value) {
                    return Promise.reject(new Error('下限必须小于上限'));
                }
                校验通过也会抛出异常造成阻塞 ==>
                expandEtableRef.validateFields([
                    [index, i, 'receivedAmount'],
                    [index, i, 'selfAmount']
                ]) 
                return Promise.resolve();
            }

            正常 ==>
            const onChange = () => {
                expandEtableRef.validateFields([
                    [index, i, 'receivedAmount'],
                    [index, i, 'selfAmount']
                ])
            }
            ```
    2. defaultExpandAllRows自动全部展开属性失效(这个属性只会渲染第一次的时候有效, 开始为空数组后面再异步拿值渲染n次即导致属性失效), 可给table设置key值, 每次都更新

## 1.2 可编辑表格(form内套table)
- 可能会有超出单元格的问题, 原因是form.item的max-width存在兼容性问题, 可设置width: 100%, max-width: 100%
- 可编辑表格拓展行展开按钮隐藏属性expandIconColumnIndex=-1, 此不在antd的api中但有效

