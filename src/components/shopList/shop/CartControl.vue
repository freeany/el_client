<template>
  <div class="cartcontrol">
    <transition name="slide-fade">
      <div class="iconfont icon-remove_circle_outline" @click.stop="remove()" v-show="currentCount"></div>
    </transition>
    <transition name="slide-fade">
      <div class="cart-count" v-show="currentCount">{{ currentCount }}</div>
      <!-- 上面的插值表达式中的数据应该是从vuex中获取的。 -->
    </transition>
    <div class="iconfont icon-add_circle" @click.stop="add()"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
/* 
  将食物数据传递过来。封装成购物车类数据结构的对象放入vuex中。
  购物车每条数据所需的数据结构？
    食品的id，姓名，价格，数量，总价，创建时间，购买人id
  这里就 不用这么复杂了。使用  姓名，价格，数量  就可以了。
  购物车上显示的数量需要计算。
  订单项是个对象，订单是个数组。
*/
export default {
  // 传过来的数据    如果是shopCart(购物车组件)传的则是在vuex中的food。有count，
  // 如果是orderdingFood(每个食品数据)传的，则就是该食品的数据，没有count
  props: {
    food: {
      require: true,
      type: Object
    }
  },
  data() {
    return {
      // 将count存入
      count: 0,
      currentCount: 0 // vuex中当前商品的数量
    };
  },

  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  computed: {
    ...mapState(["order"]),
    // 获取当前组件对应的商品/订单项的数量
    // currentCount() {}
  },
  methods: {
    remove() {
      if (this.currentCount === 0) return;
      if (!this.food.count) {
        this.count--;
      } else {
        this.count = --this.food.count;
      }
      let { count } = this;
      let { name, price } = this.food;
      let food = {
        name,
        price,
        count
      };
      // this.$store.dispatch('receive_gshop')

      this.$store.dispatch("receive_order", food);
    },
    add() {
      if (!this.food.count) {
        this.count++;
      } else {
        this.count = ++this.food.count;
      }
      let { count } = this;
      let { name, price } = this.food;
      let food = {
        name,
        price,
        count
      };
      // console.log(food);
      // this.$store.dispatch('receive_gshop')

      this.$store.dispatch("receive_order", food);
    }
  },
  watch: {
    order: {
      deep: true,
      handler(value) {
        // console.log(value)
        // console.log(1)
        // console.log(this)
        // console.log('handler',this.food.name)
        // console.log(2)
        let foodCount = 0;
        // console.log(this.order.length)
        // console.log(this.order)
        if (value.length > 0) {
          // console.log(this.order.length)
          value.forEach(item => {
            // console.log('foreach',item.name)
            // console.log(item.name)
            if (item.name === this.food.name) {
              foodCount = item.count;
              return;
            }
          });
        }
        this.currentCount =  foodCount;
      }
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../../common/stylus/mixins.styl';

// 设置div不可被点击
.no-click {
  pointer-events: none;
}

// 设置动画样式
.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.cartcontrol {
  font-size: 0;

  .cart-decrease {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: rgb(0, 160, 220);
  }

  .icon-remove_circle_outline {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: $green;
  }

  .cart-count {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .icon-add_circle {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: $green;
  }
}
</style>

