const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
   entry: path.resolve(__dirname, '..', './src/index.tsx'),
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
            test: /\.s[ac]ss$/i,
            use: [
               // {
               //   loader: MiniCssExtractPlugin.loader,
               //   options: { publicPath: "" },
               // },
               'style-loader',
               'css-loader',
               'postcss-loader',
               'sass-loader',
            ],
         },
         {
            test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
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
      assetModuleFilename: 'images/[hash][ext][quesry]',
      filename: 'bundle.js',
      publicPath: '/',
   },
   plugins: [
      new NodePolyfillPlugin(),
      new CleanWebpackPlugin(),
      // new MiniCssExtractPlugin(),
      new HTMLWebpackPlugin({
         template: path.resolve(__dirname, '..', './src/index.html'),
      }),
   ],
}
