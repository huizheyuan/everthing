<template>
    <div class="index">
        <div class="title">
            <p>语言的力量</p>
            <Row type="flex" justify="space-around" class="code-row-bg">
                <Col span="4"><router-link to='/main'>热门论题</router-link></Col>
                <!-- 判断是否登录 -->
                <Col span="6"><router-link to='/log'>登录-参与辩论</router-link></Col>
                <Col span="4"><router-link to='/'>关于我~</router-link></Col>
            </Row>
        </div>
        <ul id="tags">
            <li><a class="color-1" href="#" target="_blank">0社会安定主要靠法律维持还是道德维持</a></li>
            <li><a class="color-2" href="#" target="_blank">1学生就业压力大是否有利于成才</a></li>
            <li><a class="color-3" href="#" target="_blank">2恋爱过程中有别人追我，要告诉对象吗？</a></li>
            <li><a class="color-4" href="#" target="_blank">3网络对大学生的利大于弊还是弊大于利</a></li>
            <li><a class="color-5" href="#" target="_blank">4一夜暴富真的是一件好事吗？</a></li>
            <li><a class="color-6" href="#" target="_blank">5要求伴侣在房产证上加我名字，有错吗？</a></li>
            <li><a class="color-7" href="#" target="_blank">6职场菜鸟被前辈压榨，要不要say no？</a></li>
            <li><a class="color-8" href="#" target="_blank">7教育应注重知识培训还是人格培训</a></li>
            <li><a class="color-9" href="#" target="_blank">8代沟的主要责任是父母还是孩子？</a></li>
        </ul>
    </div>
</template>

<script scope>
export default {
    name: 'Index',
    beforeCreate() {
        setInterval(() => {
            this.animate()
            this.animate2()
        }, 500);
    },
    methods: {
        // 去分类页面
        // to() {this.$router.push({path: '/Classify'});},
        animate(){
            $("#tags>li>a").eq(0).animate({bottom:"580px", left: "60px", fontSize:"20px", opacity: "1"}, 11800);
            $("#tags>li>a").eq(1).animate({bottom:"550px", left: "300px", fontSize:"20px", opacity: "1"}, 10300);
            $("#tags>li>a").eq(2).animate({bottom:"430px", left: "200px", fontSize:"18px", opacity: "1"}, 11800);
            $("#tags>li>a").eq(3).animate({bottom:"440px", left: "500px", fontSize:"18px", opacity: "1"}, 7000);
            $("#tags>li>a").eq(4).animate({bottom:"430px", left: "800px", fontSize:"18px", opacity: "1"}, 6800);
            $("#tags>li>a").eq(5).animate({bottom:"430px", left: "1000px", fontSize:"18px", opacity: "1"}, 9800);
            $("#tags>li>a").eq(6).animate({bottom:"430px", left: "1100px", fontSize:"18px", opacity: "1"}, 7800);
            $("#tags>li>a").eq(7).animate({bottom:"530px", left: "1300px", fontSize:"18px", opacity: "1"}, 7900);
            $("#tags>li>a").eq(8).animate({bottom:"570px", left: "1460px", fontSize:"20px", opacity: "1"}, 8800);
        },
        animate2(){
            $("#tags>li>a").eq(0).animate({bottom:"70px", left: "160px", fontSize:"12px", opacity: ".4"}, 11800);
            $("#tags>li>a").eq(1).animate({bottom:"60px", left: "330px", fontSize:"12px", opacity: ".4"}, 10300);
            $("#tags>li>a").eq(2).animate({bottom:"70px", left: "280px", fontSize:"12px", opacity: ".4"}, 11700);
            $("#tags>li>a").eq(3).animate({bottom:"66px", left: "450px", fontSize:"12px", opacity: ".4"}, 4800);
            $("#tags>li>a").eq(4).animate({bottom:"90px", left: "760px", fontSize:"12px", opacity: ".4"}, 7800);
            $("#tags>li>a").eq(5).animate({bottom:"70px", left: "960px", fontSize:"12px", opacity: ".4"}, 7800);
            $("#tags>li>a").eq(6).animate({bottom:"60px", left: "1200px", fontSize:"12px", opacity: ".4"}, 9800);
            $("#tags>li>a").eq(7).animate({bottom:"80px", left: "1400px", fontSize:"12px", opacity: ".4"}, 11800);
            $("#tags>li>a").eq(8).animate({bottom:"60px", left: "1670px", fontSize:"12px", opacity: ".4"}, 10800);
        }
    },
}
</script>

<style scoped>
.index{
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    background-image: url(../assets/img/index-bg.jpg);
    background-size: cover;
    background-position: -393px 18px;
    position: relative;
    z-index: 1;
}
img{
    width: 70px;
    height: 94px;
    position: absolute;
    right: 73px;
    top: 35px;
}
img:hover{
    transform: scale(1.2);
    -webkit-transform: scale(1.2);
}
.title{
    margin: auto; 
    padding: 25vh 0 0;
    width: 450px;
    color: #fff;
    text-align: center;
    position: relative;
    z-index: 1;
}
.title>p{
    font-size: 80px;
    margin-bottom: 20px;
}
.title a{
    color: #00b7a3;
    font-size: 16px;
}
.title a:hover{
    color: #008cf4;
    font-size: 17px;
}
ul a{
    position: absolute;
    text-decoration: none;
    padding: 6px 12px;
    z-index: 2;
    background: #555;
    border-radius: 20px;
}
ul a:hover{
    letter-spacing: 2px;
    color: crimson;
}
a.color-1{
    color: #ee1166;
    left: 130px;
    bottom: -16px;
    opacity: .1;
    font-size: 12px;
}
a.color-2{
    color: #008cf4;
    left: 230px;
    bottom: -60px;
    opacity: .1;
    font-size: 12px;
}
a.color-3{
    color: #69c869;
    left: 100px;
    bottom: -50px;
    opacity: .1;
    font-size: 12px;
}
a.color-4{
    color: #b714e0;
    left: 450px;
    bottom: -60px;
    opacity: .1;
    font-size: 12px;
}
a.color-5{
    color: #3da83d;
    left: 800px;
    bottom: -50px;
    opacity: .1;
    font-size: 12px;
}
a.color-6{
    color: #00bbdd;
    left: 900px;
    bottom: -54px;
    opacity: .1;
    font-size: 12px;
}
a.color-7{
    color: #b714e0;
    left: 1200px;
    bottom: -45px;
    opacity: .1;
    font-size: 12px;
}
a.color-8{
    color: #00b7a3;
    left: 1400px;
    bottom: -35px;
    opacity: .1;
    font-size: 12px;
}
a.color-9{
    color: #ee1166;
    left: 1500px;
    bottom: -32px;
    opacity: .1;
    font-size: 12px;
}
</style>