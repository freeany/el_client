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

    // 解决所有的请求连续点击  报错的情况
    // console.log(to)
    // console.log(from)
    if(to.path === from.path) {
        return 
    }
    // 如果请求的路径在上面的数组中，并且没有token值，就强行让路由转向到手机号登陆路由
    if(checkRouterArr.indexOf(to.name) != -1 && !Store.state.token) {
        router.replace({name: 'logintel'})
    } else {
        next()
    }
})

export default router

