/* 
    对axios进行配置
*/
import axios from 'axios'
import qs from 'qs'

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
    const { data,method } = config
    if (method.toLowerCase() === 'post' && data instanceof Object) {

        // 将请求的post数据 {name: 'tom', pwd: '123'} 转换成 username=zs&pwd=123这样的形式
        config.data = qs.stringify(data)
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
myaxios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data; // 将响应中的data数据return出去。
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default myaxios