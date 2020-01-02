<template>
    <!-- 引入home界面 -->
    <div class="user">
        <Card v-if="token" class="mCard">
            <List size="small">
                <ListItem>
                    {{userInfo.nickname}}
                </ListItem>
                <ListItem>
                    我的收藏
                    <Badge style="margin-left:120px" :count="Number(userInfo.focus)" overflow-count="99"></Badge>
                </ListItem>
                <ListItem>
                    我的喜欢
                    <Badge style="margin-left:120px" :count="0" overflow-count="99"></Badge>
                </ListItem>
                <ListItem>
                    我的足迹
                    <Badge style="margin-left:120px" :count="0" overflow-count="99"></Badge>
                </ListItem>
            </List>
        </Card>
        <Card class="mCard">
            <List header="便便推荐" size="small">
                <ListItem>
                    <Avatar icon="ios-person" size="large" />
                    <strong>无敌小魔女</strong>
                </ListItem>
                <ListItem>
                    <Avatar icon="ios-person" size="large" />
                    <strong>无敌小魔女</strong>
                </ListItem>
                <ListItem>
                    <Avatar icon="ios-person" size="large" />
                    <strong>无敌小魔女</strong>
                </ListItem>
            </List>
        </Card>
    </div>
</template>

<script>
import { publish } from '@/libs/api'
import { getUserInfo, getToken, quit } from '@/libs/user'
export default {
    name: 'user',
    data() {
        return {
            userInfo: localStorage.user || null,
            token: getToken(),
            topicModal: false,
            loading: true
        }
    },
    methods: {
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
    created() {
        getUserInfo(getToken()).then(res=>{
            localStorage.user = JSON.stringify(res.data.userInfo);
            this.userInfo = res.data.userInfo;
        })
    }
}
</script>

<style lang="less" scoped>
.user{
    .mCard {
        margin: 0 30px 20px;
        width: 250px;
    }
}
</style>