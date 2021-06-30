<template>
  <div id="app">
    <keep-alive exclude="Detail"><router-view></router-view></keep-alive>
<!--    路由配置的meta 是true就显示，不是就不显示-->
    <main-tab-bar v-if="$route.meta.footShow"></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabbar/MainTabBar";
export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
@import "assets/css/base.css";
#app {
  position: relative;
}
</style>
