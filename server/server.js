const Koa = require("koa");
const Router = require("koa-router");
const config = require("./config");

let server=new Koa();
server.listen(config.PORT);
console.log(`server running at ${config.PORT}`);

// 配置
server.context.config = config;

// 数据库
server.context.db = require('./libs/database');

// 错误处理
server.use(async (ctx, next)=>{
  try {
    await next();
  } catch (e) {
    ctx.body = '错误处理';
  }
});

// 路由
let router = new Router();
router.use(async (ctx, next)=>{
  try{
    await next();
    // console.log("路由测试");
  }catch(e){
    ctx.throw(500, 'Error');
    console.log(e);
  }
});
router.use('/user', require('./routers/user'));
server.use(router.routes());
