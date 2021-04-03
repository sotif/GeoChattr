module.exports = {
  publicPath: '/GeoChattr/',
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = "GeoChattr";
        return args;
      })
  }
}
