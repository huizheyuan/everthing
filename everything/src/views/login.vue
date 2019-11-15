<template>
    <div>
        <router-link to="/"><router-link to="/"><div class="logoPosition"></div></router-link></router-link>
        <div class="log-reg">
            <h1>登录</h1>
            <Form method="post" enctype="multipart/form-data" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
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
                    <router-link to="/reg" class="gogogo">还没账号，去注册~</router-link>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
import { userLogin } from '@/libs/user'
export default {
    name: 'loginform',
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
        return {
            formValidate: {
                tel: this.$route.query.tel || '',
                passwd: '',
                switch: true
            },
            ruleValidate: {
                tel: [
                    { validator: validateTel, trigger: 'blur' }
                ],
                passwd: [
                    { validator: validatePass, trigger: 'blur' }
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
                alert(telVal, "验证码");
            }
        },
        login (logVal) {
            this.$refs[logVal].validate((valid) => {
                if (valid) {
                    let mForm = this.$refs[logVal].model;
                    userLogin(mForm).then(res => {
                        if(res.data.code==0){
                            localStorage.token=res.data.token;
                            bus.$emit('token', res.data.token);
                            alert(res.data.msg);
                            this.$router.push({path: '/main'});
                            this.$refs[logVal].resetFields();
                        }else if(res.data.code==1){
                            alert(res.data.msg);
                        }
                    }).catch(err => {
                        console.log('出错了', err);
                    });
                }
            })
        }
    }
}
</script>
