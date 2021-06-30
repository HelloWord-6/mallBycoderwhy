<!--商品详情页标题-->
<template>
<div>
  <nav-bar class="detailBar">
    <div slot="left" class="leftImg" @click="backClick">
      <img src="~assets/img/common/back.svg">
    </div>
    <div slot="center" class="title">
      <div class="itemTitle"
           v-for="(item,index) in title " :key="index"
           :class="{'active': index===currentIndex}"
           @click="titleClick(index)">{{item}}</div>
    </div>
  </nav-bar>
</div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      title: ['商品','参数','评论','推荐'],
      currentIndex: 0
    }
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index
      //向父组件发射事件，获取当前点击的索引
      this.$emit('navBarClick',index)
    },
    //点击返回
    backClick() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.title {
  display: flex;
  font-size: 13px;
}
.itemTitle {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.leftImg {
  margin-top: 6px;
}
</style>
