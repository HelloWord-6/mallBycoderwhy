<template>
<div class="tab-control">
  <div v-for="(item,index) in titles" class="tab-control-item"
  :class="{active: index === currentIndex}" @click="tabClick(index)">
    <span>{{item}}</span>
  </div>
</div>
</template>

<script>
export default {
  name: "TabControl",
  data () {
    return {
      currentIndex: 0
    }
  },
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    tabClick(index) {
      this.currentIndex = index;
      //子传父  用$emit 参数是自定义事件 tabClick 和 要传递的index
      this.$emit('tabClick',index)
    }
  }
}
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  background-color: #ffffff;
}
.tab-control-item {
  flex: 1;
}
.tab-control-item span {
  padding: 5px;
}
.active {
  color: var(--color-high-text);
}
.active span{
  border-bottom: 3px solid var(--color-tint);
}
</style>
