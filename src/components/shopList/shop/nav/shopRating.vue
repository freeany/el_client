<template>
  <div class="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{ info.score }}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家90%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <Star :rating=" info.serviceScore" :size="36"></Star>
            <span class="score">{{ info.serviceScore }}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <Star :rating="info.foodScore" :size="36"></Star>
            <span class="score">{{ info.foodScore }}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{info.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>

      <Split></Split>

      <RatingSelect @filterRatings="filterRatings"></RatingSelect>

      <!-- 这里要实现滚动 -->
      <div class="rating-wrapper">
        <ul>
          <li class="rating-item" v-for="rating in ratingsArr" :key="rating.rateTime">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar" />
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <Star :rating="rating.score" :size="24"></Star>
                <span class="delivery">{{rating.score}}</span>
              </div>
              <p class="text">{{ rating.text }}</p>
              <div class="recommend">
                <span class="iconfont icon-thumb_up"></span>
              </div>
              <div class="time">{{ rating.rateTime | dataFormat }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
import RatingSelect from "../../../RatingSelect/RatingSelect";
import Star from "../../../Star/Star";
import Split from "../../../Split/Split";
import { mapState } from "vuex";
import BScroll from "better-scroll"; // 如果只需要简单的滚动，则引入核心库即可
export default {
  data() {
    return {
      ratings: [],
      ratingsArr: [],
      bscroll: ""
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.init();
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  components: {
    RatingSelect,
    Star,
    Split
  },
  computed: {
    ...mapState(["info"])
  },
  methods: {
    async init() {
      await this.$store.dispatch("receive_ratings");
      this.ratings = this.$store.state.ratings;
      this.ratingsArr = [...this.ratings];
    },
    // 过滤的功能
    // 点击数量为2的n次数方    // 是因为BScroll不是单例的。
    filterRatings(value) {
      if (value === "tucao") {
        // 重新计算dom结构
        this.bscroll && this.bscroll.refresh()
        this.ratingsArr = this.ratings
          .filter(item => item.score < 4)
          .sort((a, b) => a.score - b.score);
      } else if (value === "tuijian") {
        this.bscroll && this.bscroll.refresh()
        this.ratingsArr = this.ratings
          .filter(item => item.score >= 4)
          .sort((a, b) => b.score - a.score);
      } else {
        this.bscroll && this.bscroll.refresh()
        this.ratingsArr = this.ratings.filter(item => item.score > 0);
      }
    }
  },
  watch: {
    ratingsArr() {
      this.$nextTick(() => {
        // 将此创建对象的方式变为单例
        if (!this.bscroll) {
          this.bscroll = new BScroll(".ratings", {
            click: true,
            bounce: true
          });
        }
      });
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../../../common/stylus/mixins.styl';

.ratings {
  position: absolute;
  top: 225px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  background: #fff;

  .overview {
    display: flex;
    padding: 18px 0;

    .overview-left {
      flex: 0 0 137px;
      padding: 6px 0;
      width: 137px;
      border-right: 1px solid rgba(7, 17, 27, 0.1);
      text-align: center;

      @media only screen and (max-width: 320px) {
        flex: 0 0 120px;
        width: 120px;
      }

      .score {
        margin-bottom: 6px;
        line-height: 28px;
        font-size: 24px;
        color: rgb(255, 153, 0);
      }

      .title {
        margin-bottom: 8px;
        line-height: 12px;
        font-size: 12px;
        color: rgb(7, 17, 27);
      }

      .rank {
        line-height: 10px;
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
    }

    .overview-right {
      flex: 1;
      padding: 6px 0 6px 24px;

      @media only screen and (max-width: 320px) {
        padding-left: 6px;
      }

      .score-wrapper {
        margin-bottom: 8px;
        font-size: 0;

        .title {
          display: inline-block;
          line-height: 18px;
          vertical-align: top;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }

        .star {
          display: inline-block;
          margin: 0 12px;
          vertical-align: top;
        }

        .score {
          display: inline-block;
          line-height: 18px;
          vertical-align: top;
          font-size: 12px;
          color: rgb(255, 153, 0);
        }
      }

      .delivery-wrapper {
        font-size: 0;

        .title {
          line-height: 18px;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }

        .delivery {
          margin-left: 12px;
          font-size: 12px;
          color: rgb(147, 153, 159);
        }
      }
    }
  }

  .rating-wrapper {
    padding: 0 18px;

    .rating-item {
      display: flex;
      padding: 18px 0;
      bottom-border-1px(rgba(7, 17, 27, 0.1));

      .avatar {
        flex: 0 0 28px;
        width: 28px;
        margin-right: 12px;

        img {
          border-radius: 50%;
        }
      }

      .content {
        position: relative;
        flex: 1;

        .name {
          margin-bottom: 4px;
          line-height: 12px;
          font-size: 10px;
          color: rgb(7, 17, 27);
        }

        .star-wrapper {
          margin-bottom: 6px;
          font-size: 0;

          .star {
            display: inline-block;
            margin-right: 6px;
            vertical-align: top;
          }

          .delivery {
            display: inline-block;
            vertical-align: top;
            line-height: 12px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }

        .text {
          margin-bottom: 8px;
          line-height: 18px;
          color: rgb(7, 17, 27);
          font-size: 12px;
        }

        .recommend {
          line-height: 16px;
          font-size: 0;

          .icon-thumb_up, .icon-thumb_down, .item {
            display: inline-block;
            margin: 0 8px 4px 0;
            font-size: 9px;
          }

          .icon-thumb_up {
            color: $yellow;
          }

          .icon-thumb_down {
            color: rgb(147, 153, 159);
          }

          .item {
            padding: 0 6px;
            border: 1px solid rgba(7, 17, 27, 0.1);
            border-radius: 1px;
            color: rgb(147, 153, 159);
            background: #fff;
          }
        }

        .time {
          position: absolute;
          top: 0;
          right: 0;
          line-height: 12px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
      }
    }
  }
}
</style>

