const path = require("path");
const Koa = require("koa");
const Router = require("koa-router");
const static = require("./routers/static");
const body=require('koa-better-body');
const session=require('koa-session');
const fs=require('fs');
const config = require("./config");

let server=new Koa();
server.listen(config.PORT);
console.log(`server running at ${config.PORT}`);

server.context.config = config;

server.use(body({
  uploadDir: path.resolve(__dirname, './static/upload')
}));

server.keys=fs.readFileSync('.keys').toString().split('\n');
server.use(session({
  maxAge: 20*60*1000,// 20分钟
  renew: true
}, server));

// 数据库
server.context.db = require('./libs/database');

// 跨域
server.use(async (ctx,next)=>{
  ctx.set('Access-Control-Allow-Origin', '*');
  await next();
});

// 路由和static
let router = new Router();
// 安全--错误处理
server.use(async (ctx, next)=>{
  try {
    await next();
  } catch (e) {
    ctx.state=500;
    ctx.body = '错误处理aaa';
    console.log(e);
  }
});
router.use('/user', require('./routers/user'));
router.use('/content', require('./routers/content'));
static(router);// 缓存文件
server.use(router.routes());
