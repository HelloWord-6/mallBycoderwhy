<template>
  <div class="recommends">
    <div v-for="item in recommends" class="recommends-item">
      <a :href="item.link">
        <img :src="item.image">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: "RecommendView",
  props: {
    // 先把数据拿过来
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.recommends {
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 12px;
  padding: 10px 0 20px;
  border-bottom: 10px solid #eee;
}
.recommends-item {
  flex: 1;
}
.recommends-item img {
  width: 80%;
  margin-bottom: 10px;
}
</style>
