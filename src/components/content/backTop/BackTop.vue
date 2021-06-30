<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png">
  </div>
</template>

<script>
export default {
  name: "BackTop"
}
</script>

<style scoped>
.back-top {
  position: fixed;
  bottom: 52px;
  right: 8px;
  z-index: 10;
}
.back-top img {
  width: 60px;
  height: 60px;
}
</style>
