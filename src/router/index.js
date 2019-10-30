import Vue from 'vue'

import VueRouter from 'vue-router'

import routes from './routes'
import Store from "../vuex/store";

Vue.use(VueRouter)

const router = new VueRouter({
    // mode: 'history',  // 配置这行，主要是为了去掉#
    routes
})


// 配置全局路由守卫，拦截指定的a路由和b路由。如果没有登陆，则跳转到登录页。如果登陆了则放行
// 配置需要检查的路由数组 
const checkRouterArr= ['a' , 'b']
router.beforeEach((to,from,next) => {
    if(checkRouterArr.indexOf(to.name) != -1 && !Store.state.token) {
        console.log(11111111111111111111111111111111111111111111111111111111)
        router.replace({name: 'logintel'})
    } else {
        next()
    }
})

export default router

