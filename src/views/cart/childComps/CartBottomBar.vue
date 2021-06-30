<template>
<div class="bottom-bar">
  <div class="check">
    <check-button class="check-button"
                  :isCheck="allIsCheck" @click.native="nativeCick"></check-button>
    <span>全选</span>
  </div>
  <div class="price">
    <span>价格:{{allPrice}}</span>
  </div>
  <div class="calculate">
    <span>去计算: ({{checkLength}})</span>
  </div>
</div>
</template>

<script>

import CheckButton from "components/content/checkButton/CheckButton";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    allPrice() {
      return '￥' + this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((sell,item) => {
        return sell + item.newPrice * item.count
      },0).toFixed(2)
    },
    //去计算 选中商品的长度
    checkLength() {
      return this.$store.state.cartList.filter(item => item.checked).length
    },
    allIsCheck() {
      //首先判断购物车是否有数据，没有数组全选不选 为false
      if(this.$store.state.cartList.length === 0) return false
      //1.filter
      // 首先判断cartList数组里面checked是false的，只要有长度就说明有没选中的，然后长度>0取反
      //就是false 所以全选不会选中,有一点不好是过滤所有的元素
      // return !(this.$store.state.cartList.filter(item => !item.checked).length)
      //2.find 只查找第一个
      //当数组中的元素在测试条件时返回 true 时, find() 返回符合条件的元素，之后的值不会再调用执行函数。
      return !(this.$store.state.cartList.find(item => !item.checked))
      // 3.普通遍历的方法
      //看清楚这个的true在什么地方，是全选返回true 所以在框外面返回true
      // for(let item of this.$store.state.cartList) {
      //   if(!item.checked) {
      //     return false
      //   }
      // }
      // return true
    }
  },
  methods: {
    nativeCick() {
      // console.log('全选点击')
      //判断上面我们写的方法，因为这个方法就返回两个值，true或false
      //当返回ture时 就是全选，全选就把数组里面的全部选中
      if(this.allIsCheck) {
        //记着是第一种情况，全部选中，点击点击点击取反！！这是点击操作
        this.$store.state.cartList.forEach(item => item.checked = false)
      }else {
        //else就是第二种情况，没有全部选中或者某些没选中
        this.$store.state.cartList.forEach(item => item.checked = true)
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  background-color: #eeeeee;
  display: flex;
}
.check {
  display: flex;
  height: 40px;
  align-items: center;

}
.check-button {
  width: 22px;
  height: 22px;
  margin-left: 9px;
}
.check span {
  margin-left: 5px;
  line-height:40px;
  font-size: 14px;
}
.price {
  line-height: 40px;
  margin-left: 12px;
  font-size: 14px;
}
.calculate {
  position: absolute;
  right: 0;
  height: 44px;
  background-color: red;
  width: 32%;
  text-align: center;
  line-height: 44px;
  color: #ffffff;
  font-size: 15px;
}
</style>
