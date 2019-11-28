<template>
    <div class="home">
        <!-- 返回顶部 -->
        <BackTop class="top" :height="200" :bottom="100">
            <svg t="1571708663278" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2466" width="32" height="32"><path d="M468.36 243.447 20.797 691.009c-24.753 24.753-24.753 64.788 0 89.541 24.681 24.682 64.788 24.753 89.541 0l402.792-402.792L915.922 780.55c24.682 24.682 64.787 24.753 89.541 0 24.752-24.753 24.68-64.788 0-89.541L557.9 243.447C533.148 218.766 493.113 218.766 468.36 243.447z" p-id="2467" fill="#e6e6e6"></path></svg>
        </BackTop>
        <ul class="tags">
            <li v-for="(item,index) in catalogs" :key="`tags-${index}`">
                <router-link :to="item.routerName">
                    <Tag :color="item.color">{{item.title}}</Tag>
                </router-link>
            </li>
        </ul>
        <!-- 在这里引入userInfo组件 -->
        <section class="content">
            <router-view></router-view>
            <User/>
        </section>
    </div>
</template>

<script>
import {SERVER} from '@/config';
import User from '@/components/user'
export default {
    name: 'home',
    components: { User },
    data() {
        return {
            catalogs: [],//推荐分类
        }
    },
    beforeCreate() {
        this.$axios(SERVER + 'content/catalog').then(res => this.catalogs = res.data)
    },
}
</script>

<style lang="less" scoped>
.top{
    padding: 10px;
    background: rgba(0,0,0,.6);
    color: #fff;
    border-radius: 2px;
    padding: 5px 10px;
}
.home{
    width: 55%;
    margin: auto;
    .tags{
        height: 60px;
        line-height: 60px;
        li{
            float: left;
        }
    }
    .content{
        // width: 65%;
        display: flex;
    }
}
</style>

