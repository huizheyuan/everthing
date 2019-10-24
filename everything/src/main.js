// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

import 'font-awesome/css/font-awesome.min.css';
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './assets/css/index.css';
import animate from 'animate.css';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import qs from 'qs'

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.withCredentials = true
Vue.prototype.$axios = axios
// window.$qs = qs

Vue.use(animate);
Vue.use(ElementUI);
Vue.use(ViewUI, {
  transfer: true,
  capture: false,
  select: {
      arrow: 'md-arrow-dropdown',
      arrowSize: 20
  }
});

Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


// let canNoticeLoginOut = true
// // axios拦截器,用于对session过期跳转到登录页面
// vm.$axios.interceptors.response.use(function (response) {
//   // 拦截未登录，跳转到登录页面
//   if(response.data.message=='未登录'&&canNoticeLoginOut){
//     vm.$Notice.warning({
//       title:'登录过期请重新登录',
//       duration: 1,
//       name:'timeOut',
//       onClose:()=>{
//         canNoticeLoginOut = true
//       }
//     });
//     //清除本地token
//     localStorage.token=''
//     vm.$router.push({
//       name:'login'
//     })
//     canNoticeLoginOut = false
//     return response
//   }
//   return response;
// }, function (error) {
//   // 对响应错误做点什么
//   return Promise.reject(error);
// });