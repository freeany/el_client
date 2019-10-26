<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <router-link to="/login/tel" :class="{on: isShowTel}" >短信登陆</router-link>
          <router-link to="/login/pwd" :class="{on: isShowPwd}">密码登陆</router-link>
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
  methods: {
    //   返回到上一级
      goback() {
          this.$router.go(-1)
      },
      // 获取登陆过来的数据
      handleLoginResult(result,updateSrcOrmaxTime) {
        console.log(result)
        // 将定时器清空，防止内存泄漏
        if(typeof updateSrcOrmaxTime === 'number') {
          // 清空定时器
          updateSrcOrmaxTime === 0    // 这样应该是不行的
        }
        if(result.code != 0) {
          alert(result.msg)
          updateSrcOrmaxTime && typeof updateSrcOrmaxTime === 'function' && updateSrcOrmaxTime()
          // alert('登陆失败')
          // return 
        } else {
          // 将数据存放到vuex中
          this.$store.dispatch('receive_user',result.data)
          // 跳转路由
          this.$router.push({name: 'profile'})
          // 将定时器清除
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
};
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
              height: 100%;
              width: 25%;

              // transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 16px;
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