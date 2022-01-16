const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

let target = 'browserslist'

module.exports = {
   mode: 'production',
   target: target,
   optimization: {
      minimize: true,
      minimizer: [
         new CssMinimizerPlugin({
            parallel: true,
            minimizerOptions: [
               {
                  preset: ['default'],
               },
            ],
            minify: [CssMinimizerPlugin.cssnanoMinify],
         }),
         new TerserPlugin({
            parallel: true,
            extractComments: 'all',
            terserOptions: {
               compress: {
                  defaults: true,
                  arguments: true,
                  drop_console: true,
               },
               sourceMap: false,
               // ecma: 5,
               // format: {
               //    ecma: 5,
               // },
            },
         }),
      ],
   },
}
