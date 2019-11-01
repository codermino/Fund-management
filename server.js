const express = require("express");
const app=express();
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const passport=require("passport");

// 引入route
const users=require("./routes/api/users");
const profiles=require("./routes/api/profiles");

// 使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



// 连接mongodb数据库
mongoose.connect('mongodb://localhost/zijin', { useNewUrlParser: true })
  .then(()=>{
    console.log('mongoosse connected');
  }
  ).catch(res=>{
  console.log(err);
});

// passport的初始化
app.use(passport.initialize());
// 配置passport
require("./config/passport")(passport);


// app.get('/', (req,res)=> {
//   res.send("hello world");
// });

// 使用router
app.use("/api/users",users);
app.use("/api/profiles",profiles);

// 环境变量要是设置了PORT，那么就用环境变量的PORT
const port=process.env.PORT||5000;

app.listen(port,()=>{
  console.log(`Server is running on port ${port}`);
});
