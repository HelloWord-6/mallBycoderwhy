<template>
<div id="Detail-div">
  <detail-nav-bar class="detailnav"
                  @navBarClick="navBarClick" ref="nav"></detail-nav-bar>
  <scroll class="scroll"
          ref="content"
          :probeType="3"
          @scroll="scrollContent">
      <div>
        <detail-swiper :top-images-list="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detail-info="detailInfo"
                           @infoImgClick="infoImgClick"></detail-goods-info>
        <detail-param-info ref="params" :paramInfo="paramInfo"></detail-param-info>
        <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
        <goods-list ref="recommend" :goods="recommends"></goods-list>
      </div>
  </scroll>
  <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
  <!--  返回顶部-->
  <back-top class="back-top" @click.native="ScrolltoTop" v-show="isShowBackTop" />
</div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar"; //详情页标题
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
import DetailSwiper from "./childComps/DetailSwiper";  //导入详情页轮播
import DetailBaseInfo from "./childComps/DetailBaseInfo"; //详情页商品信息
import DetailShopInfo from "./childComps/DetailShopInfo";  //详情页商家信息
import Scroll from "components/common/scroll/Scroll";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";//商品详细信息
import DetailParamInfo from "./childComps/DetailParamInfo"; //商品参数信息
import DetailCommentInfo from "./childComps/DetailCommentInfo"; //商品评论
import GoodsList from "components/content/goods/GoodsList"; //商品推荐列表
import DetailBottomBar from "./childComps/DetailBottomBar";  //底部bar
import {itemListenerMixin,backTopMixin} from 'common/mixin'
import {debounce} from "common/utils"; //防抖函数
import BackTop from "components/content/backTop/BackTop";    //回到顶部图片
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop
  },
  mixins: [itemListenerMixin,backTopMixin],
  data() {
    return {
      id: null,
      topImages: [],
      goods: {},  //轮播下的数据
      shop: {},  //店铺信息
      detailInfo: {},  //商品详情一大串图片
      paramInfo: {}, //参数 尺码信息
      commentInfo: {},  //用户评价
      recommends: [],
      themeTopYs: [], //存储各个settopoff
      getThemeTopYs: null,  //放滚动位置的防抖函数
      current: 0  //存放 滚动i的值
    }
  },
  created() {
    // console.log(this.$route.params)
    // 1.保存传入的iid
    this.id = this.$route.params.iid
    //根据iid请求详细数据
    getDetail(this.id).then(res => {
      // console.log(res)
      //2.获取顶部轮播图片数据
      const data = res.result
      this.topImages = data.itemInfo.topImages
      //3.获取商品杂乱的信息杂乱的数据  因为是类 所以要new 一下
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      //4.获取商家一堆信息，也放到了类里面
      this.shop = new Shop(data.shopInfo)
      //5.获取商品的详细信息 一堆图片啥的  传给DetailGoodstInfo组件
      this.detailInfo = data.detailInfo
      //6.获取商品参数 尺码信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
      //7.获取用户评价信息
      //判断有没有评论信息 有的话取出来一条
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
      //$nextTick 是数据已经被渲染出来了
      //但是图片依然没有加载完成（目前获取到的offsettop不包含其中图片）
      //offsettop不对 都是因为图片原因
      // this.$nextTick(() => {
      //
      // })
      //给getThemeTopYs 赋值， 并且对值进行防抖
      this.getThemeTopYs = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        console.log(this.themeTopYs)
      },100)

    })
    //推荐的滚动列表数据
    getRecommend().then(res => {
      console.log(res)
      this.recommends = res.data.list
    })
  },
  methods: {
    infoImgClick() {
      //刷新
      //调用Scroll里面的gorefresh方法 给scroll 组件一个ref
      this.$refs.content.gorefresh()
      //图片展示完调用getThemeTopYs 函数
      this.getThemeTopYs()
    },
    navBarClick(index) {
      console.log(index)
      //根据索引是哪个 滚动到各自的位置
      this.$refs.content.backtop(0,-this.themeTopYs[index],100)
    },
    scrollContent(position) {
      // console.log(position)
      const positionY = -position.y
      // console.log(positionY)
      //positionY 与themeTopYs里面的值进行对比
      //例如 [0,7938,9120,9452]
      //positionY在0和7938之间 index=0
      //positionY在7938和9120之间  index=1
      //positionY在9120和9452之间  index=2
      //positionY在9120以上        index=3
      //1.下面这种是不正确的，最后取不到值，所以要把上面的四种情况分开，前三种是一种，最后一个是一种
      // for(let i = 0;i < this.themeTopYs.length; i++) {
      //   if(positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) {
      //     console.log(i)
      //   }
      // }
      //2.下面是分开的
      let length = this.themeTopYs.length
      for (let i = 0;i < length; i++) {
        if (this.current !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
          // console.log(i)
          this.current = i
          this.$refs.nav.currentIndex = this.current
        }
      }
      // 3.判断backtop是否显示
      // console.log(position);
      //这时候已经接收过来了，给BackTop组件一个v-show值 判断显示与否
      //如果y 的值大于1000 就显示，因为在consolo.log输出时候y的值是负值，
      // 所以要在前面加一个负号 改成正值
      // console.log((-position.y) > 1000)
      this.isShowBackTop = (-position.y) > 1000
    },
    //加入购物车
    addToCart() {
      console.log('Detail加入购物车');
      const product = {}
      product.iid = this.id;
      product.imgURL = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc;
      product.newPrice = this.goods.nowPrice;
      console.log(product)
      // this.$store.commit('addCar',product)
      this.$store.dispatch('addCar',product)
    }
  },
  //因为这个没有一直保持活跃，所以要在destroyed 销毁里面停止监听，离开此页面就销毁了也就停止监听了
  destroyed() {
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  }
}
</script>

<style scoped>
#Detail-div {
  height: 100vh;
}
.detailnav {
  position: relative;
  background-color: #ffffff;
  z-index: 30;
}
.scroll {
  position: relative;
  height: calc(100% - 44px - 51px);
  overflow: hidden;
}
</style>
