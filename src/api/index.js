import myaxios from './ajax'

// 根据经纬度获取地址详情
export const requestAddress = (longitude,latitude) => {
   return myaxios.get( `/position/${latitude},${longitude}`)
}

// 获取分类列表详情
export const requestCategory = () => {
   return myaxios.get('/index_category')
}

// 获取商家列表详情
export const requestGshop = (longitude,latitude) => {
   return myaxios.get(`/shops?latitude=${latitude}&longitude=${longitude}`)
}

// 发送短信验证码   不需要存储到vuex中
export const requestSend = (phone) => {
   return myaxios.get('/sendcode',{params: {phone: phone}})
}

// 短信验证码登陆
// 点击登陆，调用登陆短信验证码接口   应该需要将用户数据存放到vuex中。
export const requestLoginYzm = (phone,code) => {
   return myaxios.post('/login_sms',{ phone,code })
}

// 密码登陆
// 点击登陆，调用用户名密码登陆接口， 应该需要将用户数据存放到vuex中。
export const requestLoginPwd = ({name,pwd,captcha}) => {
   return myaxios.post('/login_pwd',{name,pwd,captcha})
}

// 自动登陆
export const requestAutoLogin = () => {
   return myaxios.get('/auto_login')
}

