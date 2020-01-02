<template>
  <div id="app" class="layout">
    <div v-if=" $route.path=='/' || $route.path=='/login' || $route.path=='/reg' ">
      <router-view/>
    </div>
    <Layout v-else>
      <router-link to="/">
        <div class="logoPosition"></div>
      </router-link>
        <Header :style="{position: 'fixed', zIndex: 1, width: '100%'}">
            <Menu mode="horizontal" theme="dark">
                <div class="layout-nav">
                    <MenuItem 
                        v-for="(item,index) in menuList" 
                        :key="`menu-${index}`" :name="index"
                        @click="active=item.menuName"
                        :class="active===item.menuName?'active':''">
                        <router-link tag="p" :to="item.name">{{item.menuName}}</router-link>
                    </MenuItem>
                    <MenuItem name="4">
                      <Input suffix="ios-search" />
                    </MenuItem>
                    <MenuItem name="5">
                      <launch-topic></launch-topic>
                    </MenuItem>
                    <MenuItem v-if="userInfo" name="6">
                      <Dropdown trigger="click" style="margin-left: 20px">
                          <Avatar :src="userInfo.photo" size="large" />
                          <DropdownMenu slot="list" v-if="token">
                              <DropdownItem>
                                <router-link to="/mine" tag="p">个人主页</router-link>
                              </DropdownItem>
                              <DropdownItem>
                                <p @click="quit">退出账号</p>
                              </DropdownItem>
                          </DropdownMenu>
                      </Dropdown>
                    </MenuItem>
                    <MenuItem v-else name="6">
                      <Avatar icon="ios-person" size="large" />
                    </MenuItem>
                </div>
            </Menu>
        </Header>
        <Content :style="{margin: '88px 20px 0', background: '#fff', minHeight: '780px' }">
            <router-view></router-view>
        </Content>
        <Footer class="layout-footer-center">2019-2020 &copy; Jennifer</Footer>
    </Layout>
  </div>
</template>

<script>
import LaunchTopic from '@/components/launch-topic'
import { getToken, getUserInfo, quit } from '@/libs/user'
export default {
  name: 'App',
  provide() {
    return {
      app : this
    }
  },
  components: { LaunchTopic },
  data() {
    return {
      token: getToken(),
      userInfo: localStorage.user || null,
      active: '推荐',
      menuList: [
        {menuName:'推荐', name: '/home'},
        {menuName:'关注', name: '/home'},
        {menuName:'消息', name: '/msg'}
      ],
    }
  },
  created() {
    getUserInfo(getToken()).then(res=>{
      localStorage.user = JSON.stringify(res.data.userInfo);
      this.userInfo = res.data.userInfo;
    })
  },
  methods: {
    quit(){
      quit(getToken()).then(res => {
        this.token='';
        localStorage.token="";
        localStorage.user="";
        alert("退出成功！");
      }).catch(err => {
        console.log(err);
      })
    }
  }
}
</script>

<style lang="less" scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    .layout-nav{
      width: 800px;
      margin: 0 auto;
      margin-right: 490px;
      &>li{
        font-size: 16px;
        font-weight: bold;
        line-height: 64px;
      }
      .active{
          border-bottom: 4px solid #D1A827;
      }
    }
    .layout-footer-center{
        text-align: center;
    }
}
</style>
<style>
/* body{
  overflow-x: hidden;
  overflow-y: hidden;
} */
</style>