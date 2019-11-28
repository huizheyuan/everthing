<template>
    <!-- 引入home界面 -->
    <div class="user">
        <section v-if="token">
            <figure>
                <img class="photo" src="../assets/img/user.png" alt="Jennifer">
                <figcaption>
                    <h3>Jennifer</h3>
                    <p>一只快乐的程序圆</p>
                </figcaption>
            </figure>
            <router-link to="/mine">
                <Button type="warning" size="small" class="goMine" ghost shape="circle">个人主页</Button>
            </router-link>
            <a class="quit" @click="quit()" href="javascript: 0;">退出登录</a>
        </section>
        <section v-else>
            <figure>
                <img class="noLogin" src="../assets/img/noLogin.png" alt="还没登录">
                <router-link to="/login">
                    <Button long type="warning" size="small" ghost shape="circle">登录</Button>
                </router-link>
            </figure>
        </section>
    </div>
</template>

<script>
import topic from './topic'
import { publish } from '../libs/api'
import { getToken, quit } from '../libs/user'
export default {
    name: 'user',
    components: {topic},
    data() {
        return {
            token: getToken(),
            topicModal: false,
            loading: true
        }
    },
    methods: {
        publish() {
            let data = this.$refs.topic.topicData;      
            let topicForm = this.$refs.topic.$refs.topicForm;
            
            topicForm.validate(valid => {
                if (valid) {
                publish(data).then(res => {
                    this.$Message.success(res.data.msg)
                    this.topicModal = false
                }).catch(err => {
                    console.log('发表辩题出错：', err)
                })
                this.topicModal = false;
                topicForm.resetFields();
                } else {
                this.$Message.error('有必填项未填');
                }
                this.loading = false;
                this.$nextTick(() => {
                this.loading = true;
                })
            });
        },
        cancel() {
            let topicForm = this.$refs.topic.$refs.topicForm
            topicForm.resetFields();
        },
        quit(){
            quit(getToken()).then(res => {
                this.token='';
                localStorage.token="";
                localStorage.user="";
                alert("已退出！");
            }).catch(err => {
                console.log(err);
            })
        }
    },
}
</script>

<style lang="less" scoped>
.user{
    // background-color: @default-background;
    background-color: #eee;
    box-shadow: 6px 8px 8px #888888;
    border-radius: 4px;
    width: 25%;
    height: 250px;
    margin: 0 20px;
    padding: 15px;
    .photo{
        width: 36%;
        margin: 0 32% 10px;
    }
    h3, p {
        text-align: center;
        padding: 5px 0;
    }
    .goMine{
        margin: 10px 30%;
        font-size: 12px;
    }
    .quit {
        float: right;
    }
    .noLogin{
        margin: 0px 12px;
        width: 86%;
    }
}
</style>