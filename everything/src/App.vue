<template>
  <div id="app">
    <div v-if=" $route.path=='/' || $route.path=='/login' || $route.path=='/reg' ">
      <router-view/>
    </div>
    <div v-else>
      <Head/>
      <router-view/>
    </div>
  </div>
</template>

<script>
import Head from '@/components/head'
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
  components: { Head },
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
