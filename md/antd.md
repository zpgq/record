## 1.1 表单(form)

### html

1. form.item 里面可以使用 data-name 自定义属性相对应关联属性(ts 使用 name 会报类型错误)

### css

1. 可能存在可编辑表格不能不能换行的情况, 可在 table 表情设置 table-layout: fiexd 属性来满足换行
2. 需要撑起 form.item 内的高度宽度子元素需要设置 display: inline-flex

### js

1. 校验

   - validator 时需要返回 promise 对象不然会提醒, 可以 return Prmise.resolve 或者 async validator() {}
   - 表单在 form.item 的 rules 的 validator 中设置关联校验 validateFields 会抛出异常, 得在 onChange 中去设置关联校验

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

2. defaultExpandAllRows 自动全部展开属性失效(这个属性只会渲染第一次的时候有效, 开始为空数组后面再异步拿值渲染 n 次即导致属性失效), 可给 table 设置 key 值, 每次都更新
3. form.Item 内一个输入框才受控, 若多个元素可用使用高阶组件封装输入框组件达受控效果**本质上就是 value, onChange, id**内部实现

   ```
      const ChildTest = (props) => {
          console.log("props--", props);
          return <div>1</div>;
      };

      const WrapDiv = ({ children, ...rest }) => {
          return React.createElement(
              "div",
              { name: 22 },
              React.cloneElement(children, { ...rest, value: 2 })
          );
      };

      export default function Test() {
          return (
              <WrapDiv>
                  <ChildTest />
              </WrapDiv>
          );
      }
   ```

## 1.2 可编辑表格(form 内套 table)

- 可能会有超出单元格的问题, 原因是 form.item 的 max-width 存在兼容性问题, 可设置 width: 100%, max-width: 100%
- 可编辑表格拓展行展开按钮隐藏属性 expandIconColumnIndex=-1, 此不在 antd 的 api 中但有效
