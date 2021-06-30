module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'views': '@/views',
        'components': '@/components',
        'network': '@/network',
        'common': '@/common',
        'assets': '@/assets',
      }
    }
  },
  // devServer: {
  //   port: 8080, // 设置端口号
  //   host: '192.168.1.3', // ip
  //   disableHostCheck: true, //是否关闭用于 DNS 重绑定的 HTTP 请求的 HOST 检查
  //   hotOnly: false, // 热更新
  //   https: false, // https:{type:Boolean}配置前缀
  //   open: false, //配置自动启动浏览器
  //   proxy: null,  //设置代理
  // }
}
