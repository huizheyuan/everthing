<template>
  <div id="app">
    <div v-if=" $route.path=='/' || $route.path=='/login' || $route.path=='/reg' ">
      <router-view/>
    </div>
    <div v-else>
      <head-nav></head-nav>
      <router-link to="/"><div class="logoPosition"></div></router-link>
      <router-view/>
    </div>
  </div>
</template>

<script>
import HeadNav from '@/components/head-nav'
import { getToken, getUserInfo } from '@/libs/user'
export default {
  name: 'App',
  provide() {
    return {
      app : this
    }
  },
  data() {
    return {
      userInfo: localStorage.user
    }
  },
  components: { HeadNav },
  created() {
    getUserInfo(getToken()).then(res=>{
      localStorage.user = JSON.stringify(res.data.userInfo);
      this.userInfo = res.data.userInfo;
    })
  }
}
</script>

<style>
body{
  overflow-x: hidden;
  overflow-y: hidden;
}
</style>
