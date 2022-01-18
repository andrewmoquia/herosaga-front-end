let target = 'web'
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
   module: {
      rules: [
         {
            test: /\.(s[ac]ss|css)$/i,
            use: [
               MiniCssExtractPlugin.loader,
               {
                  loader: 'css-loader',
                  options: {
                     // esModule: false,
                     // modules: true,
                     sourceMap: true,
                     modules: {
                        localIdentName: '[local]',
                     },
                  },
               },
               'postcss-loader',
               'sass-loader',
            ],
         },
      ],
   },
   //Fixed ChunkLoadError: Loading hot update chunk app failed.
   optimization: { runtimeChunk: 'single' },
   output: {
      filename: '[name].js', //Hash bundle name
   },
   plugins: [new BundleAnalyzerPlugin()],
}
