<template>
  <div class="headNav">
    <Row>
      <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 5 }">
        <ul class="menus">
          <li v-for="(item,index) in menuList" :key="`menu-${index}`">
            <router-link :to="item.name">
                <span>{{item.menuName}}</span>
            </router-link>
          </li>
        </ul>
      </Col>
      <Col :xs="{ span: 3 }" :lg="{ span: 4 }">
        <!-- <Input search @on-search="search"/> -->
        <Input suffix="ios-search" />
      </Col>
      <Col :xs="{ span: 2 }" :lg="{ span: 3 }">
        <launch-topic></launch-topic>
      </Col>
      <div class="demo-avatar">
        <Avatar icon="ios-person" size="large" />
      </div>
    </Row>
  </div>
</template>

<script>
import { getToken } from '../libs/user'
import LaunchTopic from './launch-topic'
export default {
  name: 'headNav',
  inject: ['app'],
  components: { LaunchTopic },
  data () {
    return {
      token: getToken(),
      menuList: [
        {menuName:'推荐', name: '/home'},
        {menuName:'关注', name: '/home'},
        {menuName:'消息', name: '/home'}
      ],
      loading: false,
      topicModal: false
    }
  },
  methods: {
    search() { alert("s"); },
    publishTopic() {
      // let mForm = this.$refs.topicForm.topicData
      // mForm.validate((valid) => {
      //   console.info("ddd")
      //   if (valid) {
      //     this.$axios({
      //         url: SERVER + 'user/publish',
      //         method: 'post',
      //         data: $qs.stringify(mForm)
      //     }).then(res => {
      //         this.$Message.success('发表成功!');
      //     }).catch(err => {
      //         console.log(err);
      //     })
      //   } else {
      //     this.$Message.error('有必填项未填');
      //   }
      // })
      
      // this.$axios({
      //     url: SERVER + 'user/publish',
      //     method: 'post',
      //     ata: $qs.stringify(mForm)
      // }).then(res => {
      //     this.$Message.success('发表成功!');
      // }).catch(err => {
      //     console.log(err);
      // })
    },
  },
}
</script>

<style lang="less" scoped>
@import '~@/assets/style/theme.less';

.headNav{
  background-color: @default-background;
  box-shadow: 0 2px 8px #888888;
  .menus{
    li{
      margin: 10px 0;
      padding: 10px  20px;
      float: left;
      font-size: 18px;
      a {
        color: @primary-white;
      }
    }
  }
  .ivu-col{
    overflow: hidden;
    .ivu-input-wrapper{
      margin: 16px 0;
    }
    .ivu-btn {
      margin: 16px 40px;
    }
  }
}
</style>