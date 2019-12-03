/* 
    对axios进行配置
*/
import axios from 'axios'
import qs from 'qs'
import router from '../router'
import store from '../vuex/store'

// 手动创建一个自定义的 axios的实例(功能上的)   但是其实instace是一个函数
const myaxios = axios.create({
    timeout: 5000, //配置 超时事件为5s 
    baseURL: '/api'   // 将所有的请求都加上一个前缀路径，以方便对接口进行统一处理(比如说跨域)
})


// 对axios进行拦截处理
// 添加请求拦截器
myaxios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 处理post请求的拦截
    // console.log(config)
    const { data, method } = config
    if (method.toLowerCase() === 'post' && data instanceof Object) {

        // 将请求的post数据 {name: 'tom', pwd: '123'} 转换成 username=zs&pwd=123这样的形式
        config.data = qs.stringify(data)        // 将json格式转换为urlencoded的格式
    }

    const rName = router.currentRoute.name
    if (rName === 'loginpwd' || rName === 'logintel') {
        return config
    }

    // 判断token是否存在
    let el_token = localStorage.getItem('el_token')
    // console.log(el_token)
    if (el_token) {
        // console.log('存在el_token')
        // 存在，则发送请求
        config.headers.Authorization = el_token
    } else {
        // 不存在，跳转到登陆页面
        let error = new Error('没有token，请重新登陆')
        error.state = 401
        throw error   // throw 的异常对象在响应拦截器中进行处理。
        // throw new Error('没有token，请重新登陆')
    }
    return config;     // 拦截之后，必须return出去
});

// 添加响应拦截器
myaxios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data; // 将响应中的data数据return出去。
}, function (error) {
    // 对响应错误做点什么
   
    // 发送请求前异常(没有token)
    if (!error.response) {
        // 跳转到登陆路由
        // console.log(router)
        const rName = router.currentRoute.name
        if (rName != 'loginpwd' && rName != 'logintel') {
            alert(error.message)
            router.replace({ name: 'logintel' })
        }
    } else {
        // 发送请求后异常，但是登陆已经过期  或者token被别人伪造了。如果这样的情况，response中会返回一个code是401
        if (error.response.status == 401) {
            // console.log(error)
            // 退出登陆（将localStorage与state中的数据清空）
            store.dispatch('loginout')
            const rName = router.currentRoute.name
            if (rName !== 'loginpwd' && rName !== 'logintel') {
                alert('登陆过期，请重新登陆')
                router.replace({ name: 'logintel' })
            }
        }
        // 404错误
        if (error.response.status == 404) {
            alert('此资源不存在')
            router.replace({ name: 'logintel' })
        }
    }

    // 这行代码是必须有的,否则所有的请求结果 只要判断result.code就会报错.因为return了一个undefined
    return new Promise((resolve) => {
        resolve(error)
    })
});

export default myaxios