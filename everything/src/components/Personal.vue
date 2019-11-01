<template>
    <div class="personal">
        <Form ref="personalData" :model="formItem" :rules="formValidate" :label-width="80">
            <FormItem label="头像">
                <img src="../assets/img/user.png" style="width: 100px;height:100px; margin: 0 20px;" class="img-circle">
                <Button class="btns">更换头像</Button>
            </FormItem><hr/>
            <FormItem label="昵称">
                <Input v-model="formItem.nickname" style="width: 200px;" placeholder="请输入昵称"></Input>
            </FormItem><hr/>
            <FormItem label="个性签名">
                <Input v-model="formItem.signature" type="textarea" :autosize="{minRows: 3,maxRows: 4}" placeholder="来个个签吧~"></Input>
            </FormItem><hr/>
            <FormItem label="性别">
                <RadioGroup v-model="formItem.sex">
                    <Radio label="male">男</Radio>
                    <Radio label="female">女</Radio>
                    <Radio label="secret">保密</Radio>
                </RadioGroup>
            </FormItem><hr/>
            <Collapse simple accordion >
                <!-- 手机号 -->
                <Panel name="1" hide-arrow>
                    <Tooltip placement="right" content="点击更换手机号">
                        <Button style="border: none; font-size: 14px;font-weight: 700;">手机号：{{telItem.tel}}</Button>
                    </Tooltip>
                    <div slot="content" class="formData">
                        <Form ref="formTel" :model="telItem" :rules="formValidate">
                            <FormItem label="手机号" prop="tel">
                                <Input style="width: 85%" v-model="telItem.tel" placeholder="请输入手机号"></Input>
                            </FormItem>
                            <FormItem label="验证码" prop="code">
                                <Input style="float: left;width: 40%; margin-right: 10px" type="text" v-model="telItem.code"></Input>
                                <Button @click="sendCode(telItem.tel)">发送验证码</Button>
                            </FormItem>
                            <FormItem>
                                <Button @click="modifyTel('formTel')" long>确定</Button>
                            </FormItem>
                        </Form>
                    </div>
                </Panel>
                <!-- 邮箱 -->
                <Panel name="2" hide-arrow>
                    <Tooltip placement="right" content="点击绑定邮箱" style="font-size: 14px;font-weight: 700;">
                        <Button style="border: none; font-size: 14px;font-weight: 700;">绑定邮箱</Button>
                    </Tooltip>
                    <div slot="content" class="formData">
                        <Form ref="formMail" :model="mailItem" :rules="formValidate">
                            <FormItem label="邮箱" prop="mail">&nbsp;&nbsp;&nbsp;
                                <Input style="width: 85%" v-model="mailItem.mail" placeholder="请输入邮箱"></Input>
                            </FormItem>
                            <FormItem label="验证码"  prop="mailCode">
                                <Input style="float: left;width: 40%; margin-right: 10px" type="text" v-model="mailItem.mailCode"></Input>
                                <Button @click="sendCode(mailItem.mail)">发送验证码</Button>
                            </FormItem>
                            <FormItem>
                                <Button @click="modifyMail('formMail')" long>确定</Button>
                            </FormItem>
                        </Form>
                    </div>
                </Panel>
            </Collapse>
            <FormItem>
                <Button class="btns" @click="save('personalData')" style="width:33%;">保存</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script scope>
import {SERVER} from '@/config';
export default {
    name: 'Personal',
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
        return {
            formItem: {
                uid: '',
                photo: '',
                nickname: '',
                signature: '',
                sex: 'secret'
            },
            telItem: {
                uid: '',
                tel: '',
                code: '',
            },
            mailItem: {
                uid: '',
                mail: '',
                mailCode: ''
            },
            formValidate: {
                tel: [
                    { required: true, message: '请填写手机号', trigger: 'blur' },
                    { validator: validateTel, trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '请填写验证码', trigger: 'blur' }
                ],
                mail: [
                    { required: true, message: '请填写邮箱', trigger: 'blur' },
                    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                ],
                mailCode: [
                    { required: true, message: '请填写验证码', trigger: 'blur' }
                ]
            },
            userInfo: {}
        }
    },
    mounted() {
        bus.$on('loginInfo',res=>{
            this.telItem.tel=res.tel;
            console.log(this.userInfo);
        })
    },
    methods: {
        // 个人资料---发送验证码
        sendCode(valNum){
            var tel=/^[1][3,4,5,7,8][0-9]{9}$/;
            if (!valNum){
                alert("输入信息无效");
            } else if (!tel.test(valNum)){
                alert("输入信息格式不正确");
            }else{
                alert("根据手机号|邮箱，验证码");
            }
        },
        // 更换绑定的手机号
        modifyTel(telVal) {
            this.$refs[telVal].validate((valid) => {
                if (valid) {
                    let mForm = this.$refs[telVal].model;
                    
                    this.$axios({
                        url: SERVER + 'user/handleTel',
                        method: 'post',
                        data: $qs.stringify( mForm )
                    }).then(res => {
                        if(res.data.code==0){
                            alert(res.data.msg);
                        }else if(res.data.code==1){
                            alert(res.data.msg);
                        }
                    }).catch(err => {
                        console.log('出错了', err);
                    });
                } else {
                    alert("填写信息有误");
                }
            })
        },
        // 绑定邮箱
        modifyMail(mailVal){
            this.$refs[mailVal].validate((valid) => {
                if (valid) {
                    alert("绑定邮箱");
                } else {
                    alert("填写信息有误");
                }
            })
        },
        // 保存基本信息
        save(info){
            console.log("保存基本信息", info);
        }
    }
}
</script>

<style scoped>
/* 内容部分 */
.formData{
    padding: 8px 30px 8px;
    border-radius: 16px;
    background: cornsilk;
}
</style>