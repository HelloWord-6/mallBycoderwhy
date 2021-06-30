<template>
<div ref="wrapper">
    <slot></slot>
</div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
name: "Scroll",
  data() {
  return {
    result: null,
  }
  },
  props: {
  //根据父组件传来的probeType 是实时监听还是 不是实时监听
    probeType: {
      type: Number,
      default: 0
    },
    //上拉加载更多
    pullUpLoad: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
  this.result = new BScroll(this.$refs.wrapper,{
    observeDOM: true,
    click: true,
    mouseWheel: true,
    probeType: this.probeType,   //实时监听
    pullUpLoad: this.pullUpLoad,  //加载更多
    keepalive: true
  })

    //如果要滚动到顶部
    //这三个参数分别是（x , y , time）
    // this.result.scrollTo(0,0,300)

    //实时监听滚到到什么位置 根据位置显示home.vue那个箭头组件
    //判断 如果传过来是2 或者是 3才监听
    if(this.probeType === 2 || this.probeType === 3) {
      this.result.on('scroll',(position) => {
        // console.log(position);
        // 把position 子传父传到home.vue 里面，判断高度是否显示箭头
        this.$emit('scroll',position)
      })
    }
    //上拉加载更多
    // 如果是true
    if(this.pullUpLoad) {
      this.result.on('pullingUp',() => {
        // console.log('加载更多')
        this.$emit('pullingUp')
      })
    }
  },
  methods: {
  //我们这直接写个回到顶部的方法，让home.vue 里面$refs 直接调用这个方法就可以了
    backtop(x,y,time) {
      this.result &&this.result.scrollTo(x,y,time) //也可以把time值写死500 也可以（x,y,time）然后调用的时候传值
    },
    //加载更多封装一个函数，让前面用$refs 调用
    finishPullUp() {
      this.result.finishPullUp()
    },
    gorefresh() {
      //如果想更严谨一点就按照下面这样写
      this.result && this.result.refresh()
      console.log('调用了Scroll的防抖')
      // this.result.refresh()
    },
    getStateY() {
      //判断有没有滑动 有就穿滑动的y值 没有就传0
      return this.result ? this.result.y : 0
    }
  }
}
</script>

<style scoped>
</style>
