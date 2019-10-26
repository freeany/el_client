import { RECEIVE_ADDRESS,RECEIVE_FOOD_CATEGORY,RECEIVE_GSHOP,RECEIVE_USER } from './Mutation_type'
/* 
    主要使用来获取actions中传递过来的数据，存储到
*/
// 导出mutations形式的属性
export default {
    [RECEIVE_ADDRESS](state,address) {
        state.address = address
    },

    [RECEIVE_FOOD_CATEGORY](state,category) {
        // console.log(category)
        state.category = category
    },

    [RECEIVE_GSHOP](state,gshop) {
        // console.log(gshop)
        state.gshop = gshop
    },

    // 存储用户信息
    [RECEIVE_USER](state,user) {
        state.user = user
    }

}