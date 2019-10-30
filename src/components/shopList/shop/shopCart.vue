<!--  -->
<template>
  <div>
    <div class="shopcart" @click="isShowListMaskHnadle">
      <div class="content">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo " :class="{highlight: orderAllCount}">
              <i class="iconfont icon-shopping_cart highlight"></i>
            </div>
            <div class="num" v-show="orderAllCount">{{orderAllCount}}</div>
          </div>
          <div class="price highlight">￥{{orderAllPrice}}</div>
          <div class="desc">另需配送费￥{{info.deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="[orderAllPrice-info.minPrice>0 ? 'enough' : 'not-enough']">
            <span v-show="orderAllPrice-info.minPrice<0">还差￥{{-(orderAllPrice-info.minPrice)}}元起送</span>
            <span v-show="orderAllPrice-info.minPrice>=0">去结算</span>
          </div>
        </div>
      </div>
      <div class="shopcart-list" v-show="isShowListMask  && orderAllCount" @click.stop="stopThis">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty">清空</span>
        </div>
        <div class="list-content">
          <ul>
            <li class="food" v-for="ord in order" :key="ord.name" v-show="ord.count">
              <span class="name">{{ord.name}}</span>
              <div class="price">
                <span>￥{{ord.price}}</span>
              </div>
              <!-- <div class="cartcontrol-wrapper">
                <div class="cartcontrol">
                  <div class="iconfont icon-remove_circle_outline"></div>
                  <div class="cart-count">{{ord.count}}</div>
                  <div class="iconfont icon-add_circle"></div>
                </div>
              </div> -->
              <div class="cartcontrol-wrapper">
                <CartControl :food="ord"></CartControl>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="list-mask" v-show="isShowListMask && orderAllCount" @click="isShowListMaskHnadle"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from 'vuex'
import CartControl from "./CartControl";

import BScroll from 'better-scroll'
export default {
  data() {
    return {
      isShowListMask: false,
      bscroll: '',
      a:  1
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  computed: {
    // 获取所有的订单信息
    ...mapState(["order"]),
    ...mapState(['info']),
    ...mapGetters(['orderAllPrice']),
    ...mapGetters(['orderAllCount']),
  },
  methods: {
    isShowListMaskHnadle() {
      this.isShowListMask = !this.isShowListMask;
    },
    // 给shoplist添加点击事件，是为了阻止mask的点击事件
    stopThis() {
      this.a = 1
    }
  },
  watch: {
    order() {
      this.$nextTick(() => {
        // 获取总价格
        if(!this.bscroll) {
          this.bscroll = new BScroll('.list-content',{
            click: true,
            bounce: true
          })
        }
      })
    }
  },
  components: {
    CartControl
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../../common/stylus/mixins.styl';

.shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 50;
  width: 100%;
  height: 48px;

  .content {
    display: flex;
    background: #141d27;
    font-size: 0;
    color: rgba(255, 255, 255, 0.4);

    .content-left {
      flex: 1;

      .logo-wrapper {
        display: inline-block;
        vertical-align: top;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        border-radius: 50%;
        background: #141d27;

        .logo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          text-align: center;
          background: #2b343c;

          &.highlight {
            background: $green;
          }
          
          .icon-shopping_cart {
            line-height: 44px;
            font-size: 24px;
            color: #80858a;

            &.highlight {
              color: #fff;
            }
          }
        }

        .num {
          position: absolute;
          top: 0;
          right: 0;
          width: 24px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          border-radius: 16px;
          font-size: 9px;
          font-weight: 700;
          color: #ffffff;
          background: rgb(240, 20, 20);
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
        }
      }

      .price {
        display: inline-block;
        vertical-align: top;
        margin-top: 12px;
        line-height: 24px;
        padding-right: 12px;
        box-sizing: border-box;
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        font-size: 16px;
        font-weight: 700;

        &.highlight {
          color: #fff;
        }
      }

      .desc {
        display: inline-block;
        vertical-align: top;
        margin: 12px 0 0 12px;
        line-height: 24px;
        font-size: 10px;
      }
    }

    .content-right {
      flex: 0 0 105px;
      width: 105px;

      .pay {
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 12px;
        font-weight: 700;

        &.not-enough {
          background: #2b333b;
        }

        &.enough {
          background: #00b43c;
          color: #fff;
        }
      }
    }
  }

  .shopcart-list {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    transform: translateY(-100%);

    &.move-enter-active, &.move-leave-active {
      transition: all 0.5s;
    }

    &.move-enter, &.move-leave-to {
      transform: translateY(0);
    }

    .list-header {
      height: 40px;
      line-height: 40px;
      padding: 0 18px;
      background: #f3f5f7;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);

      .title {
        float: left;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }

      .empty {
        float: right;
        font-size: 12px;
        color: rgb(0, 160, 220);
      }
    }

    .list-content {
      padding: 0 18px;
      max-height: 217px;
      overflow: hidden;
      background: #fff;

      .food {
        position: relative;
        padding: 12px 0;
        box-sizing: border-box;
        bottom-border-1px(rgba(7, 17, 27, 0.1));

        .name {
          line-height: 24px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .price {
          position: absolute;
          right: 90px;
          bottom: 12px;
          line-height: 24px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(240, 20, 20);
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 6px;
        }
      }
    }
  }
}

.list-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 40;
  backdrop-filter: blur(10px);
  opacity: 1;
  background: rgba(7, 17, 27, 0.6);

  &.fade-enter-active, &.fade-leave-active {
    transition: opacity 0.5s;
  }

  &.fade-enter, &.fade-leave-to {
    opacity: 0;
  }
}
</style>