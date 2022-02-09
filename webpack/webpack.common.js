const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
   entry: {
      //Code split
      index: { import: './src/index.tsx' },
      shared: 'lodash',
   },
   resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
   },
   module: {
      rules: [
         {
            test: /\.(ts|js)x?$/,
            exclude: /node_modules/,
            use: [
               {
                  loader: 'babel-loader',
               },
            ],
         },
         {
            test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
            loader: 'file-loader',
            options: {
               name: 'images/[name].[ext]',
            },
            type: 'asset',
         },
         {
            test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
            type: 'asset/inline',
         },
      ],
   },
   optimization: {
      splitChunks: {
         cacheGroups: {
            react: { test: /[\\/]node_modules[\\/]((react).*)[\\/]/, name: 'react', chunks: 'all' },
         },
         chunks: 'all',
      },
   },
   output: {
      path: path.resolve(__dirname, '..', './build'),
      assetModuleFilename: 'images/[hash][ext][quesry]', //Hash images name
      publicPath: '/',
   },
   plugins: [
      new CopyPlugin({
         patterns: [
            { from: './images', to: 'images' },
            { from: './manifest.json', to: '' },
            { from: './robots.txt', to: '' },
         ],
      }),
      new Dotenv({
         safe: true,
         allowEmptyValues: false,
         silent: true,
         defaults: false,
      }),
      new NodePolyfillPlugin(),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new HTMLWebpackPlugin({
         favicon: './favicon/2194asd14ggr1241a.png',
         template: path.resolve(__dirname, '..', './src/index.html'),
      }),
   ],
}
