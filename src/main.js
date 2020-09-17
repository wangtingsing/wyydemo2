// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store/index'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/iconfont/iconfont.css'
import '@/assets/css/base.css'

// 覆盖element样式
import '@/assets/css/coverelement.css'
// Vue.prototype.$eventbus = new Vue();//中央事件总线

Vue.config.productionTip = false
Vue.use(ElementUI)
// axios.defaults.baseURL = 'http://localhost:3000'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
