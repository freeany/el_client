<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <router-link to="/login/tel" replace :class="{on: isShowTel}" >短信登陆</router-link>
          <router-link to="/login/pwd" replace :class="{on: isShowPwd}">密码登陆</router-link>
          <!-- <a href="javascript:;" class="on">短信登录</a> -->
          <!-- <a href="javascript:;">密码登录</a>  -->
        </div>
      </div>
      <div class="login_content">
        <form>
          <!--  -->
          <router-view @handleLoginResult="handleLoginResult"></router-view>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click.prevent="goback">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      user:''
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  // 进入登陆组件之前，如果已经登陆了，则直接跳转到个人中心，也就是a组件
  beforeRouteEnter (to, from, next) {
    next(component => {
      // 如果tokenu存在，则直接跳转。
      if(component.$store.state.token) {
        component.$router.replace({name: 'a'})
      }
    })
  },
  methods: {
    //   返回到上一个页面
      goback() {
          this.$router.back(-1)
      },
      // 获取登陆过来的数据
      handleLoginResult(result,updateSrc) {
        console.log(result.status)
        if(result.code != 0) {
          alert(result.msg)
          updateSrc && typeof updateSrc === 'function' && updateSrc()
          // alert('登陆失败')
          // return 
        } else {
          // 将数据存放到vuex中
          this.$store.dispatch('receive_user',result.data)
          // console.log('login页面取到了： ',this.$store.state)
          // 跳转路由
          this.$router.push({name: 'profile'})
        }
      }
  },
  computed: {
    isShowTel() {
      return this.$route.path.endsWith('tel')
    },
    isShowPwd() {
      return this.$route.path.endsWith('pwd')
    }
  },
}
</script>
<style lang="stylus" rel="stylesheet/stylus" >
/* @import ''; 引入css类 */
@import '../../common/stylus/mixins.styl';

.loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;

  .loginInner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;

    .login_header {
      .login_logo {
        font-size: 40px;
        font-weight: bold;
        color: #02a774;
        text-align: center;
      }

      .login_header_title {
        padding-top: 40px;
        text-align: center;

        >a {
          color: #333;
          // font-size: 14px;
          padding-bottom: 4px;
          text-decoration: none;

          &:first-child {
            margin-right: 40px;
          }

          &.on {
            color: #02a774;
            font-weight: 700;
            border-bottom: 2px solid #02a774;
          }
        }
      }
    }

    .login_content {
      >form {
        >div {
          display: none;

          &.on {
            display: block;
          }

          input {
            width: 100%;
            height: 100%;
            padding-left: 10px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;

            &:focus {
              border: 1px solid #02a774;
            }
          }

          .login_message {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .get_verification {
              position: absolute;
              top: 1px;
              right: 1px;
              bottom: 1px;
              height: 95%;
              width: 25%;

              // transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 12px;
              background: transparent;
              background-color: #EEEEEE;
              &.right_phone_number {
                color: #000
              }
            }
          }

          .login_verification {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .switch_button {
              font-size: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              transition: background-color 0.3s, border-color 0.3s;
              padding: 0 6px;
              width: 30px;
              height: 16px;
              line-height: 16px;
              color: #fff;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);

              &.off {
                background: #fff;

                .switch_text {
                  float: right;
                  color: #ddd;
                }
              }

              &.on {
                background: #02a774;
              }

              >.switch_circle {
                // transform translateX(27px)
                position: absolute;
                top: -1px;
                left: -1px;
                width: 16px;
                height: 16px;
                border: 1px solid #ddd;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                transition: transform 0.3s;

                &.right {
                  transform: translateX(27px);
                }
              }
            }
          }

          .login_hint {
            margin-top: 12px;
            color: #999;
            font-size: 14px;
            line-height: 20px;

            >a {
              color: #02a774;
            }
          }
        }

        .login_submit {
          display: block;
          width: 100%;
          height: 42px;
          margin-top: 30px;
          border-radius: 4px;
          background: #4cd96f;
          color: #fff;
          text-align: center;
          font-size: 16px;
          line-height: 42px;
          border: 0;
        }
      }

      .about_us {
        display: block;
        font-size: 12px;
        margin-top: 20px;
        text-align: center;
        color: #999;
      }
    }

    .go_back {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 30px;
      height: 30px;

      >.iconfont {
        font-size: 20px;
        color: #999;
      }
    }
  }
}

</style>