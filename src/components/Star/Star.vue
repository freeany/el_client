<template>
  <!-- star-24是不确定的。所以需要父组件传递过来 -->
  <div class="star" :class="'star-'+size">
    <span class="star-item" :class="ratings" v-for="(ratings,index) in ratingsArr" :key="index"></span>
  </div>
</template>

<script>
export default {
  props: {
    rating: {      // 评分
      require: true,
      type: Number
    },
    size: {         // 尺寸
      type: Number
    }
  },
  data() {
    return {};
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    // console.log(this.rating);
    // console.log(this.ratingsArr);
  },
  computed: {
    ratingsArr() {
      const zInt = Math.ceil(this.rating * 1);
      const xFloat = zInt - this.rating * 1;
      let ratingArr = [];
      const zInt1 = zInt - 1;
      // 小数的解码可能存在误差。所以*10
      let z = xFloat*10 >= 5 ? zInt1 : zInt;
      for (let i = 0; i < z; i++) {
        ratingArr.push("on");
      }
      xFloat && xFloat >= 0.5 && ratingArr.push("half");
      for (let i = 0; i < 5 - zInt; i++) {
        ratingArr.push("off");
      }
      return ratingArr;
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl';

.star { // 2x图 3x图
  float: left;
  font-size: 0;

  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
  }

  &.star-48 {
    .star-item {
      width: 20px;
      height: 20px;
      margin-right: 22px;
      background-size: 20px 20px;

      &last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('./images/stars/star48_on');
      }

      &.half {
        bg-image('./images/stars/star48_half');
      }

      &.off {
        bg-image('./images/stars/star48_off');
      }
    }
  }

  &.star-36 {
    .star-item {
      width: 15px;
      height: 15px;
      margin-right: 6px;
      background-size: 15px 15px;

      &last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('./images/stars/star36_on');
      }

      &.half {
        bg-image('./images/stars/star36_half');
      }

      &.off {
        bg-image('./images/stars/star36_off');
      }
    }
  }

  &.star-24 {
    .star-item {
      width: 10px;
      height: 10px;
      margin-right: 3px;
      background-size: 10px 10px;

      &last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('./images/stars/star24_on');
      }

      &.half {
        bg-image('./images/stars/star24_half');
      }

      &.off {
        bg-image('./images/stars/star24_off');
      }
    }
  }
}
</style>