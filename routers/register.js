/**
 * Created by hwh on 17/1/14.
 */
var nodemailer = require("nodemailer");
var User = require('../lib/User');
var jwt = require('koa-jwt');

function sendEmail(key,token){
  var stmpTransport = nodemailer.createTransport("SMTP",{
    host:"smtp.qq.com",//主机
    secureConnection:true,//使用SSL
    port:465,
    auth:{
      user:"272535439@qq.com", //帐号,
      pass:"**********"
    }
  });

  var mailOptions = {
    from:"Fred Foo <272535439@qq.com>",//标题
    to: "wsd_wangsidi@163.com",//收件人
    subject: "Hello world", // 标题
    html: "<a href='http://localhost:4000/#/verifyemail?verifyKey=" + key + "'>点击进行邮箱验证</a> 世界，你好！" // html 内容
  };

  stmpTransport.sendMail(mailOptions,function(error,response){
    if(error){
      console.log('error',error)
    }else{
      console.log("Message sent:"+response.message)
    }
    stmpTransport.close()
  });
}

exports.post = function * (){
  var body = this.request.body
  var user = {email:body.email,password:body.password,activeKey:body.activeKey};
  var userExist = yield User.getUserByEmail(body.email);
  console.log('user',body.email,userExist);
  if(userExist){
    return this.body = {
      code:10000,
      message:'该邮箱已注册'
    }
  }
  var user = yield User.addUser(user);
  console.log('user',user._id.toString());
  var token = jwt.sign(user._id.toString(),'wsd',{expiresIn: 24 * 60 * 60  /* 1 days */});
  sendEmail(body.activeKey,token);
  this.body = {
    code:0,
    token:token,
    message:'注册成功'
  };
  //sendEmail()
}