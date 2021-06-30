import axios from "axios";
//这里export 一个带名字的函数，并不是default 因为可能有好几个实例
export function request(config) {
  //1. 创建axios 实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })
  //2.axios 拦截器
    //1> 拦截请求   interceptors  殷特~赛破特思
  instance.interceptors.request.use(config => {
      //请求拦截的作用
      //可以拦截到config 多配置一些信息，或者对信息进行一些转化
      //比如我们每次发送请求时，都希望在界面显示一个请求的图标
      //比如 某些网络请求（比如登录 token） 必须携带一些特殊的信息
      // console.log(config);  //在这里拦截了一下config，就必须返回回去，不然是会报错的
      return config
    },error => {
      // console.log(error)
    })

    //2>拦截响应  这里拿到的是响应后的结果
  instance.interceptors.response.use(res => {
      //这里拦截掉了 就赶紧返回回去 返回data就可以
      // console.log(res);
      return res.data
    },err => {
      // console.log(err);
    })
  //调用request传进来的config，是前面打的main.js request({config})
  // 2.发送真正的网络请求
  return instance(config)
}


