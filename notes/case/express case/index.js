const express = require("express");
const app = express();
//处理post提交过来的数据, 需要新增数据需加上
app.use(express.json())

//可以解决跨域
app.use(require("cors")());

//链接mongoose
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/express-test", { useNewUrlParser: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

//建模, 定义模型
const Product = mongoose.model("Product", new mongoose.Schema({
    title: String
}))

//往数据库插入数据(只需要一次)若多次会每次都插入同样的数据,  一般子啊别的文件写接口
// Product.insertMany([
//     {title: "产品1"},
//     {title: "产品2"},
//     {title: "产品3"},
// ])

//读静态文件入口即html
app.use(express.static("public"))

//设置请求接口
app.get("/", (req, res) => {
    res.send({ page: "home" });
})

app.get("/about", (req, res) => {
    res.send({ page: "About Us" })
})

//列表页  一般一个数组
app.get("/products", async (req, res) => {
    //find()查找数据库里面的所有数据 
    //都跟在find()后面的skip()跳过第几条数据 limit()限制几条数据 where()根据条件 sort()怎么排
    // const data = await Product.find().skip(1).limit(2)
    const data = await Product.find().sort({ _id: -1 })
    res.send(data)
})

//详情页 一般就一个对象
app.get("/products/:id", async (req, res) => {
    //findById()获取id   req.params.id客户端返回的id, id通过:id传递过来
    const data = await Product.findById(req.params.id)
    res.send(data)
})

//2.新增数据  注意： 需要加上处理 app.use(express.json())
app.post("/products", async (req, res) => {
    const data = req.body
    //把新增的数据 新增到数据库
    const product = await Product.create(data)
    res.send(product)
})

//3.修改数据
app.put("/products/:id", async (req, res) => {
    // 3.1找到产品
    const product = await Product.findById(req.params.id)
    // 3.2从客户端获取产品需要修改的数据
    product.title = req.body.title
    // 3.3保存
    await product.save()
    res.send(product)
})

//4.删除数据
app.delete("/products/:id", async (req, res) => {
    const product = await Product.findById(req.params.id)
    await product.remove()
    res.send({
        success: true
    })
})


const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

/* 1. npm install nodemon的使用和说明
安装nodemon执行nodemon index.js(入口文件)修改的代码会自动重新编译, 不需要手动node index.js(入后文件名)重新手动重启编译
可以在package.json的scripts配置脚本里面配置 "脚本名": nodemon "入口文件" 后, 执行npm run 配置的脚本名
*/

/*2. 托管静态文件
app.use(express.static("public"))
app.use("/static", express.static("public"))
两者区别在于第二个需要加上/index.js
 */

/* 3.安装cors
app.use(require("cors")()) 加这一行中间键在即可解决跨域问题
*/