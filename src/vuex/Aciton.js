// 对ajax处理的函数进行处理，需要的组件使用dispatch获取
import {requestAddress} from '../api'
import { RECEIVE_ADDRESS,RECEIVE_FOOD_CATEGORY } from './Mutation_type'

// 获取到state中的参数
import {msite} from './State'

export default {
    // 对获取经纬度的数据进行处理
    async receive_address({commit}) {
        const { longitude,latitude} = msite.address
        const result = await requestAddress(longitude,latitude)
        // 将数据commit给 mutation  ， 让mutation将数据存放到state中
        if(result.code===0) {
            commit(RECEIVE_ADDRESS,result.data)
        }
    },

    // 随意加的数据
    receive_food_category({commit}) {
        commit(RECEIVE_FOOD_CATEGORY,1111)
    }
}