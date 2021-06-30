<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" @load="imgLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper/index'
export default {
  name: "HomeSwiper",
  //把父组件里面的banner传过来
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      //只让imgLoad加载一次
      once: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imgLoad() {
      if(!this.once) {
        // console.log('轮播加载完了');
        this.$emit('imgScrollLoad')
        this.once = true
      }
    }
  }
}
</script>

<style scoped>

</style>
