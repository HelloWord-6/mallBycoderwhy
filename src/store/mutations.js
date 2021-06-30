export default {
  //mutations的唯一目的就是修改state里面的值
  //mutations里面的方法尽可能的完成的单一一点
  addCount(state,payload) {
    payload.count ++
  },
  addToCart(state,payload) {
    payload.checked = false  //给加入到购物车的每个商品 都是不选中
    state.cartList.push(payload)
  }
}
