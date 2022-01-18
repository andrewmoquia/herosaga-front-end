const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const webpack = require('webpack')

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
                  toplevel: true,
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
   plugins: [
      new webpack.DefinePlugin({
         'process.env.GOOGLE_AUTH_API': JSON.stringify(process.env.GOOGLE_AUTH_API),
         'process.env.TWITTER_AUTH_API': JSON.stringify(process.env.TWITTER_AUTH_API),
         'process.env.LOGOUT_API': JSON.stringify(process.env.LOGOUT_API),
         'process.env.LOGIN_API': JSON.stringify(process.env.LOGIN_API),
         'process.env.AUTH_API': JSON.stringify(process.env.AUTH_API),
      }),
   ],
}
