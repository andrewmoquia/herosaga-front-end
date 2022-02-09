const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const { InjectManifest } = require('workbox-webpack-plugin')

let target = 'browserslist'

module.exports = {
   mode: 'production',
   target: target,
   module: {
      rules: [
         {
            test: /\.(s[ac]ss|css)$/i,
            use: [
               MiniCssExtractPlugin.loader,
               {
                  loader: 'css-loader',
                  options: {
                     modules: true,
                     sourceMap: false,
                  },
               },
               {
                  loader: 'postcss-loader',
                  options: {
                     postcssOptions: {
                        plugins: [['postcss-preset-env', 'autoprefixer']],
                     },
                  },
               },
               'sass-loader',
            ],
         },
      ],
   },
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
                  drop_console: true,
                  defaults: true,
                  arguments: true,
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
   output: {
      filename: '[contenthash].js', //Hash bundle name
   },
   plugins: [
      // new InjectManifest({
      //    swSrc: './sw.js',
      //    swDest: 'sw.js',
      // }),
      new webpack.DefinePlugin({
         'process.env.URL': JSON.stringify(process.env.URL),
         'process.env.AUTH': JSON.stringify(process.env.AUTH),
         'process.env.LOGOUT': JSON.stringify(process.env.LOGOUT),
         'process.env.CHANGE_PASSWORD': JSON.stringify(process.env.CHANGE_PASSWORD),
         'process.env.CANCEL_SELL': JSON.stringify(process.env.CANCEL_SELL),
         'process.env.BUY_NFT': JSON.stringify(process.env.BUY_NFT),
         'process.env.SELL_NFT': JSON.stringify(process.env.SELL_NFT),
         'process.env.GET_TRANSACS': JSON.stringify(process.env.GET_TRANSACS),
         'process.env.MINT_BOX': JSON.stringify(process.env.MINT_BOX),
         'process.env.GET_ALL_NFT': JSON.stringify(process.env.GET_ALL_NFT),
         'process.env.GET_MP_NFT': JSON.stringify(process.env.GET_MP_NFT),
         'process.env.VERIF_EMAIL': JSON.stringify(process.env.VERIF_EMAIL),
         'process.env.REG_USER': JSON.stringify(process.env.REG_USER),
         'process.env.LOGIN_USER': JSON.stringify(process.env.LOGIN_USER),
         'process.env.GET_TOKEN': JSON.stringify(process.env.GET_TOKEN),
         'process.env.FORGET_PW': JSON.stringify(process.env.FORGET_PW),
         'process.env.RESET_PW': JSON.stringify(process.env.RESET_PW),
      }),
   ],
}
