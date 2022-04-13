# React开发教程

学习地址：https://react.docschina.org/docs/react-component.html

学习地址：https://www.jspang.com/detailed?id=50

### 1、创建组件

```javascript
import React from 'react'

function HelloWorld() {
    return (
        <div>
            Hello World
        </div>
    )
}

export default HelloWorld
```

- 在VsCode编辑器中，安装  **ES7 React/Redux/GraphQL/React-Native**插件后，可以使用快捷命令 **rfec**创建组件。

- return 返回的内容只可以是一个标签，如果要返回多个标签可以使用**Fragment**进行包裹。不要使用具体Html标签进行包裹，具体的Html标签会编译成真实的DOM，可能会影响样式。

  ```javascript
  import React, { Fragment } from 'react'
  
  function HelloWorld() {
      return (
          <Fragment>
              <h1>Hello World</h1>
              <h1>Hello React</h1>
          </Fragment>
      )
  }
  
  export default HelloWorld
  ```

- 直接书写行内样式，**注意将CSS中带有中划线的样式名称换为小驼峰格式**。如 font-size --> fontSize 、background-color -->backgroundColor。

  ```javascript
  import React, { Fragment } from 'react'
  
  function HelloWorld() {
      return (
          <Fragment>
               <h1 style={{ color: "red", fontSize: "12px" }}>Hello World</h1>
               <h1 style={{ color: "blue" }}>Hello React</h1>
          </Fragment>
      )
  }
  
  export default HelloWorld
  ```

- 定义样式对象，再放在行内。可以提取公共样式，通过解构赋值的方式，将样式放在行内。

  ```javascript
  import React, { Fragment } from 'react'
  
  function HelloWorld() {
      return (
          <Fragment>
              <h1 style={{ ...styles.titleStyle, fontSize: "18px" }}>Hello World</h1>
              <h1 style={{ ...styles.titleStyle, fontSize: "20px" }}>Hello React</h1>
              <h1 style={styles.cssStyle}>Hello Css </h1>
          </Fragment>
      )
  }
  
  const styles = {
      titleStyle: {//提取公共样式
          color: "blue"，
      },
      cssStyle: {
          color: "blue",
          fontSize: "16px"
      }
  }
  export default HelloWorld
  
  ```

- 外部样式引入，定义类名，外部定义less文件。

  ```less
  .box {
    width: 100px;
    height: 100px;
    background-color: red;
    margin: auto;
  }
  ```

  ```javascript
  import React, { Fragment } from 'react'
  import './index.less';
  function HelloWorld() {
      return (
          <Fragment>
              <h1 style={{ ...styles.titleStyle, fontSize: "18px" }}>Hello World</h1>
              <h1 style={{ ...styles.titleStyle, fontSize: "20px" }}>Hello React</h1>
              <h1 style={styles.cssStyle}>Hello Css </h1>
              <div className="box"></div>
  
          </Fragment>
      )
  }
  
  const styles = {
      titleStyle: {//提取公共样式
          color: "blue"
      },
      cssStyle: {
          color: "blue",
          fontSize: "16px"
      }
  }
  export default HelloWorld
  
  ```

- 渲染变量，模板语法。

  ```javascript
  import React, { Fragment } from 'react'
  import './index.less'
  function HelloWorld() {
      const name = "彭于晏"
      const description = "小鲜肉"
      return (
          <Fragment>
              <h1 style={{ ...styles.titleStyle, fontSize: "18px" }}>Hello World</h1>
              <h1 style={{ ...styles.titleStyle, fontSize: "20px" }}>Hello React</h1>
              <h1 style={styles.cssStyle}>Hello CSS </h1>
              <div className="box"></div>
              <h1>{name}</h1>
              <h2>{`描述:${description}`}</h2>
          </Fragment>
      )
  }
  
  const styles = {
      titleStyle: {//提取公共样式
          color: "blue"
      },
      cssStyle: {
          color: "blue",
          fontSize: "16px"
      }
  }
  export default HelloWorld
  
  ```

### 2、useState的介绍和多状态声明

- 使用ES6的数组解构进行声明，声明状态时应注意语义化命名。

  ```javascript
  const [count,setCount]=useState(0)
  ```

- 读取并渲染状态：模板语法

  ```javascript
  <p>点击次数:{count}<p>
  ```

- 更新状态

  ```javascript
  //不传参数
  function handleClick (){
      setCount(count++)
  }
  <Button type = "primary" onClick={handleClick}></Button>
  // 传递参数
  function handleClick(num){
      setCount(count+num)
  }
  <Button type = "primary" onClick={()=>{handleClick(10)}}></Button>
  ```

- 声明多个状态，除一些特殊公认的状态如（pageNum，loading）外，其余状态后应该加上注释进行说明。渲染数组循环时应在标签上加key属性，key值设置以数组自身id为最优。

  ```javascript
  //数组对象等类型命名时后面加上对象类型
    const [newsType, setNewsType] = useState("热点") //热点榜单
    const [newsArray, setNewsArray] = useState([
          {
              id: "1",
              title: "青岛未发现新增阳性感染者",
              content: "10月13日，据青岛市卫健委通报，截至10月13日8时，我市已采样3078528份进行核酸检测，未发现新增阳性感染者。",
              time: "2020-10-13",
              source: "青岛市卫健委"
          },
          {
              id: "2",
              title: "官方回应中国海洋大学化粪池爆炸",
              content: "此前，有网友爆料中国海洋大学一化粪池疑似发生“爆炸”。13日，中国海洋大学官方微博发布回应此事：今天凌晨，学校崂山校区外相邻的马路发生下水道冒溢，不存在“化粪池爆炸”。市政正在处理，请大家放心！",
              time: "2020-10-14",
              source: "中国海洋大学"
          },
          {
              id: "3",
              title: "鸡西酸汤子中毒已致8人死亡",
              content: "黑龙江省鸡西市鸡东县某家庭聚餐引发中毒造成7人死亡的事件。12日，记者获悉，此前在牡丹江市红旗医院救治的62岁的李女士于11日晚不幸去世。这起中毒事故死亡人数升至8人。",
              time: "2020-10-8",
              source: "央视新闻客户端"
          },
      ]);//新闻列表
    const [newsDetailObject, setNewsDetailObject] = useState(
          {
              id: "1",
              title: "青岛未发现新增阳性感染者",
              content: "10月13日，据青岛市卫健委通报，截至10月13日8时，我市已采样3078528份进行核酸检测，未发现新增阳性感染者。",
              time: "2020-10-13",
              source: "青岛市卫健委",
              detail: "截至10月13日8时，全市已排查到密切接触者144人，全部实行集中隔离观察并采样检测，除其中9人核酸检测结果阳性并已及时发布外，其余均为阴性；密切接触者的密切接触者207人，全部实行集中隔离观察并采样检测，结果均为阴性；一般接触者859人，全部完成核酸检测，结果均为阴性；医务人员、住院病人及陪护人员170867人已完成核酸检测采样，已出结果163006人，均为阴性；社区检测人群2906448人已完成核酸检测采样，已出结果943664人，均为阴性。"
          }
      )//新闻详情内容
    
   // 渲染状态
  return (
  	<Fragment>
        <h1>{newsType}</h1>
              <ul>
                  {
                      newsArray.map((item) => {
                          return (
                              <li key={item.id}>{item.title}</li>
                          )
                      })
                  }
              </ul>
              <div style={{ width: 300, height: 400, border: "1px solid #f1f1f1" }}>
                  <h2>{newsDetailObject.title}</h2>
                  <p>{newsDetailObject.detail}</p>
              </div>
      </Fragment>
  )
  
  
  ```

  Example：

  ```javascript
  import React, { Fragment, useState } from 'react'
  
  function StateExample() {
      const [newsType, setNewsType] = useState("热点") //热点榜单
      const [newsArray, setNewsArray] = useState([
          {
              id: "1",
              title: "青岛未发现新增阳性感染者",
              content: "10月13日，据青岛市卫健委通报，截至10月13日8时，我市已采样3078528份进行核酸检测，未发现新增阳性感染者。",
              time: "2020-10-13",
              source: "青岛市卫健委"
          },
          {
              id: "2",
              title: "官方回应中国海洋大学化粪池爆炸",
              content: "此前，有网友爆料中国海洋大学一化粪池疑似发生“爆炸”。13日，中国海洋大学官方微博发布回应此事：今天凌晨，学校崂山校区外相邻的马路发生下水道冒溢，不存在“化粪池爆炸”。市政正在处理，请大家放心！",
              time: "2020-10-14",
              source: "中国海洋大学"
          },
          {
              id: "3",
              title: "鸡西酸汤子中毒已致8人死亡",
              content: "黑龙江省鸡西市鸡东县某家庭聚餐引发中毒造成7人死亡的事件。12日，记者获悉，此前在牡丹江市红旗医院救治的62岁的李女士于11日晚不幸去世。这起中毒事故死亡人数升至8人。",
              time: "2020-10-15",
              source: "央视新闻客户端"
          },
      ]);//新闻列表
      const [newsDetailObject, setNewsDetailObject] = useState(
          {
              id: "1",
              title: "青岛未发现新增阳性感染者",
              content: "10月13日，据青岛市卫健委通报，截至10月13日8时，我市已采样3078528份进行核酸检测，未发现新增阳性感染者。",
              time: "2020-10-13",
              source: "青岛市卫健委",
              detail: "截至10月13日8时，全市已排查到密切接触者144人，全部实行集中隔离观察并采样检测，除其中9人核酸检测结果阳性并已及时发布外，其余均为阴性；密切接触者的密切接触者207人，全部实行集中隔离观察并采样检测，结果均为阴性；一般接触者859人，全部完成核酸检测，结果均为阴性；医务人员、住院病人及陪护人员170867人已完成核酸检测采样，已出结果163006人，均为阴性；社区检测人群2906448人已完成核酸检测采样，已出结果943664人，均为阴性。"
          }
      )//新闻详情内容
      return (
          <Fragment>
              <h1>{newsType}</h1>
              <ul>
                  {
                      newsArray.map((item) => {
                          return (
                              <li key={item.id}>{item.title}</li>
                          )
                      })
                  }
              </ul>
              <div style={{ width: 300, height: 400, border: "1px solid #f1f1f1" }}>
                  <h2>{newsDetailObject.title}</h2>
                  <p>{newsDetailObject.detail}</p>
              </div>
          </Fragment>
      )
  }
  
  export default StateExample
  
  ```

  注意：**useState不能出现在条件语句中，React的Hook的所有钩子都不能出现条件语句中**

  ```javascript
  let   = true;
  // 错误
  if(showNewsType){
       const [newsType, setNewsType] = useState("热点") //热点榜单
  }
  ```

  ### 3、useEffect的使用

  useEffect共接收两个参数，第一个是需要在useEffect中执行的，第二个是需要监听的属性。

  - 打印点击次数。

    ```javascript
    import React, { useEffect, useState } from 'react';
    import { Button } from 'antd';
    function EffectExample() {
        const [clickCount, setClickCount] = useState(0);
        useEffect(() => {
            console.log("点击次数", clickCount)
           
        }, [clickCount])
        return (
            <div>
                <Button type="primary" onClick={() => { setClickCount(clickCount + 1) }}>点我</Button>
                <p>当前点击次数{clickCount}</p>
            </div>
        )
    }
    export default EffectExample
    
    ```

  - 请求后端数据并渲染

    ```javascript
    import React, { useEffect, useState } from 'react';
    import { getNewsArray } from '../../server/indexAPI';
    function EffectExample() {
        const [newsArray, setNewsArray] = useState([]);
        useEffect(() => {
            (async function () {
                const { data } = await getNewsArray({ type: "cms_type_cms_type_notice", pageNum: 1, pageSize: 9 })
                const { records } = data;
                setNewsArray([...records]);
            })()
        }, [])
        return (
            <div>
                <ul>
                    {
                        newsArray.map((item) => {
                            return (
                                <li key={item.id}>{item.title}</li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
    ```

  - 请求后端数据渲染并实现分页

    ```javascript
    import React, { useEffect, useState } from 'react';
    import { getNewsArray } from '../../server/indexAPI';
    import defaultPagination from '../../config/defaultPagination';
    import { Table } from 'antd';
    function EffectExample() {
        const [newsArray, setNewsArray] = useState([]);//新闻列表
        const [total, setTotal] = useState(0)//数据总条数
        const [pageSize, setPageSize] = useState(2)//每页数据显示条数
        const [pageNum, setPageNum] = useState(1)
        useEffect(() => {
            (async function () {
                const { data } = await getNewsArray({ type: "cms_type_cms_type_notice", pageNum, pageSize })
                const { records, total } = data;
                setNewsArray([...records]);
                setTotal(total);
            })()
        }, [pageSize, pageNum])
        const pagination = {
            ...defaultPagination,
            total: total,
            pageSize: pageSize,
            current: pageNum,
            onChange: (page) => {
                setPageNum(page);
            },
        }
        const columns = [
            {
                title: "序号",
                render: (text, record, index) => (((pageNum - 1) * pageSize) + (index + 1)),
                align: "center",
                width: 80,
            },
            {
                title: "新闻标题",
                dataIndex: "title",
                width: 80,
            },
        ]
        return (
            <Table
                rowKey="id"
                size="small"
                columns={columns}
                dataSource={newsArray}
                pagination={pagination}
                bordered
            />
        )
    }
    export default EffectExample
    ```

    **注意 :useEffect依赖的属性尽可能简单，尽量不要依赖引用类型，如果依赖引用类型，该引用类型应该为不可变。**

    ### 4、useCallBack的使用

    ​		当我们对返回的新闻列表进行维护的时候，如删除一条新闻，这个时候，我们就需要更新一下列表中的数据。此时我们使用useEffect如何实现呢？

    ```javascript
    import React, { useEffect, useState, useCallback } from 'react';
    import { getNewsArray } from '../../server/indexAPI';
    import defaultPagination from '../../config/defaultPagination';
    import { Button, Modal, Table } from 'antd';
    
    function CallBackExample() {
        const [newsArray, setNewsArray] = useState([]);//新闻列表
        const [total, setTotal] = useState(0)//数据总条数
        const [pageSize] = useState(2)//每页数据显示条数
        const [pageNum, setPageNum] = useState(1)//当前页数
        const [loading, setLoading] = useState(false);
        const fetchNewsArray = useCallback(() => {
            setLoading(true);
            (async function () {
                const { data } = await getNewsArray({ type: "cms_type_cms_type_notice", pageNum, pageSize })
                const { records, total } = data;
                setNewsArray([...records]);
                setTotal(total);
                setLoading(false)
            })()
        }, [pageSize, pageNum])
        useEffect(() => {
            fetchNewsArray()
        }, [fetchNewsArray])
        // useEffect(() => {
        //     setLoading(true);
        //     if(loading){
        //         (async function () {
        //             const { data } = await getNewsArray({ type: "cms_type_cms_type_notice", pageNum, pageSize })
        //             const { records, total } = data;
        //             setNewsArray([...records]);
        //             setTotal(total);
        //             setLoading(false)
        //         })()
        //     }
        // }, [pageSize, pageNum，loading])
        function deleteSingleNews() {
            Modal.confirm({
                title: "确认删除",
                content: "删除一条新闻",
                onOk() {
                    fetchNewsArray()
                },
                onCancel() {
    
                }
            })
        }
        const pagination = {
            ...defaultPagination,
            total: total,
            pageSize: pageSize,
            current: pageNum,
            onChange: (page) => {
                setPageNum(page);
            },
        }
        const columns = [
            {
                title: "序号",
                render: (text, record, index) => (((pageNum - 1) * pageSize) + (index + 1)),
                align: "center",
            },
            {
                title: "新闻标题",
                dataIndex: "title",
            },
            {
                title: "操作",
                render: () => (<Button type="primary" danger onClick={() => { deleteSingleNews() }}>删除</Button>)
            },
        ]
        return (
            <Table
                rowKey="id"
                size="small"
                loading={loading}
                columns={columns}
                dataSource={newsArray}
                pagination={pagination}
                bordered
            />
        )
    }
    
    export default CallBackExample
    ```

    使用useCallback之后，我们可以把请求放在useCallback中，可以灵活根据场景需要进行调用。

    ### 5、useMemo的使用

    需求：点击按钮切换新闻单双数进行显示。

    ```javascript
    import { Button, Space } from 'antd';
    import React, { useState, useEffect, useMemo } from 'react'
    import { getNewsArray } from '../../server/indexAPI';
    function MemoExample() {
        const [newsArray, setNewsArray] = useState([]);//新闻列表
        const [shownOddOrEven, setShownOddOrEven] = useState("odd")
        useEffect(() => {
            (async function () {
                const { data, success } = await getNewsArray({ type: "cms_type_cms_type_notice", pageNum: 1, pageSize: 9 })
                if (success) {
                    const { records } = data;
                    setNewsArray([...records]);
                }
            })()
        }, [])
        const memoNewsHtml = useMemo(() => {
            let result = null;
            if (shownOddOrEven === "odd") {
                result = newsArray.map((item, index) => {
                    if ((index + 1) % 2 !== 0) {
                        return (
                            <li key={item.id}>{index + 1}、{item.title}</li>
                        )
                    } else {
                        return null
                    }
                })
            } else if (shownOddOrEven === "even") {
                result = newsArray.map((item, index) => {
                    if ((index + 1) % 2 === 0) {
                        return (
                            <li key={item.id}>{index + 1}、{item.title}</li>
                        )
                    } else {
                        return null
                    }
    
                })
            }
            return result
        }, [shownOddOrEven, newsArray])
        return (
            <div>
                <Space>
                    <Button type="primary" onClick={() => { setShownOddOrEven("odd") }}>单数</Button>
                    <Button type="primary" onClick={() => { setShownOddOrEven("even") }}>双数</Button>
                </Space>
                <ul>
                    {memoNewsHtml}
                </ul>
            </div>
        )
    }
    
    export default MemoExample
    ```

    ### 6、组件通信

    - 父组件向子组件通信，直接在子组件上添加属性。

      ```ja
      import { useState } from 'react'
      import Child from './Child'
      function Parent() {
          const [clickCount, setClickCount] = useState(0)
          return (
              <div>
                  <h1 onClick={() => { setClickCount(clickCount + 1) }}>我是父组件，我想在子组件中显示我的点击次数</h1>
                  <Child clickCount={clickCount} />
              </div>
          )
      }
      export default Parent
      
      
      import React from 'react'
      
      function Child({ clickCount }) {
          return (
              <div>
                  <h2>我是子组件，我显示父组件的点击次数{clickCount}</h2>
              </div>
          )
      }
      
      export default Child
      
      
      
      
      ```
  
    - 子组件向父组件通信，父组件向子组件中传递一个函数，在子组件中调用
  
      ```javascript
      import React from 'react'
      import { useState } from 'react'
      import Child from './Child'
      function Parent() {
          const [clickCount, setClickCount] = useState(0)
          const [childClickCount, setChildClickCount] = useState(0)
          return (
              <div>
                  <h1 onClick={() => { setClickCount(clickCount + 1) }}>我是父组件，我想在子组件中显示我的点击次数</h1>
                  <Child clickCount={clickCount} showChildCount={(count) => { setChildClickCount(count) }} />
                  <h2>我是父组件，我显示子组件的点击次数翻10倍，<span style={{ color: "green" }}>{childClickCount} </span> 实现子组件向父组件通信</h2>
            </div>
          )
    }
      
      export default Parent
      
      
      import React, { useState } from 'react'
      
      function Child({ clickCount, showChildCount }) {
          const [clickChildCount, setClickChildCount] = useState(0)
      
          function handleClick() {
              setClickChildCount((clickChildCount + 1) * 10)
              showChildCount((clickChildCount + 1) * 10)
          }
          return (
              <div>
                  <h2>我是子组件，我显示父组件的点击次数<span style={{ color: "red" }}>{clickCount}</span> </h2>
      
                  <h1 onClick={handleClick}>我是子组件，我要在父组件中显示我的点击次数，我的点击次数要乘以10</h1>
              </div>
          )
      }
      
      export default Child
      
      ```
  
      
  
    ### 7、路由的使用
  
    - 使用Link标签进行跳转页面，to属性可以接收字符和对象
  
    ```javascript
    import React, { Fragment } from "react";
    import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
    
    import HelloWorld from "./components/HelloWorld/HelloWorld";
    import StateExample from "./components/StateExample/StateExample";
    import EffectExample from "./components/EffectExample/EffectExample";
    import CallBackExample from "./components/CallBackExample/CallBackExample";
    import MemoExample from "./components/MemoExample/MemoExample";
    import { Button, Space } from "antd";
    function App() {
      return (
        <Fragment>
          <Router basename="/">
            {/* 字符串路径 */}
            <Space>
              <Link to="/hello/world">
                <Button type="primary">HelloWorld</Button>
              </Link>
              {/*  对象路径一般用于在路由中传递参数 */}
    
              <Link to={{ pathname: "/state/example", state: { abc: "12233" } }}>
                <Button type="primary">StateExample</Button>
              </Link>
            </Space>
            <Switch>
              <Route path="/hello/world" component={HelloWorld} exact={true} />
              <Route path="/state/example" component={StateExample} exact={true} />
              <Route
                path="/effect/example"
                component={EffectExample}
                exact={true}
              />
              <Route
                path="/callback/example"
                component={CallBackExample}
                exact={true}
              />
              <Route path="/memo/example" component={MemoExample} exact={true} />
            </Switch>
          </Router>
        </Fragment>
      );
    }
    export default App;
    ```

  - 接收路由中的参数，使用js进行跳转页面
  
    ```javascript
    import { Button } from 'antd';
    import React, { Fragment, useState } from 'react'
    
    function StateExample({ location, history }) {
        // 接收到的参数
        const { state } = location;
        const { abc } = state;
        console.log(abc)
    
        // 使用js方法跳转到其它页面
        function handleClick() {
            // 同样可以接收字符串和对象
            history.push("/effect/example")
        }
        //使用js方法回到上一页
        function handleBack() {
            history.goBack();
        }
        const [newsType, setNewsType] = useState("热点") //热点榜单
        const [newsArray, setNewsArray] = useState([
            {
                id: "1",
                title: "青岛未发现新增阳性感染者",
                content: "10月13日，据青岛市卫健委通报，截至10月13日8时，我市已采样3078528份进行核酸检测，未发现新增阳性感染者。",
                time: "2020-10-13",
                source: "青岛市卫健委"
            },
            {
                id: "2",
                title: "官方回应中国海洋大学化粪池爆炸",
                content: "此前，有网友爆料中国海洋大学一化粪池疑似发生“爆炸”。13日，中国海洋大学官方微博发布回应此事：今天凌晨，学校崂山校区外相邻的马路发生下水道冒溢，不存在“化粪池爆炸”。市政正在处理，请大家放心！",
                time: "2020-10-14",
                source: "中国海洋大学"
            },
            {
                id: "3",
                title: "鸡西酸汤子中毒已致8人死亡",
                content: "黑龙江省鸡西市鸡东县某家庭聚餐引发中毒造成7人死亡的事件。12日，记者获悉，此前在牡丹江市红旗医院救治的62岁的李女士于11日晚不幸去世。这起中毒事故死亡人数升至8人。",
                time: "2020-10-15",
                source: "央视新闻客户端"
            },
        ]);//新闻列表
        const [newsDetailObject, setNewsDetailObject] = useState(
            {
                id: "1",
                title: "青岛未发现新增阳性感染者",
                content: "10月13日，据青岛市卫健委通报，截至10月13日8时，我市已采样3078528份进行核酸检测，未发现新增阳性感染者。",
                time: "2020-10-13",
                source: "青岛市卫健委",
                detail: "截至10月13日8时，全市已排查到密切接触者144人，全部实行集中隔离观察并采样检测，除其中9人核酸检测结果阳性并已及时发布外，其余均为阴性；密切接触者的密切接触者207人，全部实行集中隔离观察并采样检测，结果均为阴性；一般接触者859人，全部完成核酸检测，结果均为阴性；医务人员、住院病人及陪护人员170867人已完成核酸检测采样，已出结果163006人，均为阴性；社区检测人群2906448人已完成核酸检测采样，已出结果943664人，均为阴性。"
            }
        )//新闻详情内容
        return (
            <Fragment>
                <h1>{newsType}</h1>
                <ul>
                    {
                        newsArray.map((item) => {
                            return (
                                <li key={item.id}>{item.title}</li>
                            )
                        })
                    }
                </ul>
                <div style={{ width: 300, height: 400, border: "1px solid #f1f1f1" }}>
                    <h2>{newsDetailObject.title}</h2>
                    <p>{newsDetailObject.detail}</p>
                </div>
                <Button type="primary" onClick={handleClick}> 走你</Button>
                <Button type="primary" onClick={handleBack}> 回去</Button>
            </Fragment>
        )
    }
    
    export default StateExample
    
    ```
  
    ### 8.规范组件开发
    
    ```javascript
    import React, { useEffect, useState } from 'react'
    import { Select } from 'antd';
    import isArray from 'lodash/isArray';
    import isUndefined from 'lodash/isUndefined';
    import { getNewsArray } from '../../server/indexAPI';
    const { Option } = Select;
    /**
     * @author <刘辉>
     * @constructor ZhProSelect
     * @description 封装Select选择控件
     * @version 1.0
     * @param {string|Array} option - 当为字符串时，从后端请求该字符串对应的字典，或者从localStorage中取对应的字典；当为数组时直接作为字典。
     * @param {string|Array|undefined} value - 默认初始值
     * @param {string|undefined} mode -多选：multiple；标签：tags；单选时不必传递。
     * @param {Function} onChange
     * 
     */
    
    function ZhProSelect({ option, mode, value, onChange }) {
        const [options, setOptions] = useState([])
        useEffect(() => {
            console.log(option)
            if (isArray(option)) {
                setOptions(option)
            } else if (!isUndefined(option)) {
                let localOptions = localStorage.getItem(option);
                if (localOptions) {
                    setOptions(JSON.parse(localOptions));
                } else {
                    (async function () {
                        const { data } = await getNewsArray({ type: "cms_type_cms_type_notice", pageNum: 1, pageSize: 9 })
                        const { records } = data;
                        setOptions(records)
                    })()
                }
            }
        }, [option])
        function handleChange() {
            onChange(111)
        }
        return (
            <Select mode={mode} value={value} onChange={handleChange} style={{ width: 120 }}>
                {options.map((item) => {
                    return (
                        <Option key={item.value}>{item.label}</Option>
                    )
                })}
            </Select>
        )
    }
    
    export default ZhProSelect
    
    ```
    
    ### 9、总结
    
    - 开发时严格遵守React的框架规范，对于钩子依赖的内容必须依赖进来，同时也要减少不必要的依赖，不要去依赖可变引用类型的数据。
    - 开发完成后，仔细排查浏览器警告，尽量做到每一个页面，每一个组件没有警告。
    - 不要使用js原生获取DOM的方法，如无必要，不要在标签上设置ID。需要使用DOM元素时，可以使用ref属性。
    - 每一个组件代码行数为300到500行最优，除一些特殊情况（如大型表单），行数超出的应考虑合理拆分组件。
    - 页面中的模态框必须独立作为一个组件，模态框大小应该严格遵循UI设计的大中小规格。
    - 请求方法前面以请求类型开头，命名应遵循语义化规范。
    - 书写代码应该严格遵守Airbnb规范。
    - 上传附件时，应该严格限制允许上传的附件类型，不能允许所有类型的附件都能上传。
    - 表格渲染字段时，对于内容长度不一致的字段，应该居左对齐，如果内容过长，应设置超出隐藏。
    - 一个组件的useEffect只能有一个，其余逻辑可以写在useCallback中。


