/**
 * Created by hwh on 17/1/12.
 */
var app = require('koa')();
var router = require('koa-frouter');
var bodyparser = require('koa-bodyparser');
var cors = require('koa-cors');
var errorhandler = require('koa-errorhandler');
var static = require('koa-static')
var port = process.env.PORT || 3000
//全局异常捕获
app.use(errorhandler());
//允许跨域访问
app.use(cors());
//指定服务器的静态资源地址，在当前目录下的文件可以直接localhost:3000/filename访问到
app.use(static('static'));

app.use(bodyparser());
app.use(router(app,'routers'));

app.listen(port,function(){
  console.log('Server listening on:',port);
})