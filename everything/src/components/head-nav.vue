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
        <Input search @on-search="search"/>
      </Col>
      <Col :xs="{ span: 2 }" :lg="{ span: 3 }">
        <Button type="warning" ghost shape="circle" @click="topicModal = true">发表辩题</Button>
        <Modal
          title="发表辩题"
          :closable="false"
          :mask-closable="false"
          v-model="topicModal"
          :loading="loading"
          @on-ok="publishTopic()"
          @on-cancel="cancelTopic()"
        >
          <topic ref="topicForm"></topic>
        </Modal>
      </Col>
    </Row>
  </div>
</template>

<script>
import { getToken } from '../libs/user'
import topic from './topic'
export default {
  name: 'headNav',
  inject: ['app'],
  components: { topic },
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
      let mForm = this.$refs.topicForm.topicData
      mForm.validate((valid) => {
        if (valid) {
          // 发表观点
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
    cancelTopic() {
      this.$refs.topicForm.topicData={}
    }
  },
}
</script>

<style lang="less" scoped>
.headNav{
  // background-color: @default-background;
  background-color: #3E3E3B;
  box-shadow: 0 6px 8px #888888;
  .menus{
    li{
      margin: 10px 0;
      padding: 10px  20px;
      float: left;
      font-size: 18px;
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