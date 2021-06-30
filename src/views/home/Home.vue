<template>
<div id="home">
  <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
  <tab-control class="tab"
               :titles="['流行','新款','精选']"
               @tabClick="tabClick"
               ref="TabControl1" v-show="isFixed"/>
  <scroll class="content"
    ref="content"
    :probeType="3"
    @scroll="contentClick"
    :pull-up-load="true"
    @pullingUp="scrollMore">
   <div>
     <home-swiper :banners="banners" @imgScrollLoad="imgScrollLoad"></home-swiper>
     <recommend-view :recommends="recommends"></recommend-view>
     <feature-view></feature-view>
     <!--  tab-control是粘性布局-->
     <!--  tabClick 事件 是 传递过来的index-->
     <tab-control :titles="['流行','新款','精选']"
                  @tabClick="tabClick"
                  ref="TabControl2"></tab-control>
     <!--  给一个默认的goodsType 默认就是pop-->
     <goods-list :goods="this.goods[goodsType].list"></goods-list>
   </div>
  </scroll>
<!--  返回顶部-->
  <back-top class="back-top" @click.native="ScrolltoTop" v-show="isShowBackTop" />
</div>
</template>

<script>
//公共组件
import NavBar from "components/common/navbar/NavBar"; //导入navbar
import TabControl from "components/content/tabControl/TabControl";

//子组件
import HomeSwiper from "./childComps/HomeSwiper";  //导入轮播
import RecommendView from "./childComps/RecommendView"; //导入轮播下面第一个 是自己写的
import FeatureView from "./childComps/FeatureView";  //导入轮播下面第二个 是一张图片
import GoodsList from "components/content/goods/GoodsList"; //商品列表
import Scroll from "components/common/scroll/Scroll";   //导入封装的better-scroll
import BackTop from "components/content/backTop/BackTop";    //回到顶部图片
import {itemListenerMixin} from 'common/mixin'

import {getHomeMultidata,getHomeGoods} from 'network/home'
export default {
  name: "Home",
  mixins: [itemListenerMixin],
  data() {
    return {
      //把网络请求的数据存在data里面
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0 , list: []},
        'new': {page: 0 , list: []},
        'sell': {page: 0 , list: []}
      },
      goodsType: 'pop',
      //默认BackTop箭头不显示
      isShowBackTop: false,
      //默认tabcontrol 到上面距离是0
      tabOffTabHeight: 0,
      // 是否显示默认tabcontrol 的fixed
      isFixed: false,
      stateY: 0,
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  created() {
    //请求多个数据
    this.getHomeMultidata()
    //请求选项卡里面的数据
    this.getHomeGoods('new')
    this.getHomeGoods('pop')
    this.getHomeGoods('sell')
  },
  //销毁
  destroyed() {
    console.log('home 销毁了');
    //在main.js 写上了keep-alive 就不会销毁了
  },
  //活跃
  activated() {
    console.log('home现在是活跃');
    this.$refs.content.gorefresh()
    this.$refs.content.backtop(0,this.stateY,10)
  },
  //不活跃
  deactivated() {
    console.log('home 不活跃');
    //1.保存y值
    this.stateY = this.$refs.content.getStateY()
    //2.取消全局事件的监听
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  methods: {
    /**
     *下面是事件监听的方法 传递来的数据
     */
    tabClick(index) {
      // console.log(index)
      // 根据tab 切换不同的index，展示不同的数据
      switch (index)
      {
        case 0:
          this.goodsType = 'pop'
          break
        case 1:
          this.goodsType = 'new'
          break
        case 2:
          this.goodsType = 'sell'
          break
      }
      this.$refs.TabControl1.currentIndex = index
      this.$refs.TabControl2.currentIndex = index
    },
    ScrolltoTop() {
      //这是获取Scrool组件里面的result直接scrollTo
      // this.$refs.content.result.scrollTo(0,0,500);
      //下面这个是 在Scroll组件里面写个方法 调用这个方法
      this.$refs.content.backtop(0,0,500)
    },
    contentClick(position) {
      //1.判断backtop是否显示
      // console.log(position);
      //这时候已经接收过来了，给BackTop组件一个v-show值 判断显示与否
      //如果y 的值大于1000 就显示，因为在consolo.log输出时候y的值是负值，
      // 所以要在前面加一个负号 改成正值
      // console.log((-position.y) > 1000)
      this.isShowBackTop = (-position.y) > 1000
      //2.判断tabcontorl是否吸顶
      this.isFixed = (-position.y) > this.tabOffTabHeight
    },
    scrollMore() {
      // console.log('加载更多')
      //这加载更多就调用 我们下面封装的方法
      // 这里只能加载一次，要加载多次就要在getHomeGoods 方法里面写
      this.getHomeGoods(this.goodsType)
    },
    //监听轮播图片是否加载完了
    imgScrollLoad() {
      console.log('监听轮播加载完了');
      // console.log(this.$refs.TabControl2.$el.offsetTop)
      this.tabOffTabHeight = this.$refs.TabControl2.$el.offsetTop
    },

    /**
     * 下面是网络请求的数据
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res)
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    //请求选项卡里面的数据
    getHomeGoods(type) {
      //拿到的是 data里面的page + 1 就是1
      const page = this.goods[type].page + 1
      // console.log(page)
      // 别弄混 这里调用的是home.js 里面定义的,这里传进去page是1
      //调用network 的网络请求
      getHomeGoods(type,page).then(res => {
        // console.log(this)
        this.goods[type].list.push(...res.data.list);
        //这里是调用一次这个 我们这个函数中点的page+1
        this.goods[type].page += 1
        //加载多次
        this.$refs.content.result.finishPullUp()
       })
    }
  }
}
// 将一个数组传到另个数组里面
// const aaa = [100]
// const bbb = [10,20,30,40]
// //1. for 循环
// // for(let a of bbb) {
// //   aaa.push(a)
// // }
// // 如果不用遍历
// aaa.push(...bbb)
// console.log(aaa)
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  height: 100vh;
}
.home-nav {
  position: fixed;
  background-color: var(--color-tint);
  color: white;
  font-weight: 700;
  top: 0px;
  left: 0px;
  right: 0px;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
.tab {
  position: relative;
  top: 44px;
  z-index: 20;
}
.back-top {
  position: fixed;
  right: 10px;
  bottom: 60px;
}
</style>
