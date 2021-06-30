<!--商品详细信息 一堆图片-->
<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start">
      </div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img v-for="(item, index) in detailInfo.detailImage[0].list"
           :src="item" alt="" @load="infoImgClick">
    </div>
  </div>
</template>

<script>
	export default {
		name: "DetailGoodsInfo",
    data() {
		  return {
        counters: 0,
        imagesLength: 0
      }
    },
    props: {
      detailInfo: {
        type: Object
      }
    },
    methods: {
      infoImgClick() {
        // console.log('图片加载');
        //判断所有图片都加载完了，再一次性emit传过去 if里面就是判断方法
        //相当于this.counters += 1 这里就让先加
        if(++this.counters === this.imagesLength) {
          this.$emit('infoImgClick')
          // console.log(this.imagesLength)
        }
      }
    },
    watch: {
		  //Watch是一个对象，用来监听一个值(数组、对象、数字...)的变化，并调用因为变化而需要执行的方法
      //这里监听detailInfo 有变化后 获取图片个数
      detailInfo() {
        this.imagesLength = this.detailInfo.detailImage[0].list.length
      }
    }
	}
</script>

<style scoped>
  .goods-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-desc {
    padding: 0 15px;
  }

  .info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }

  .info-desc .start {
    float: left;
  }

  .info-desc .end {
    float: right;
  }

  .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }

  .info-desc .end::after {
    right: 0;
  }

  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }

  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }

  .info-list img {
    width: 100%;
  }
</style>
