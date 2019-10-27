// 对ajax处理的函数进行处理，需要的组件使用dispatch获取
import { requestAddress, requestCategory, requestGshop, requestAutoLogin } from '../api'
import { RECEIVE_ADDRESS, RECEIVE_FOOD_CATEGORY, RECEIVE_GSHOP, RECEIVE_USER, LOGINOUT, AUOT_LOGIN } from './Mutation_type'

// 获取到state中的参数，进行处理
import { msite } from './State'

export default {
    // 对获取经纬度的数据进行处理
    async [RECEIVE_ADDRESS]({ commit }) {
        const { longitude, latitude } = msite.address
        const result = await requestAddress(longitude, latitude)
        // 将数据commit给 mutation  ， 让mutation将数据存放到state中
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
        const { longitude, latitude } = msite.address
        const result = await requestGshop(longitude, latitude)
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
        if(result.code === 0) {
            commit(AUOT_LOGIN, result.data)
        }
    }


}