<template>
<div class="cart">
<!--  导航-->
  <nav-bar class="navbar"><div slot="center">购物车({{Length}})</div></nav-bar>
<!--  商品列表-->
    <cart-list></cart-list>
<!--  汇总信息-->
  <cart-bottom-bar></cart-bottom-bar>
</div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import {mapGetters} from 'vuex'
import CartBottomBar from "./childComps/CartBottomBar";
export default {
  name: "Cart",
  components: {
    CartBottomBar,
    NavBar,
    CartList
  },
  computed: {
    ...mapGetters(['Length'])
  }
}
</script>
<style scoped>
.cart {
  height: 100vh;
}
.navbar{
  position: fixed;
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
  top: 0px;
  left: 0px;
  right: 0px;
}
</style>
