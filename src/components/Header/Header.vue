<template>
  <!--首页头部-->
  <header class="header">
    <slot name="left"></slot>

    <span class="header_title ellipsis">
      <span class="header_title_text ellipsis">{{title}}</span>
    </span>

    <slot name="right"></slot>
  </header>
</template>

<script>
export default {
  props: {
    title: {
      require: true,
      type: String
    }
  },
  
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    // // 使用store中的数据 对title进行赋值   
    // console.log(this.$store.state)
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
/* @import ''; 引入css类 */
.header {
  background-color: #02a774;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 45px;

  .header_search {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    width: 10%;
    height: 50%;

    .iconfont {
      font-size: 25px;
      color: #fff;
    }
  }

  .header_title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30%;
    color: #fff;
    font-size: 20px;
    text-align: center;
  }

  .header_login {
    font-size: 14px;
    color: #fff;
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);

    .header_login_text {
      color: #fff;
    }
  }
}
</style>