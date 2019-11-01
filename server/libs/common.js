// 密码加密——直接调用md5方法
const crypto=require('crypto');

module.exports={
  md5(buffer){
    let obj=crypto.createHash('md5');
    obj.update(buffer);

    return obj.digest('hex');
  }
};
