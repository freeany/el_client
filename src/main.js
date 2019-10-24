import Vue from 'vue'
import App from './App.vue'

import router from './router'

// 注册vuex
import store from './vuex/store'

// 将header注册成全局组件
import Header from './components/Header/Header'
Vue.component('Header',Header)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
  
}).$mount('#app')
