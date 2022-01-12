const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
   // entry: path.resolve(__dirname, '..', './src/index.tsx'),
   entry: {
      //Code split
      // css: { import: './scss/main.css', dependOn: 'shared' }, //Separate css to index.js
      index: { import: './src/index.tsx', dependOn: 'shared' },
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
            test: /\.(s[ac]ss|css)$/i,
            use: [
               // {
               //    loader: MiniCssExtractPlugin.loader,
               //    // This is required for asset imports in CSS, such as url()
               //    options: { esModule: false },
               // },
               MiniCssExtractPlugin.loader,
               // 'style-loader',
               {
                  loader: 'css-loader',
                  options: {
                     // esModule: false,
                     // modules: true,
                     modules: {
                        localIdentName: '[local]_[hash:base64:5]',
                     },
                  },
               },
               // 'css-loader',
               'postcss-loader',
               // according to the docs, sass-loader should be at the bottom, which
               // loads it first to avoid prefixes in your sourcemaps and other issues.
               'sass-loader',
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
   output: {
      path: path.resolve(__dirname, '..', './build'),
      assetModuleFilename: 'images/[hash][ext][quesry]', //Hash images name
      filename: '[name].js', //Hash bundle name
      publicPath: '/',
   },
   optimization: {
      splitChunks: {
         chunks: 'all',
      },
   },
   plugins: [
      new NodePolyfillPlugin(),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new HTMLWebpackPlugin({
         favicon: './favicon/231asaa3ff433112d.png',
         template: path.resolve(__dirname, '..', './src/index.html'),
      }),
   ],
}
