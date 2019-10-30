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
export default {
  name: "app",
  components: {
    FooterGuide
  },
  created() {
    // 在app的created中 处理事件
  },
  methods: {},
  computed: {}
};
</script>

<style lang="stylus" rel="stylesheet/stylus"></style>
