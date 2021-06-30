<template>
  <div id="tab-bar">
<!--    把下面的item接着抽离出来，放一个插槽放在新的.vue文件里面，这只保留tab-bar-->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar"
}
</script>

<style scoped>
#tab-bar{
  display: flex;
  background-color: #f6f6f6;
  position: fixed;
  z-index: 200;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0px -1px 1px rgba(100,100,100,.1);
}
</style>
