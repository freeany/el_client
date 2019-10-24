import { RECEIVE_ADDRESS,RECEIVE_FOOD_CATEGORY } from './Mutation_type'
/* 
    主要使用来获取actions中传递过来的数据，存储到
*/
// 导出mutations形式的属性
export default {
    [RECEIVE_ADDRESS](state,address) {
        state.address = address
    },

    [RECEIVE_FOOD_CATEGORY](state,category) {
        state.category = category
    }
}