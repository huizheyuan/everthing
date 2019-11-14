<template>
    <div class="res">
        <section class="bg">
            <Row type="flex" justify="center" align="top" class="code-row-bg">
                <Col span="12"><p style="height: 90px; font-size: 24px; text-align: center">社会安定主要靠法律维持还是道德维持</p></Col>
            </Row>
            <Row type="flex" justify="center" align="top" class="code-row-bg">
                <Col span="6">
                    <p style="height: 60px; font-size: 18px; font-weight: bold; text-align: center">正方</p>
                    <p style="font-size: 16px; color: red; font-weight: bold; text-align: center">社会安定主要靠法律维持</p>
                </Col>
                <Col span="6">
                    <p style="height: 60px; font-size: 18px; font-weight: bold; text-align: center">反方</p>
                    <p style="font-size: 16px; color: blue; font-weight: bold; text-align: center">社会安定主要靠道德维持</p>
                </Col>
            </Row>
            <div v-if="!token" class="publish">
                <router-link to="/log">
                    <Button shape="circle" style="margin: 8px 24px; width: 100px;height: 40px" class="btns">立即登录</Button>
                </router-link>
                <p style="margin: 8px 24px; font-size: 14px; color: #00b7a3">&nbsp;登录后就可以参与讨论啦~</p>
            </div>
            <Form v-else class="publish" ref="formValidate" label-position="top" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="立场" prop="arg1">
                    <RadioGroup v-model="formValidate.arg1">
                        <Radio label="right">正方</Radio>
                        <Radio label="error">反方</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="论据" prop="arg2">
                    <Input v-model="formValidate.arg2" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                </FormItem>
                <FormItem label="论证" prop="arg3">
                    <Input v-model="formValidate.arg3" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                </FormItem>
                <FormItem>
                    <Button style="margin-left: 8px; border-radius: 22px;" @click="handleReset('formValidate')">重写</Button>
                    <Button class="btns" type="primary" @click="handleSubmit('formValidate')">发表</Button>
                </FormItem>
            </Form>
            <!-- 背景图 -->
            <article class="a"></article><article class="b"></article>
        </section>
        <section class="content">
            <Row type="flex" justify="center" align="top" class="code-row-bg">
                <!-- 正方 -->
                <Col span="6">
                    <p class="dialog" style="background-color: rgb(212, 211, 211);">
                        立论、驳论、提问
                    </p>
                </Col>
                <!-- 反方 -->
                <Col span="6">
                    <p class="dialog" style="background-color: rgb(212, 211, 211);">
                        立论、驳论、提问
                    </p>
                </Col>
            </Row>
        </section>
    </div>
</template>

<script>
import { getToken } from '../libs/user'
import {SERVER} from '@/config';
export default {
    name: 'detail',
    data() {
        return {
            token: getToken(),
            formValidate: {
                arg1: '',
                arg2: '',
                arg3: '',
            },
            ruleValidate: {
                arg1: [
                    { required: true, message: '请选择立场', trigger: 'change' }
                ],
                arg2: [
                    { required: true, message: '论据不能为空', trigger: 'blur' },
                    { type: 'string', message: 'Incorrect email format', trigger: 'blur' }
                ],
                arg3: [
                    { required: true, message: '论证观点不能为空', trigger: 'blur' },
                    { type: 'string', message: 'Incorrect email format', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleSubmit (params) {
            this.$refs[params].validate((valid) => {
                if (valid) {
                    // 发表观点
                    let mForm = this.$refs[params].model;
                    this.$axios({
                        // url: SERVER + 'user/publish',
                        method: 'post',
                        data: $qs.stringify(mForm)
                    }).then(res => {
                        this.$Message.success('发表成功!');
                    }).catch(err => {
                        console.log(err);
                    })
                } else {
                    this.$Message.error('有必填项未填');
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        }
    }
}
</script>

<style scoped>
.res{margin: 100px auto 0;}
.publish{
    position: absolute;
    right: 100px;
    margin: -90px 0;
    padding: 10px 20px;
    width: 370px;
}
.gd {
    width: 100vw;height: 100vh;
    position: fixed;
    top: 0; left: 0;bottom: 0;right: 0;
}
article{
    position: absolute;
    bottom: 0;
    height: 236px;
    z-index: -1;
}
article.a{
    width: 520px;
    background: url('../assets/img/c-bg1.png');
    background-size: cover;
    left: 0;
}
article.b{
    width: 400px;
    background: url('../assets/img/c-bg2.png');
    background-size: cover;
    right: 20px;
}
/*内容部分*/
.content{
    height: 60vh;
    overflow-y: scroll;
    overflow:hidden;
}
.dialog{
    margin: 20px;
    text-align: left;
    padding: 15px 20px;
    border-radius: 4px;
    color: #000;
}
</style>