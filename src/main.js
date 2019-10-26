import Vue from 'vue'
import App from './App.vue'

import router from './router'

// 注册vuex
import store from './vuex/store'

// 获取全部的接口，绑定到vue构造方法上
import * as API from './api'
// 绑定到vue的构造方法上
Vue.prototype.$API = API

// 将header注册成全局组件
import Header from './components/Header/Header'
Vue.component('Header',Header)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
