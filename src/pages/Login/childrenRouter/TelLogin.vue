<template>  
  <div class="on">
    <section class="login_message" >
      <input type="tel" maxlength="11" placeholder="手机号" v-model="telNumber" />
      <button :disabled="!isRightPhone" class="get_verification" :style="{fontSize: fontSize+'px'}" 
      :class="{right_phone_number: isRightPhone}" @click.prevent="getYzm">{{yzmText}}</button>
    </section>
    <section class="login_verification">
      <input type="tel" maxlength="8" placeholder="输入验证码" v-model="yzm"/>
    </section>
    <section class="login_hint">
      温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
      <a href="javascript:;">《用户服务协议》</a>
    </section>
    <button class="login_submit" @click.prevent="login">登录</button>
  </div>
</template>

<script>
// 获取当前组件的数据
import { requestLoginYzm } from "../../../api";

export default {
  data() {
    return {
      telNumber: '',
      isRightPhone: false,
      yzmText : '获取验证码',
      fontSize: 14,           //倒计时的字体大小
      yzm: '',
      maxTime: 6   // 倒计时的最大时间
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    // 将数据存放到state中
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  watch: {
    telNumber(value) {
      if(/^1\d{10}/.test(value)) {
        this.isRightPhone = true
      } else {
        this.isRightPhone = false
      }
    }
  },
  methods: {
    async getYzm() {
      console.log(this)
      // 开始发送短信验证码
      const result = await this.$API.requestSend(this.telNumber*1)
      // console.log(result)
      if(result.code!=0) {
        alert('发送短信失败,请输入正确号码')
        return 
      }
      this.disabled = true
      let time = this.maxTime
      this.yzmText = `已发送短信${time}s`
      if(intevalId) {
        return 
      }
      const intevalId = setInterval(() => {
        this.fontSize = 16
        this.yzmText = `已发送短信${--time}s`
        
        if(time===0) {
          clearInterval(intevalId)
          this.yzmText = '获取验证码'
          this.fontSize = 14
        }
      }, 1000);
    },
    //登陆操作    //  短信验证码登陆的操作
    // 需要使用页面中的数据，所以在当前组件内部自己获取
    async login() {
      const result = await requestLoginYzm(this.telNumber,this.yzm)
      // console.log(result)
      // 将数据发送给父组件
      this.$emit('handleLoginResult',result,this.maxTime)
    }
  },
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>

/* @import ''; 引入css类 */

</style>