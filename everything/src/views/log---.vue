// 备用
<template>
    <div class="log">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xs-12 col-md-4"></div>
                <div class="col-xs-12 col-md-3">
                    <ul class="nav">
                        <li v-for="(item,index) in menuList" @click="active=item.menuName" :class="active===item.menuName?'active':''" :key="`menu-${index}`">
                            <router-link :to="item.name">
                                <span>{{item.menuName}}</span>
                            </router-link>
                        </li>
                    </ul>
                    <router-view></router-view>
                </div>
                <div class="col-xs-12 col-md-4"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'log',
    data () {
        return {
            active:'登录',
            menuList:[
                {menuName:'登录',name:'/log/loginform'},
                {menuName:'注册',name:'/log/regform'}
            ]
        }
    },
}
</script>

<style scoped>
.log{
    width: 100vw;
    height: 100vh;
    background-image: url(../assets/img/reg-bg.jpg);
    background-size: cover;
    background-position: 0px -178px;
    padding-top: 200px;
}
.nav {
    border-bottom: 1px solid #dcdee2;
}
.nav li{
    float: left;
    font-size: 16px;
    width: 50%;
    text-align: center;
}
.nav a{ color: #db6f6a; }
.nav>li>a:focus, .nav>li>a:hover {
    text-decoration: none;
    background-color: transparent
}
.active{
    border-radius: 4px;
    border-bottom: 2px solid #db6f6a;
}
</style>