export default {
    latitude: '31.0349100000',    // 精度
    longitude: '121.6125300000',   // 纬度
    token : localStorage.getItem('el_token') || '',    // token的信息
    info : {},                        // 商家的信息
    ratings: [],                       // 商家的评分信息
    order: []           // 该用户的订单信息
}
