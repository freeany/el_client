<template>
  <!-- <div :class="{on: $route.meta.isShowpwd}">  -->
  <div class="on"> 

    <section>
      <section class="login_message">
        <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="user.name" />
      </section>
      <section class="login_verification">
        <input :type="isShowPwdType" maxlength="8" placeholder="密码" v-model="user.pwd" />
        <div class="switch_button" :class="offOrOn" @click.prevent="Updateswitch">
          <div class="switch_circle" :class="{right : offOrOn==='on'}"></div>
          <span class="switch_text">{{ offOrOn==='on' ? 'abc' : '...'}}</span>
        </div>
      </section>
      <section class="login_message">
        <input type="text" maxlength="11" placeholder="验证码" v-model="user.captcha" />
        <img class="get_verification" :src="captchaImg" @click.prevent="updateSrc" alt="captcha" />
      </section>
    </section>
    <button class="login_submit" @click.prevent="login">登录</button>
  </div>
</template>

<script>
// 调用用户名密码登陆接口的返回数据
import { requestLoginPwd } from "../../../api";
export default {
  data() {
    return {
      isShowPwdType: 'password',      // 密码的显示与隐藏
      offOrOn: 'off',                 // 开关switch的类名
      captchaImg: 'http://localhost:4000/captcha', // 图片验证码
      // 用户登陆的数据
      user: {
        name: '',
        pwd: '',
        captcha: ''
      }
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    Updateswitch() {
      this.offOrOn === 'on' ? this.offOrOn = 'off' : this.offOrOn = 'on' 
      this.isShowPwdType === 'password' ? this.isShowPwdType = 'text' : this.isShowPwdType = 'password'
    },
    // 更新验证码
    updateSrc() {
      this.captchaImg = 'http://localhost:4000/captcha?aa='+Date.now()
    },
    // 登陆操作
    async login() {
      // 密码登陆
      const result = await requestLoginPwd(this.user)
      // console.log(result)
      this.$emit('handleLoginResult',result,this.updateSrc)
    }
  },
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
/* @import ''; 引入css类 */

</style>