<template>
    <div class="personal">
        <Form v-if="false" ref="personalData" :model="formItem" :rules="formValidate" :label-width="80">
            <FormItem label="头像">
                <img src="../assets/img/user.png" style="width: 90px;height:90px; margin: 0 20px;" class="img-circle">
                <Button>更换头像</Button>
            </FormItem><hr/>
            <FormItem label="昵称">
                <Input v-model="formItem.nickname" style="width: 200px;" placeholder="请输入昵称">{{nickname}}</Input>
            </FormItem><hr/>
            <FormItem label="个性签名">
                <Input v-model="formItem.signature" type="textarea" :autosize="{minRows: 3,maxRows: 4}" placeholder="来个个签吧~"></Input>
            </FormItem><hr />
            <FormItem label="性别">
                <RadioGroup v-model="formItem.sex">
                    <Radio label="male">男</Radio>
                    <Radio label="female">女</Radio>
                    <Radio label="secret">保密</Radio>
                </RadioGroup>
            </FormItem><hr/>
            <Collapse simple accordion >
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
                <Button type="warning" ghost shape="circle" @click="save('personalData')" >取消</Button>
            </FormItem>
        </Form>
        <List size="large">
            <ListItem>
                <img src="../assets/img/user.png" style="width:90px;height:90px"/>
                <template slot="action">
                    <Upload action="//jsonplaceholder.typicode.com/posts/">
                        <Button type="success" ghost shape="circle">换个头像</Button>
                    </Upload>
                </template>
            </ListItem>
            <ListItem>
                昵称：
                <Input v-if="isEdit" v-model="formItem.nickname" style="width: 30%;" :placeholder="userInfo.nickname"/>
                <p v-else>{{userInfo.nickname}}</p>
            </ListItem>
            <ListItem>
                个性签名：
                <Input v-if="isEdit" v-model="formItem.signature" :placeholder="userInfo.signature" type="textarea" :autosize="{minRows: 2,maxRows: 2}" style="width: 60%"/>
                <p v-else>{{userInfo.signature}}</p>
            </ListItem>
            <ListItem>
                性别：
                <RadioGroup v-if="isEdit" v-model="formItem.sex">
                    <Radio label="male">男</Radio>
                    <Radio label="female">女</Radio>
                    <Radio label="secret">保密</Radio>
                </RadioGroup>
                <p v-else>{{userInfo.sex}}</p>
            </ListItem>
            <ListItem>
                手机：{{userInfo.tel}}<ListItemMeta/>
                <template slot="action">
                    <li><a @click="safeModal=true">更换绑定的手机号</a></li>
                </template>
            </ListItem>
            <ListItem>
                邮箱：{{userInfo.mail}}<ListItemMeta/>
                <template slot="action">
                    <li><a @click="safeModal=true">绑定邮箱</a></li>
                </template>
            </ListItem>
            <ListItem>
                <Button v-if="isEdit" type="success" ghost shape="circle" style="margin-right:15px">保存</Button>
                <Button v-if="isEdit" type="warning" ghost shape="circle" @click="isEdit=false" >取消</Button>
                <Button v-else type="success" ghost shape="circle" @click="isEdit=true" >编辑</Button>
            </ListItem>
        </List>
        <!-- 弹框 -->
        <Modal
            title="安全验证"
            v-model="safeModal"
            :loading="loading"
            :closable="false"
            :mask-closable="false"
            >
            <Form ref="formTel" :model="telItem" :rules="formValidate">
                <FormItem label="手机号" prop="tel">
                    <Input style="width: 40%" v-model="telItem.tel" placeholder="请输入手机号"/>
                </FormItem>
                <FormItem label="验证码" prop="code">
                    <Input style="float: left;width: 40%; margin-right: 10px" type="text" v-model="telItem.code"/>
                    <Button shape="circle" type="warning" @click="sendCode(telItem.tel)">发送验证码</Button>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button shape="circle" @click="handleCancel('formTel')">取消</Button>
                <Button shape="circle" type="warning" @click="handleSubmit('formTel')">确定</Button>
            </div>
        </Modal>
        <Modal
            title="绑定邮箱"
            v-model="mailModal"
            :loading="loading"
            :closable="false"
            :mask-closable="false"
            >
            <Form ref="formMail" :model="mailItem" :rules="formValidate">
                <FormItem label="邮箱" prop="mail">&nbsp;&nbsp;&nbsp;
                    <Input style="width: 40%" v-model="mailItem.mail" placeholder="请输入邮箱"/>
                </FormItem>
                <FormItem label="验证码"  prop="mailCode">
                    <Input style="float: left;width: 40%; margin-right: 10px" type="text" v-model="mailItem.mailCode"/>
                    <Button @click="sendCode(mailItem.mail)">发送验证码</Button>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button shape="circle" @click="handleCancel('formMail')">取消</Button>
                <Button shape="circle" type="warning" @click="handleMail('formMail')">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script scope>
import { mapActions, mapMutations } from 'vuex';
import { getUserInfo, getToken } from '@/libs/user'
import {SERVER} from '@/config';
export default {
    name: 'personal',
    // inject: ['app'],
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
            isEdit: false,
            loading: false,
            safeModal: false,
            mailModal: false,
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
    computed: {
        nickname () {
            return this.$store.state.nickname
        },
    },
    created() {
        getUserInfo(getToken()).then(res=>{
            localStorage.user = JSON.stringify(res.data.userInfo);
            this.userInfo = res.data.userInfo;
        })
    },
    methods: {
        ...mapMutations([
            'setPhoto', 'setNickname', 'setSignature',
            'setSex', 'setTel', 'setMail',
            'setParticipation', 'setFootprint', 'setFocus'
        ]),
        ...mapActions(['getUserInfo']),
        // 个人资料---发送验证码
        sendCode(valNum){
            var tel=/^[1][3,4,5,7,8][0-9]{9}$/;
            if (!valNum){
                this.$Message.info('输入信息无效');
            } else if (!tel.test(valNum)){
                this.$Message.info('输入信息格式不正确');
            }else{
                this.$Message.info('根据手机号|邮箱，验证码');
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
                            this.$Message.info(res.data.msg);
                        }else if(res.data.code==1){
                            this.$Message.info(res.data.msg);
                        }
                    }).catch(err => {
                        console.log('出错了', err);
                    });
                } else {
                    this.$Message.info('填写信息有误');
                }
            })
        },
        // 绑定邮箱
        modifyMail(mailVal){
            this.$refs[mailVal].validate((valid) => {
                if (valid) {
                    this.$Message.info('绑定邮箱');
                } else {
                    this.$Message.info('填写信息有误');
                }
            })
        },
        // 保存基本信息
        save(info){
            console.log("保存基本信息", info);
        },
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                    // publish(this.$refs[name].model).then(res=>{
                    //   console.log(res.data)
                    //   console.log("fghdsfh")
                    // })
                    this.$axios({
                    url: SERVER + 'content/publish',
                    method: 'post',
                    data: $qs.stringify(mForm)
                    }).then(res=>{
                    console.log("sss")
                    })
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        handleMail (name){},
        handleCancel (name) {
            this.safeModal=false
            this.mailModal=false
            this.$refs[name].resetFields()
        },
    }
}
</script>

<style lang="less" scoped>
.personal{
    font-size: 14px;
}
</style>