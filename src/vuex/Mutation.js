import {
    RECEIVE_ADDRESS,
    RECEIVE_FOOD_CATEGORY,
    RECEIVE_GSHOP,
    RECEIVE_USER,
    LOGINOUT,
    AUOT_LOGIN,
    RECEIVE_GOODS,
    RECEIVE_RATINGS,
    RECEIVE_INFO,
    RECEIVE_ORDER
} from './Mutation_type'
/* 
    主要使用来获取actions中传递过来的数据，存储到
*/
// 导出mutations形式的属性
export default {
    [RECEIVE_ADDRESS](state, address) {
        state.address = address
    },

    [RECEIVE_FOOD_CATEGORY](state, category) {
        // console.log(category)
        state.category = category
    },

    [RECEIVE_GSHOP](state, gshop) {
        // console.log(gshop)
        state.gshop = gshop
    },

    // 存储用户信息
    [RECEIVE_USER](state, user) {
        state.user = user
    },

    // 退出登陆
    [LOGINOUT](state) {
        state.user = {}
        state.token = ''
    },

    // 自动登陆
    [AUOT_LOGIN](state, user) {
        state.user = user
    },

    // 获取商家详情的食品信息     数组(比如 折扣: 商品列表)
    [RECEIVE_GOODS](state, goods) {
        state.goods = goods
    },
    // 获取商家详情 的 商家信息     对象(该商家的信息)
    [RECEIVE_RATINGS](state, ratings) {
        state.ratings = ratings
    },
    // 获取商家详情 的 评价信息   数组(每个人的评价)
    [RECEIVE_INFO](state, info) {
        state.info = info
    },
    // 存放用户订单信息  
    [RECEIVE_ORDER](state, orderItem) {
        let flag = false
        // 如果名字相同的话说明是添加的同一个信息，将重复的信息删除掉
        if (state.order.length > 0) {
            state.order.forEach(item => {
                if (item.name === orderItem.name) {
                    item.count = orderItem.count
                    flag = true
                }
            })
        }
        if(flag) {
            return
        }
        state.order.push(orderItem)
    }
}