<template>
    <div class="setting">
        <Tabs :animated="false" value="name1">
            <TabPane label="修改密码" name="name1">
                <div class="modifyPwdBox" v-if="steps==1">
                    <p v-if="choice==1">
                        <Form :model="opwdForm" label-position="right" :rules="formValidate" :label-width="80">
                            <FormItem label="原始密码" prop="passwd">
                                <Input style="width: 81%" type="password" v-model="opwdForm.passwd" placeholder="请输入密码"></Input>
                            </FormItem>
                            <FormItem>
                                <Button class="btns" style="width: 40%" @click="modifyPwd(opwdForm.passwd)" long>下一步</Button>
                                <a @click="choice=2">用手机验证</a>
                            </FormItem>
                        </Form>
                    </p>
                    <p v-else-if="choice==2">
                        <Form ref="modifyPwd2" :model="telForm" label-position="right" :rules="formValidate" :label-width="80">
                            <FormItem label="手机号" prop="modifyTel">
                                <Input style="width: 81%" v-model="telForm.modifyTel" placeholder="请输入手机号"></Input>
                            </FormItem>
                            <FormItem label="验证码" prop="modifyCode">
                                <Input style="width: 40%" type="text" v-model="telForm.modifyCode"></Input>
                                <Button @click="telSendCode(telForm.modifyTel)">发送验证码</Button>
                            </FormItem>
                            <FormItem>
                                <Button class="btns" style="width: 40%" @click="verifyTel('modifyPwd2')" long>下一步</Button>
                                <a @click="choice=1">用密码验证</a>
                            </FormItem>
                        </Form>
                    </p>
                </div>
                <div class="modifyPwdBox" v-else-if="steps=2">
                    <Form ref="modifyPwdFinish" :model="newForm" label-position="right" :rules="formValidate" :label-width="80">
                        <FormItem label="密码" prop="newPwd">
                            <Input style="width: 81%" type="password" v-model="newForm.newPwd" placeholder="请输入6-8位数字或字母"></Input>
                        </FormItem>
                        <FormItem label="确认密码" prop="newPwdCheck">
                            <Input style="width: 81%" type="password" v-model="newForm.newPwdCheck" placeholder="确认密码"></Input>
                        </FormItem>
                        <FormItem>
                            <Button class="btns" style="width: 40%" @click="steps=1">上一步</Button>
                            <Button class="btns" style="width: 40%" @click="newPwdFinish('modifyPwdFinish')">完成</Button>
                        </FormItem>
                    </Form>
                </div>
            </TabPane>
            <TabPane label="注销账号" name="name2">
                <p style="font-size: 18px;margin: 25px 0">永久删除帐号</p>
                <ul class="cancelText">
                    <li>
                        1、如果你不小心创建出了多余的帐号，或在绑定帐号的时候提示帐号被占用，你可以在
                        <a>帐号绑定解绑相关问题汇总</a>中获得相关帮助。
                    </li>
                    <li>
                        2、如果你对辩站上的某些内容、功能或社区规则不满意，你可以在
                        <a>帮助与反馈页</a>向我们提出。
                    </li>
                    <li>3、删除帐号是不可逆的操作，删除后将无法恢复。</li>
                </ul>
                <button href="#" class="btns cancel" @click="cancelAccount()">注销账号</button>
            </TabPane>
        </Tabs>
    </div>
</template>

<script scope>
import {SERVER} from '@/config';
export default {
    name: 'Setting',
    data () {
        const validateTel = (rule, value, callback) => {
            if (value) {
                var tel=/^[1][3,4,5,7,8][0-9]{9}$/;
                if ( !tel.test(value) ){
                    return callback(new Error('手机号格式不正确'));
                }else{
                    callback();
                }
            }else{
                callback();
            }
        };
        const validatePass = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入你的密码'));
            } else {
                var pass=/^[a-zA-Z0-9]{6,8}$/;
                if (!pass.test(value)) {
                    return callback(new Error('请输入6-8位数字或字母'));
                }else{
                    callback();
                }
            }
        };
        const validatePassCheck = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请再次输入你的密码'));
            } else if (value !== this.formItem.newPwd) {
                callback(new Error('两次密码不一致'));
            } else {
                callback();
            }
        };
        return {
            opwdForm: {
                uid: '',
                passwd: ''
            },
            telForm: {
                uid: '',
                modifyTel: '',
                modifyCode: ''
            },
            newForm: {
                uid: '',
                newPwd: ''
            },
            formValidate: {
                tel: [
                    { required: true, message: '请填写手机号', trigger: 'blur' },
                    { validator: validateTel, trigger: 'blur' }
                ],
                newPwd: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                newPwdCheck: [
                    { validator: validatePassCheck, trigger: 'blur' }
                ]
            },
            // 修改密码
            steps: 1,
            choice: 1
        }
    },
    mounted() {
        // 获取uid
    },
    methods: {
        // 验证原始密码
        modifyPwd(oPwd){
            var pass=/^[a-zA-Z0-9]{6,8}$/;
            if (!pass.test(oPwd)) {
                alert("请输入6-8位数字或字母");
            }else{
                // 原始密码验证
                this.steps=2;// 进入下一步
            }
        },
        // 修改密码---发送验证码
        telSendCode(telNum){
            var tel=/^[1][3,4,5,7,8][0-9]{9}$/;
            if (!telNum){
                alert("手机号不能为空");
            } else if (!tel.test(telNum)){
                alert("手机号格式不正确");
            }else{
                // 根据手机号 发送验证码
                alert("验证码");
            }
        },
        // 收到手机号&验证码，验证该用户是否注册
        verifyTel(telVal) {
            console.log(telVal);
            // 1、验证telVal不为空
            // 2、查数据库，看是否注册
            this.steps=2;// 进入下一步
        },
        // 修改密码成功
        newPwdFinish(newPwds){
            this.$refs[newPwds].validate((valid) => {
                if (valid) {
                    alert("发送请求，修改密码");
                } else {
                    alert("新密码有误");
                }
            })
        },
        // 注销账号
        cancelAccount(){
            if(confirm("确定要注销账号吗？")){
                this.$axios({
                    url: SERVER + 'user/cancel',
                    method: 'post',
                    data: $qs.stringify( {uid: this.newForm.uid} )
                }).then(res => {
                    if(res.data.code==0){
                        alert(res.data.msg);
                        sessionStorage.removeItem('user');
                        this.$router.push({path: '/main'});
                    }else if(res.data.code==1){
                        alert(res.data.msg);
                    }
                }).catch(err => {
                    console.log('出错了', err);
                });
            }
        }
    }
}
</script>

<style scoped>
/* 修改密码盒子 */
.modifyPwdBox{
    padding: 20px 300px 0 0;
}
.modifyPwdBox a{
    margin: 10px 10px;
    color: #515a6e;
}
.modifyPwdBox a:hover{
    text-decoration-line: underline;
}
/* 注销账号 */
.cancelText li{
    font-size: 16px;
    margin: 20px 0;
}
.cancel{
    margin: 18px 0;
    width: 100px;
    height: 38px;
    font-size: 14px;
}
</style>