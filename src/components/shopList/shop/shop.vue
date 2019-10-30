<template>
  <div>
    <!-- shop的头部 -->
    <shop-header />
    <!-- nav导航 -->
    <div class="tab">
      <div class="tab-item">
        <router-link to="/elShop/OrderdingFood" replace>点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/elShop/shopRating" replace>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/elShop/Shops" replace>商家</router-link>
      </div>
    </div>
    <!-- 显示导航路由 -->
    <router-view />

    <!-- 显示shopCart组件 -->
    <shopCart></shopCart>
  </div>
</template>

<script>
import shopHeader from "./shopHeader";
import shopCart from "./shopCart";
export default {
  data() {
    return {};
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.$store.dispatch("receive_info");
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  components: {
    shopHeader,
    shopCart
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
/* @import ''; 引入css类 */
@import '../../../common/stylus/mixins.styl';

.tab {
  height: 40px;
  line-height: 40px;
  background: #fff;
  bottom-border-1px(rgba(7, 17, 27, 0.1));

  .tab-item {
    float: left;
    width: 33.33333%;
    text-align: center;
    font-size: 14px;
    color: rgb(77, 85, 93);

    a {
      display: block;
      position: relative;

      &.router-link-active {
        color: #02a774;

        &::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: 1px;
          width: 35px;
          height: 2px;
          transform: translateX(-50%);
          background: #02a774;
        }
      }
    }
  }
}
</style>