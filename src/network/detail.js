//详情页面的数据请求
import {request} from "./request";
export function getDetail(iid) {
  return request ({
    url: '/detail',
    params: {
      iid
    }
  })
}
//推荐列表的接口数据
export function getRecommend() {
  return request({
    url: '/recommend'
  })
}
//商品信息 都添加到一个类里面
export class Goods {
  //构造函数 分别是从itemInfo, columns, services 这仨个里面取得东西
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.nowPrice = itemInfo.highNowPrice;
  }
}

//商家信息 也都添加到一个类里面
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}
//商品参数信息 大小号码
export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}
