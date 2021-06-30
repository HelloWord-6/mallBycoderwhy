export default {
  addCar(context, payload) {
    // 用oldproduct记录拿到的新的商品
    let oldproduct = null
    for(let item of context.state.cartList) {
      if(item.iid === payload.iid) {
        oldproduct = item
      }
    }
    //判断有这个商品数量就加一 没有就添加这个商品
    if(oldproduct) {
      // oldproduct.count += 1
      //这里面的判断写在mutations里面  可以跟踪
      context.commit('addCount',oldproduct)
    }else {
      payload.count = 1
      // state.cartList.push(payload)
      //这里面的判断写在mutations里面  可以跟踪
      context.commit('addToCart',payload)
    }
    // state.cartList.push(payload)
  }
}
