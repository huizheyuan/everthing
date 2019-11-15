<template>
    <div class="index">
        <section class="title">
            <p class="cursor">语言的力量</p>
            <div class="intoB pointer" @mouseover="show=true" @mouseout="show=false">
                <span>辩</span>
                <transition-group name="intoList" tag="article">
                    <span v-if="show" v-for="item in items" v-bind:key="item" class="list-item">
                        <router-link :to="item.path">{{ item.name }}</router-link>
                    </span>
                </transition-group>
            </div>
        </section>
        <!-- <ul id="tags">
            <li v-for="(tag,index) in tags" :key="`tag-${index}`">{{tag.topic}}</li>
        </ul> -->
    </div>
</template>

<script scope>
import { tags } from '@/libs/api'
export default {
    name: 'index',
    data() {
        return {
            show: false,
            items: [
                {name: '今日主页', path: '/home'},
                {name: '登录-辩论', path: '/login'},
                {name: '关于我', path: '/'}
            ],
            tags: []
        }
    },
    beforeCreate() {
        tags().then(res=>this.tags = res.data)
    },
    methods: {}
}
</script>

<style lang="less" scope>
.index{
    height: 100vh;
    position: relative;
    // background: url("../assets/img/index-bg2.jpg");
    // background-size: cover;
    .title{
        position: absolute;
        left: 40%;
        top: 40%;
        .cursor{
            font-size: 50px;
        }
        .intoB{
            position: absolute;
            left: 120%;
            top: -30%;
            background: url("../assets/img/index.png");
            background-size: cover;
            width: 100px;
            height: 100px;
            text-align: center;
            span{
                line-height: 100px;
                font-size: 44px;
            }
            article{
                position: absolute;
                right: -116px;
                .list-item{
                    line-height: 20px;
                    font-size: 16px;
                }
                .intoList-enter-active, .intoList-leave-active {
                    transition: opacity .5s;
                }
                .intoList-enter, .intoList-leave-to {
                    opacity: 0;
                }
            }
        }
    }
}
</style>