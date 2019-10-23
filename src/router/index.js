import Vue from 'vue'

import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',  // 配置这行，主要是为了去掉#
    routes
})