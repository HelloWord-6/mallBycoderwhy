<template>
  <div class="tab-bar-item" @click="itemClick">
<!--    下面的数据不能写死 所以还要写两个插槽-->
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
<!--  下面字体颜色不能这样写，要动态改变   :class="{active: isActive}"-->
    <div :style="activeStyle">
      <slot name="item-txt"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props:{
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  data(){
    return{
      // isActive:true
    }
  },
  methods:  {
    itemClick(){
      this.$router.push(this.path).catch(err => err)
    }
  },
  computed: {
    isActive() {
      //indexOf() 如果要检索的字符串值没有出现，则该方法返回 -1。
      return this.$route.path.indexOf(this.path) != -1
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  }
}
</script>

<style scoped>
.tab-bar-item{
  flex: 1;
  height: 49px;
  text-align: center;
  font-size: 14px;
}
.tab-bar-item img{
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 1px;
}
/*.active{*/
/*  color: red;*/
/*}*/
</style>
