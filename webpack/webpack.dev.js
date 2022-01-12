let target = 'web'
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
   mode: 'development',
   target: target,
   devtool: 'cheap-module-source-map',
   devServer: {
      host: '0.0.0.0',
      port: 3000,
      hot: true,
      historyApiFallback: {
         disableDotRule: true,
      },
   },
   plugins: [new BundleAnalyzerPlugin()],
}
