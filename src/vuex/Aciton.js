// 对ajax处理的函数进行处理，需要的组件使用dispatch获取
import { 
    requestAddress, 
    requestCategory, 
    requestGshop, 
    requestAutoLogin,
    requestGoods,
    requestRatings,
    requestInfo
} from '../api'
import {
    RECEIVE_ADDRESS,
    RECEIVE_FOOD_CATEGORY,
    RECEIVE_GSHOP,
    RECEIVE_USER,
    LOGINOUT, AUOT_LOGIN,
    RECEIVE_GOODS,
    RECEIVE_RATINGS,
    RECEIVE_INFO,
    RECEIVE_ORDER
} from './Mutation_type'


// 获取到state中的参数，进行处理
import state from './State'

export default {
    // 对获取经纬度的数据进行处理
    async [RECEIVE_ADDRESS]({ commit }) {
        const result = await requestAddress(state.longitude, state.latitude)
        // 将数据commit给 mutation  ， 让mutation将数据存放到state中
        console.dir(result)
        if (result.code === 0) {
            commit(RECEIVE_ADDRESS, result.data)
        } else {
            commit(RECEIVE_ADDRESS, '正在定位中....')
        }
    },

    // 获取分类列表详情
    async [RECEIVE_FOOD_CATEGORY]({ commit }) {
        const result = await requestCategory()
        // console.log(result)
        if (result.code === 0) {
            commit(RECEIVE_FOOD_CATEGORY, result.data)
        } else {
            commit(RECEIVE_FOOD_CATEGORY, [])
        }
    },

    // 获取商家列表详情
    async [RECEIVE_GSHOP]({ commit }) {
        const result = await requestGshop(state.longitude, state.latitude)
        if (result.code === 0) {
            // 因为评分的原因，所以需要对数据进行组装一下
            result.data.forEach((item) => {
                const zInt = Math.ceil(item.rating * 1)
                const xFloat = zInt - item.rating * 1
                let ratingArr = []
                const zInt1 = zInt - 1
                let z = xFloat >= 0.5 ? zInt1 : zInt
                for (let i = 0; i < z; i++) {
                    ratingArr.push('on')
                }
                xFloat && xFloat >= 0.5 && ratingArr.push('half')

                for (let i = 0; i < 5 - zInt; i++) {
                    ratingArr.push('off')
                }

                item.ratingArr = ratingArr
            })
            commit(RECEIVE_GSHOP, result.data)
        } else {
            commit(RECEIVE_GSHOP, [])
        }
    },

    // 登陆的用户信息
    [RECEIVE_USER]({ commit }, user) {
        // 对登陆的用户信息放到state中
        // 将用户信息中的token信息拿出来，然后删除用户信息中的token
        localStorage.setItem('el_token', user.token)
        delete user.token
        commit(RECEIVE_USER, user)
    },

    // 退出登陆
    // 将localStorage中的数据清空
    [LOGINOUT]({ commit }) {
        localStorage.removeItem('el_token')
        commit(LOGINOUT)
    },


    // 自动登陆
    async [AUOT_LOGIN]({ commit }) {
        const result = await requestAutoLogin()
        if (result.code === 0) {
            commit(AUOT_LOGIN, result.data)
        }
    },


    // 获取商家详情的食品信息     数组(比如 折扣: 商品列表)
    async [RECEIVE_GOODS]({ commit }) {
        const result = await requestGoods()
        if(result.code ===0) {
            commit(RECEIVE_GOODS, result.data)
        }
    },
    // 获取商家详情 的 商家信息     对象(该商家的信息)
    async [RECEIVE_RATINGS]({ commit }) {
        const result = await requestRatings()
        if(result.code ===0) {
            commit(RECEIVE_RATINGS, result.data)
        }
    },
    // 获取商家详情 的 评价信息   数组(每个人的评价)
    async [RECEIVE_INFO]({ commit }) {
        const result = await requestInfo()
        if(result.code ===0) {
            commit(RECEIVE_INFO, result.data)
        }
    },

    // 存放订单信息
    [RECEIVE_ORDER]({commit},orderItem) {
        // 如果名字相同的话说明是添加的同一个信息，将重复的信息删除掉
        // 因为这个没有ajax请求，所以将逻辑可以写在mutation中
        commit( RECEIVE_ORDER,orderItem )
    }
}