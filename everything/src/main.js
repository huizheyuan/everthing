import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import $ from 'jquery'
import ViewUI from 'view-design';
import less from 'less'
import './assets/style/index.less'

// 数据通信
import qs from 'qs'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);
Vue.prototype.$axios = axios
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
window.$qs = qs
window.bus = new Vue()
Vue.use(ViewUI)
Vue.use(less)
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
