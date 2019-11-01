//@login & register
const express=require("express");
const router=express.Router();

const bcrypt=require("bcrypt");
var gravatar = require('gravatar');
var jwt = require('jsonwebtoken');
const User=require("../../models/User");
const passport=require("passport");


//$route GET api/users/test
//@desc 返回的请求的json数据
//@access public
// router.get("/test",(req,res)=>{
//   res.json({msg:"login works"});
// });

//$route GET api/users/register
//@desc 返回的请求的json数据
//@access public
//如果想要使用post请求，就必须要安装body-parse
router.post("/register",(req,res)=>{
  // console.log(req.body);

  // 进行注册
  User.findOne({email:req.body.email})
    .then(user=>{
      if(user){
        return res.status(400).json("邮箱已被注册!");
      }else{
        // 如果这个邮箱是在gravatar上已经注册的邮箱，那么就会是一个有头像的
        // 如果没有注册那么就会是一个默认的头像
        const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});


        const newUser=new User({
          name:req.body.name,
          email:req.body.email,
          avatar,
          password:req.body.password,
          identity:req.body.identity
        });

        // 使用bcrypt将密码进行加密
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(newUser.password, salt, (err, hash)=> {
            // Store hash in your password DB.
            if(err) throw err;

            newUser.password=hash;

            newUser.save()
              .then(user=>res.json(user))
              .catch(err=>console.log(err))
          });
        });

      }
    })
});

//$route GET api/users/login
//@desc 返回的请求的json数据 jwt passport
//@access public
router.post("/login",(req,res)=>{
  const email=req.body.email;
  const password=req.body.password;

  // 在数据库中进行查找
  User.findOne({email})
    .then(user=>{
      if(!user){
        return res.status(404).json("用户名不存在");
      }

      // 密码匹配
      bcrypt.compare(password, user.password)
        .then(isMatch=>{
          if(isMatch){
            // return res.json({msg:"success"});
            const rule={
              id:user.id,
              name:user.name,
              avatar: user.avatar,
              identity: user.identity
            };
            // 第一个参数是一个规则，构成token
            // 第二个参数是起一个名字
            // 第三个参数是token的过期时间
            jwt.sign(rule, "secret", { expiresIn:3600 }, (err, token)=> {
              // console.log(token);
              res.json({
                success:true,
                token:"Bearer "+token
              })
            });


            // jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' }, function(err, token) {
            //   console.log(token);
            // });
          }else{
            return res.status(400).json("密码错误");
          }
        });
    })
});


//$route GET api/users/current
//@desc return current user
//@access private
router.get("/current",passport.authenticate("jwt",{session:false}),(req,res)=>{
  res.json({
    id:req.user.id,
    name:req.user.name,
    email:req.user.email,
    identity:req.user.identity
  });
});

module.exports=router;