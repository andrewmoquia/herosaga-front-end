let target = "web";

module.exports = {
  mode: "development",
  target: target,
  devtool: "cheap-module-source-map",
  devServer: {
    host: "0.0.0.0",
    port: 3000,
    hot: true,
  },
};
