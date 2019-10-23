<template>
  <div id="app">
    <router-view />
    <!-- footer组件 -->
    <FooterGuide v-show="$route.meta.isShowFooter" />
  </div>
</template>

<script>
// 引入 footer组件
import FooterGuide from "./components/FooterGuide/FooterGuide";

// 测试ajax请求
import { requestAddress } from "./api";
export default {
  name: "app",
  components: {
    FooterGuide
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const result = await requestAddress('121.6125300000','31.0349100000');
      console.log(result);
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus"></style>
