// Home 组件里面的数据请求
import {request} from "./request";

//下面为什么不直接return request呢？
//如果首页有多个请求，就会统一管理，如果要改某一个url 就在这里改就可以 降低home组件页面耦合
export function getHomeMultidata() {
  return request({
    url: 'home/multidata'
  })
}

// 首页的选项卡下面的数据
export function getHomeGoods(type, page) {
  return request({
    url: 'home/data',
    params: {
      type,
      page
    }
  })
}
