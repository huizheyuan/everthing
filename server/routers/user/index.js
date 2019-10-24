const Router=require('koa-router');

let router=new Router();

router.get('/', async ctx=>{
  ctx.body = 'user';  
  let datas=await ctx.db.query(`SELECT * FROM user_table`);
  console.log(datas);
});

module.exports=router.routes();