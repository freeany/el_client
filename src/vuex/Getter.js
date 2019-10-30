export default {
    // 全部   --- 评论
    totalRatingsCount(state) {
        return state.ratings.length
    },

   // 推荐   --- 评论
    recommRatingsCount(state) {
        return state.ratings.reduce((pre, rating) => pre + (rating.rateType === 0 ? 1 : 0), 0)
    },

    // 获取订单的总价格
    orderAllPrice(state) {
        let allPrice = 0
        state.order.forEach(item => {
            allPrice += item.price * item.count
        });
        return allPrice
    },

    // 获取订单的总数量         
    orderAllCount(state) {
        let allCount = 0
        state.order.forEach(item => {
            allCount += item.count
        })
        return allCount
    }


}