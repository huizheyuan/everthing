const Router=require('koa-router');
const guid=require('uuid/v4');
const re=require('../../libs/test');
const config=require('../../config');

let router=new Router();

router.get('/', async ctx=>{
  ctx.body = 'user';
});

// 登录
router.post('/login', async ctx=>{
  let {tel, passwd}=ctx.request.fields;
  try {
    let rows = await ctx.db.query('SELECT * FROM user_table where tel=?', [tel]);
    if(rows.length==0){
      ctx.body={code: 1, msg:'未注册'};
    }else{
      let row=rows[0];

      if(row['passwd']!=passwd){
        ctx.body={code: 1, msg:'密码不正确'};
      }else{
        token=guid().replace(/\-/g, '');
        token_expires=Math.floor((Date.now()+config.TOKEN_AGE)/1000);
        await ctx.db.query('UPDATE user_table SET token=?, token_expires=?', [token, token_expires]);

        let info = await ctx.db.query('SELECT * FROM user_table where tel=?', [tel]);
        ctx.body={
          code: 0,
          userInfo: info[0],
          msg:'登录成功'
        };
      }
    }
  } catch (error) {
    ctx.body={code: 1, msg: error};
  }
});

// 获取用户信息
router.post('/getuser', async ctx=>{
  try {
    let token = ctx.request.fields;
    let info = await ctx.db.query('SELECT * FROM user_table where token=?', [token]);
    ctx.body={
      code: 0, 
      userInfo: info[0],
      msg:'获取成功'
    };
  } catch (error) {
    ctx.body={code: 1, msg: error};
  }
})

// 退出登录
router.post('/logout', async ctx=>{
  try {
    let token = ctx.request.fields;
    // let info = await ctx.db.query('UPDATE user_table SET tel=? WHERE uid=?', [token, uid]);
    ctx.body={
      code: 0,
      msg:'已退出'
    };
  } catch (error) {
    ctx.body={code: 1, msg: error};
  }
})

// 注册
router.post('/reg', async ctx=>{
  let post=ctx.request.fields;
  try {
    let rows = await ctx.db.query('SELECT * FROM user_table where tel=?', post['tel']);
    if(!re.tel.test(post['tel'])){
      ctx.body={code: 1, msg: '手机格式不正确'};
    }else if(rows.length!=0){
      ctx.body={code: 1, msg:'该手机号已注册'};
    }else{
      await ctx.db.query(
        "INSERT INTO user_table (nickname, sex,tel, passwd, token, token_expires) VALUES(?, ?, ?,?, ?, ?)",
        [post['tel'], '保密',post['tel'], post['passwd'], '', 0]
      );
      ctx.body={
        code: 0,
        tel: post['tel'],
        msg:'注册成功'
      };
    }
  } catch (error) {
    ctx.body={code: 1, msg: error};
  }
});

//============================================================================================================
// 修改绑定手机号
router.post('/handleTel', async ctx=>{
  let {uid, tel, code}=ctx.request.fields;
  console.log(uid, tel, code);
  
  try {
    // await ctx.db.query('UPDATE user_table SET tel=? WHERE uid=?', [tel, uid]);
    ctx.body={
      code: 0, 
      uid: uid,
      msg:'修改手机号成功！'
    };
  } catch (error) {
    ctx.body={
      code: 1, 
      uid: uid,
      msg:'修改手机号失败！'
    };
  }
});

// 绑定邮箱
router.post('/handleEmail', async ctx=>{
  let {uid, email}=ctx.request.fields;

  await ctx.db.query('UPDATE user_table SET email=? WHERE uid=?', [email, uid]);
  ctx.body={
    code: 0, 
    uid: uid,
    msg:'邮箱绑定成功！'
  };
});

// 保存个人信息
router.post('/modifyPwd', async ctx=>{
  let post=ctx.request.fields;

  await ctx.db.query(
    "INSERT INTO user_table (nickname, signature, sex) VALUES(?, ?, ?)",
    [post['nickname'], post['signature'], post['sex']]
  );
  ctx.body={code: 0, msg:'保存成功！'};
});

// 修改密码
router.post('/modifyPwd', async ctx=>{
  let {uid, passwd}=ctx.request.fields;

  await ctx.db.query('UPDATE user_table SET passwd=? WHERE uid=?', [passwd, uid]);
  ctx.body={code: 0, msg:'修改密码成功！'};
});

// 注销账号
router.post('/cancel', async ctx=>{
  let {uid}= ctx.request.fields;
  await ctx.db.query('DELETE FROM user_table WHERE uid=?', [uid]);

  ctx.body={code: 0, msg:'注销账号成功！'};
});

module.exports=router.routes();
