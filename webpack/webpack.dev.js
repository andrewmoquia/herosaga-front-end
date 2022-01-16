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
   //Fixed ChunkLoadError: Loading hot update chunk app failed.
   optimization: { runtimeChunk: 'single' },
   plugins: [new BundleAnalyzerPlugin()],
}
