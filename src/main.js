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
Vue.component('Header', Header)

// 将css文件引入进来
import '../public/css/reset.css'

// 引入mock的数据
import './mock/mockServer'


// 定义全局过滤器
Vue.filter("dataFormat", function (dataStr, pattern = "") {
  let date = new Date(dataStr);

  let year = date.getFullYear();
  let month = (date.getMonth() + 1)
    .toString()
    .padStart(2, "0")
    .toString();
  let day = date
    .getDate()
    .toString()
    .padStart(2, "0");
  let hour = date
    .getHours()
    .toString()
    .padStart(2, "0");
  let minutes = date
    .getMinutes()
    .toString()
    .padStart(2, "0");
  let seconds = date
    .getSeconds()
    .toString()
    .padStart(2, "0");

  if (pattern.toLowerCase() === "yyyy-mm-dd") {
    return `${year}-${month}-${day}`;
  }

  return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
});



Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
