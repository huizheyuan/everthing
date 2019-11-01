<template>
    <div>
        <Form style="padding: 20px 0 0;" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="手机号" prop="tel">
                <Input v-model="formValidate.tel" placeholder="请输入手机号"></Input>
            </FormItem>
            <FormItem label="密码" prop="passwd">
                <Input type="password" v-model="formValidate.passwd" placeholder="请输入6-8位数字或字母"></Input>
            </FormItem>
            <FormItem label="确认密码" prop="passwdCheck">
                <Input type="password" v-model="formValidate.passwdCheck" placeholder="确认密码"></Input>
            </FormItem>
            <FormItem label="验证码" prop="code">
                <Input type="text" style="width: 65%;" v-model="formValidate.code"></Input>
                <Button style="float: right" class="btns" @click="sendCode(formValidate.tel2)">发送验证码</Button>
            </FormItem>
            <FormItem>
                <Button class="btns" @click="reg('formValidate')" long>注册</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
import {SERVER} from '@/config';
export default {
    name: 'regform',
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
            } else if (value !== this.formValidate.passwd) {
                callback(new Error('两次密码不一致'));
            } else {
                callback();
            }
        };
        return {
            formValidate: {
                tel: '',
                passwd: '',
                code: '',
            },
            ruleValidate: {
                tel: [
                    { validator: validateTel, trigger: 'blur' }
                ],
                passwd: [
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
        reg(regVal){
            this.$refs[regVal].validate((valid) => {
                if (valid) {
                    let mForm = this.$refs[regVal].model;

                    this.$axios({
                        url: SERVER + 'user/reg',
                        method: 'post',
                        data: $qs.stringify( mForm )
                    }).then(res => {
                        if(res.data.code==0){
                            alert(res.data.msg);
                            bus.$emit('reg-tel', res.data.uid.tel);// 注册成功的号码
                            this.$router.push({path: '/log/loginform'});
                            this.$refs[regVal].resetFields();
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

<style scoped>
</style>