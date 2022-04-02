const express = require("express");
const admin =require("./routers/api/admin")
const foods = require("./routers/api/foodRouters")
const users =require("./routers/api/orderRouters")

const app = express();

//使用body-parser中间件
app.use(express.urlencoded({extended:false}))
app.use(express.json())
//设置访问路由
app.get("/",(req, res) => {
    res.send("Hello World!")
})
app.use("/api/admin",admin)
app.use("/api/foods",foods)
app.use("/api/users",users)
const port = process.env.PORT || 5001;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
 