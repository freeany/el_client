<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul>
          <li
            class="menu-item"
            v-for="(good,index) in goods"
            :class="{current: currentIndex === index}"
            :key="good.name"
            @click.prevent="currentClass(index)"
            ref="menu"
          >
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon" />
              {{ good.name }}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul>
          <li class="food-list-hook" ref="food" v-for="good in goods" :key="good.name">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="food in good.foods"
               :key="food.name" @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon" />
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{ food.description }}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"></CartControl>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <!-- 弹出商品的模态框 -->
     <MaskFood v-show="isShowFoodMask" :food="showFoodProp" @closeMaskFood="closeMaskFood"></MaskFood>
    </div>
  </div>
</template>

<script>
import CartControl from "../CartControl";
// 引入滑动插件better-scroll
import BScroll from "better-scroll";
// import { mapState } from "vuex";
import MaskFood from "../../../MaskFood/MaskFood";
export default {
  name: "orderingFood",
  data() {
    return {
      goods: [],
      currentIndex: 0,
      foodHeightArr: [0], 
      foodScroll: '', 
      menuScroll: '',
      isShowFoodMask: false,  //  是否显示食品详情的模态框
      showFoodProp: {},   // 要传输到maskFood中的食物数据。
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.init();
  },
  methods: {
   
    async init() {
      await this.$store.dispatch("receive_goods");
      this.goods = this.$store.state.goods;
    },
    // 当前点击的获取active类
    // 且用代码手动调整div的滚动高度。
    currentClass(index) {
      this.currentIndex = index;
      this.foodScroll.scrollTo(0, -this.foodHeightArr[index],1000, 'easing')
    },
    
    // 点击li，展示食品详情的模态框
    showFood(food) {
      this.isShowFoodMask = true
      this.showFoodProp = food
    },
    // 点击其他，关闭模态框，需要子组件maskFood去控制。
    closeMaskFood() {
      this.isShowFoodMask = false
    }
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  components: {
    CartControl,
    MaskFood
  },
  watch: {
    // 监视goods，在goods变化的时候，且dom更新完成之后，使用滑动插件。
    // 因为滑动插件必须要在列表渲染完毕才可以被有效的使用
    goods() {
      this.$nextTick(() => {
        this.menuScroll = new BScroll(".menu-wrapper", {
          click: true
        });
        this.foodScroll = new BScroll(".foods-wrapper", {
          probeType: 3,
          click: true,
          bounce: true
        });

        // 将每一个food（也就是li）的高度叠加的存到数组中
        // 意义在于： 当滚动到li的高度时，判断li的高度大于当前数组角标值且小于下一个数组角标值的当前角标
        // 将其赋值给currentIndex。即可完成滑档右侧，对应左侧。
        let allHeigt = 0;
        this.$refs.food.forEach(item => {
          allHeigt += item.offsetHeight;
          this.foodHeightArr.push(allHeigt-2);
        }); 
        //  740      900
        // 0,750  750,1083 
        this.foodScroll.on("scroll", pos => {
          this.currentIndex = this.foodHeightArr.findIndex(
            (item, index) => -pos.y >= item && -pos.y < this.foodHeightArr[index + 1]
          );
          // console.log(this.currentIndex*this.$refs.menu[0].offsetHeight)
          // 将meun的li滚动到当前的 当前currntIndex的位置。
          this.menuScroll.scrollToElement(this.$refs.menu[this.currentIndex], 300)

        });
      });
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../../../common/stylus/mixins.styl';

.goods {
  display: flex;
  position: absolute;
  top: 225px;
  bottom: 46px;
  width: 100%;
  background: #fff;
  overflow: hidden;

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;

    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      padding: 0 12px;
      line-height: 14px;

      &.current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff;
        color: $green;
        font-weight: 700;

        .text {
          border-none();
        }
      }

      .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
      }

      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        bottom-border-1px(rgba(7, 17, 27, 0.1));
        font-size: 12px;
      }
    }
  }

  .foods-wrapper {
    flex: 1;

    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }

    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      bottom-border-1px(rgba(7, 17, 27, 0.1));

      &:last-child {
        border-none();
        margin-bottom: 0;
      }

      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }

      .content {
        flex: 1;

        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .desc, .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }

        .desc {
          line-height: 12px;
          margin-bottom: 8px;
        }

        .extra {
          .count {
            margin-right: 12px;
          }
        }

        .price {
          font-weight: 700;
          line-height: 24px;

          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }

          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}
</style>

