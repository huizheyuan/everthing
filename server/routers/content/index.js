const Router=require('koa-router');

let router=new Router();

router.get('/', async ctx=>{
  ctx.body = 'content';
});

router.get('/catalog', async ctx=>{
  ctx.body=await ctx.db.query("SELECT * FROM catalog_table");
});

router.post('/publish', async ctx=>{
  let post=ctx.request.fields;
  let token=post['token'];

  //验证token
  let rows=await ctx.db.query('SELECT uid,token_expires FROM user_table WHERE token=?', [token]);

  if(!rows.length){
    ctx.body={err: 1, msg: '登录后才可以发表辩题哦~'};
  }else{
    let {uid, token_expires}=rows[0];

    let now=Math.floor(Date.now()/1000);
    if(now>token_expires){
      ctx.body={err: 1, msg: '登录过期，请重新登录'};
    }else{
      await ctx.db.query(
        "INSERT INTO topic_table (topic, aSide, bSide) VALUES(?,?,?)",
        [ post['topic'], post['aSide'], post['bSide'] ]
      );
      ctx.body={err: 0, msg: '发布成功！'};
    }
  }
});

module.exports=router.routes();
