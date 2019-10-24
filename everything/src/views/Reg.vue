<template>
    <div class="reg">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xs-12 col-md-4"></div>
                <div class="col-xs-12 col-md-3">
                    <Tabs value="name1">
                        <TabPane label="登录" name="name1">
                            <Form style="padding: 20px 0 0;" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                                <FormItem label="手机号" prop="tel">
                                    <Input v-model="formValidate.tel" placeholder="请输入手机号"></Input>
                                </FormItem>
                                <FormItem label="密码" prop="passwd">
                                    <Input type="password" v-model="formValidate.passwd" placeholder="请输入密码"></Input>
                                </FormItem>
                                <FormItem label="记住密码">
                                    <i-switch v-model="formValidate.switch" size="large">
                                        <span slot="open">记住</span>
                                        <span slot="close">关</span>
                                    </i-switch>
                                    <a href="#" style="float: right">登录遇到问题？</a>
                                </FormItem>
                                <FormItem>
                                    <Button class="btns" long @click="login('formValidate')">登录</Button>
                                </FormItem>
                            </Form>
                        </TabPane>
                        <TabPane label="注册" name="name2">
                            <Form style="padding: 20px 0 0;" ref="formValidate2" :model="formValidate" :rules="ruleValidate" :label-width="80">
                                <FormItem label="手机号" prop="tel2">
                                    <Input v-model="formValidate.tel2" placeholder="请输入手机号"></Input>
                                </FormItem>
                                <FormItem label="密码" prop="passwd2">
                                    <Input type="password" v-model="formValidate.passwd2" placeholder="请输入6-8位数字或字母"></Input>
                                </FormItem>
                                <FormItem label="确认密码" prop="passwdCheck">
                                    <Input type="password" v-model="formValidate.passwdCheck" placeholder="确认密码"></Input>
                                </FormItem>
                                <FormItem label="验证码" prop="code">
                                    <Input type="text" style="width: 65%;" v-model="formValidate.code"></Input>
                                    <Button style="float: right" class="btns" @click="sendCode(formValidate.tel2)">发送验证码</Button>
                                </FormItem>
                                <FormItem>
                                    <Button class="btns" @click="reg('formValidate2')" long>注册</Button>
                                </FormItem>
                            </Form>
                        </TabPane>
                    </Tabs>
                </div>
                <div class="col-xs-12 col-md-4"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Reg',
    data () {
        const validateTel = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('手机号不能为空'));
            }else{
                var tel=/^[1][3,4,5,7,8][0-9]{9}$/;
                if (!tel.test(value)){
                    return callback(new Error('手机号格式不正确'));
                }else{
                    callback();
                }
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
            } else if (value !== this.formValidate.passwd2) {
                callback(new Error('两次密码不一致'));
            } else {
                callback();
            }
        };
        return {
            formValidate: {
                tel: '',// 登录
                passwd: '',
                switch: true,
                tel2: '',// 注册
                passwd2: '',
                code: '',
            },
            ruleValidate: {
                tel: [
                    { validator: validateTel, trigger: 'blur' }
                ],
                tel2: [
                    { validator: validateTel, trigger: 'blur' }
                ],
                passwd: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                passwd2: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                passwdCheck: [
                    { validator: validatePassCheck, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        sendCode(telVal){
            var tel=/^[1][3,4,5,7,8][0-9]{9}$/;
            if (!telVal){
                alert("手机号不能为空");
            }else if (!tel.test(telVal)){
                alert("手机号格式不正确");
            }else{
                // 根据手机号 发送验证码
                alert(telVal, "验证码");
            }
        },
        login (logVal) {
            this.$refs[logVal].validate((valid) => {
                if (valid) {
                    alert("发送请求-登录");
                    // this.$axios({
                    //     url: 'http://192.168.2.31:8880/login?username=zzy&password=123456',
                    //     method: 'post'
                    // }).then(res => {
                    //     console.log(res);
                    // }).catch(err => {
                    //     console.log('err', err)
                    // })
                }
            })
        },
        reg(regVal){
            this.$refs[regVal].validate((valid) => {
                if (valid) {
                    alert("发送请求-注册");
                }
            })
        }
    }
}
</script>

<style scoped>
.reg{
    width: 100vw;
    height: 100vh;
    background-image: url(../assets/img/reg-bg.jpg);
    background-size: cover;
    background-position: 0px -178px;
    padding-top: 200px;
}
.form-group{margin-bottom: 38px;}
.form-group div:last-child{
    line-height: 34px;
    text-align: left;
}
.form-group div>i:first{float: left;}
.form-group div>i{display: none;}
.fa-check{color: green;}
.fa-times{color: red;}
</style>