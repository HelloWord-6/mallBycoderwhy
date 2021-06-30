<template>
<div class="cart-list">
  <scroll class="content" ref="content">
    <div>
      <cart-list-item v-for="(item,index) in cartListCount"
                      :key="index"
                      :itemInfo="item"></cart-list-item>
    </div>
  </scroll>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
import Scroll from "@/components/common/scroll/Scroll";
import CartListItem from "./CartListItem";
export default {
  name: "CartList",
  components: {
    CartListItem,
    Scroll,
    mapGetters
  },
  computed: {
    ...mapGetters(['cartListCount'])
  },
  activated() {
    this.$refs.content.gorefresh()
  }
}
</script>

<style scoped>
.cart-list {
  height: calc(100vh - 44px - 49px - 40px);
  margin-top: 44px;
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>
