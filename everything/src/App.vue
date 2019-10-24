<template>
  <div id="app">
    <div v-if="$route.path=='/'">
      <router-view/>
    </div>
    <div v-else>
      <Head/>
      <router-view/>
    </div>
  </div>
</template>

<script>
import Head from '@/components/Head'
export default {
  name: 'App',
  components: {
    Head,
  },
}
</script>

<style>
body{
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
<style>
.ivu-form-item{
    margin: 18px 0;
}
.ivu-collapse>.ivu-collapse-item{
    padding: 20px 0;
}
.ivu-collapse>div:last-child{
    padding-top: 20px;
}
/*账号设置*/
.ivu-tabs-tab{
    font-size: 16px;
    color: #db6f6a;
    border-color: #db6f6a!important;
}
.ivu-tabs-nav .ivu-tabs-tab:hover{
    color: #db6f6a;
}
.ivu-tabs-nav-container:focus .ivu-tabs-tab-focused {
    border-color: #db6f6a!important;
}
.ivu-tabs-nav .ivu-tabs-tab-active {
    color: #db6f6a;
}
.ivu-tabs-nav .ivu-tabs-tab:active {
    color: #db6f6a;
}
.ivu-tabs-ink-bar{
    background-color: #db6f6a;
}
/* 记住密码 */
.ivu-switch-checked {
    border-color: #db6f6a;
    background-color: #db6f6a;
}
</style>
