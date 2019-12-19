const webpack = require('webpack');
const path = require('path');
function resolve(dir){
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  assetsDir: 'static',
  productionSourceMap: false,
  lintOnSave: false,
  css: {
    loaderOptions: {
      css: {
      // options here will be passed to css-loader
      },
      postcss: {
        // options here will be passed to postcss-loader
        plugins: [
          // require('postcss-px2rem')({
          //   remUnit: 75
          // })
          // require('postcss-px-to-viewport')({
          //   viewportWidth: 750,
          //   minPixelValue: 1
          // })
        ]
      }
    }
  },
  chainWebpack: (config)=>{
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@img',resolve('src/assets/img'))
      .set('@styl',resolve('src/assets/styl'))
      .set('@js',resolve('src/assets/js'))
      .set('@lib',resolve('src/assets/js/lib'))
      .set('@cp',resolve('src/components'))
      .set('@views',resolve('src/views'))
      .end()
    config.module
      .rule('images')
        .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
        .use('url-loader')
          .loader('url-loader')
          .options({
            limit: 10000,
            fallback: {
              loader: 'file-loader',
              options: {
                name: 'static/img/[name].[hash:8].[ext]'
              }
            }
          })
        .end()
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'production') return;
    return {
      plugins: [
        new webpack.BannerPlugin(' The roject developed by chengpeiquan! ')
      ]
    };
  }
}
