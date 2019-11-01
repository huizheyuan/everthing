const Router=require('koa-router');

let router=new Router();

router.get('/', async ctx=>{
  ctx.body = 'content';
});

router.get('/submitTopic', async ctx=>{
  let post = ctx.request.fields;

  await ctx.db.query(
    // "INSERT INTO content_table (nickname, signature, sex) VALUES(?, ?, ?)",
    // [post['nickname'], post['signature'], post['sex']]
  );
  ctx.body={code: 0, msg:'发表成功！'};
});

module.exports=router.routes();
