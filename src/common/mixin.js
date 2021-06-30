import {debounce} from "common/utils";
export const itemListenerMixin = {
  data() {
    return{
      itemImgListener: null
    }
  },
  mounted() {
    //监听图片列表滑动加载完成
    //调用防抖函数
    let refresh = debounce(this.$refs.content && this.$refs.content.gorefresh,50)
    //对首页监听事件进行保存
    this.itemImgListener = () => {
      console.log('这是混入里面的mounted！！')
      //根据$refs 调用scroll组件里面的refresh事件
      //加this.$refs.content 更严谨
      // this.$refs.content && this.$refs.content.gorefresh()
      refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  }
}
//回到顶部图片
export const backTopMixin = {
  data() {
    return {
      //默认BackTop箭头不显示
      isShowBackTop: false,
    }
  },
  methods: {
    ScrolltoTop() {
      //这是获取Scrool组件里面的result直接scrollTo
      // this.$refs.content.result.scrollTo(0,0,500);
      //下面这个是 在Scroll组件里面写个方法 调用这个方法
      this.$refs.content.backtop(0,0,500)
    },
  }
}
