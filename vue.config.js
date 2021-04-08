const {gitDescribe, gitDescribeSync} = require('git-describe');
process.env.VUE_APP_GIT_HASH = gitDescribeSync().hash

module.exports = {
  publicPath: '/GeoChattr/',
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = "GeoChattr";
        return args;
      })
  },
  chainWebpack: config => {
    config.module
      .rule('raw')
      .test(/\.txt$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end()
  }
}
