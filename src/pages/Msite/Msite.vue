<template>
  <!-- 首页外卖 -->
  <section class="msite">
    <Header :title="address">
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>

      <span class="header_login" slot="right">
        <span class="header_login_text">登录 | 注册</span>
      </span>
    </Header>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container"  v-if="foodList.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(foods,index) in foodList" :key="index">
            <a href="javascript" class="link_to_food" v-for="food in foods" :key="food.id">
              <div class="food_container">
                <img :src="'https://fuss10.elemecdn.com'+food.image_url" />
              </div>
              <span>{{food.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <div v-else>
        <img src="./msite_back.svg" alt="">
      </div>
    </nav>
    

    <!-- 使用商家列表组件 -->
    <shopList></shopList>
  </section>
</template>

<script>
// 使用商家列表组件
import shopList from "../../components/shopList/shopList";

// 使用工具类对数组进行转换为8个数据为一个数组  而组成的数组
import { chunk } from "../../utils/utils";

// 使用swipper插件
import Swiper from "swiper";
import "swiper/css/swiper.min.css";

// import { mapState } from 'vuex'
export default {
  name: 'Msite',
  data() {
    return {
      // 标题的数据
      address: "正在定位中",
      // 食物列表的数据
      foodList: []
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    // 使用store中的数据 对title进行赋值    为什么这里接收不可以？？
    // if(this.$store.state.address && this.$store.state.address.data.name) {
    //   this.title = this.$store.state.address.data.name
    // }
    this.init();
  },
  methods: {
    // 初始化显示数据
    async init() {
      // 分发mutation
      await this.$store.dispatch("receive_address");   // 返回的是一个promise
      this.address = this.$store.state.address.name;
      await this.$store.dispatch("receive_food_category");
      this.foodList = chunk(this.$store.state.category, 8);  // 返回的
        // console.log(this.foodList)
    }
  },
  computed: {
    // address() {
    //   return (this.$store.state.address && this.$store.state.address.name) ||  "正在定位中..."
    // },
    // navArr() {
    //   // return this.$store.state.
    // }
  },
  watch: {
    foodList() {
      this.$nextTick(() => {
        new Swiper(".swiper-container", {
          loop: true, // 循环模式选项
          // 如果需要分页器
          pagination: {
            el: ".swiper-pagination"
          }
        });
      });
    },
    address(value) {
      console.log(value)
      this.$nextTick(() => {
        this.address = value
      })
    }
    // address: {
    //   // deep: true,
    //   // handler() {
    //   //    oldValue = this.nextTick(() => {
    //   //     console.log(newValue, oldValue);
    //   //   })
    //   // },
    //   // immediate: true
    //   // deep: true,
    //   // handler(newValue,oldValue) {
    //   //   // console.log(newValue,oldValue)
    //   // },
    //   // immediate: true
    // }
    // address(val) {
    //   console.log(val)
    //     this.address = val
    // }
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  components: {
    //   注册组件
    shopList
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
/* @import ''; 引入css类 */
@import '../../common/stylus/mixins.styl';

.msite { // 首页
  width: 100%;

  .msite_nav {
    bottom-border-1px(#e4e4e4);
    margin-top: 45px;
    height: 200px;
    background: #fff;

    .swiper-container {
      width: 100%;
      height: 100%;

      .swiper-wrapper {
        width: 100%;
        height: 100%;

        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-wrap: wrap;

          .link_to_food {
            width: 25%;

            .food_container {
              display: block;
              width: 100%;
              text-align: center;
              padding-bottom: 10px;
              font-size: 0;

              img {
                display: inline-block;
                width: 50px;
                height: 50px;
              }
            }

            span {
              display: block;
              width: 100%;
              text-align: center;
              font-size: 13px;
              color: #666;
            }
          }
        }
      }

      .swiper-pagination {
        >span.swiper-pagination-bullet-active {
          background: #02a774;
        }
      }
    }
  }
}
</style>