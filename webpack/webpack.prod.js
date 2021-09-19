const TerserPlugin = require("terser-webpack-plugin");
let target = "browserslist";

module.exports = {
  mode: "production",
  target: target,
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          // Eliminate comments
          compress: {
            pure_funcs: [
              "console.log",
              // 'console.error',
              // 'console.warn',
              // ...
            ],
          },
          // Make sure symbols under `pure_funcs`,
          // are also under `mangle.reserved` to avoid mangling.
          mangle: {
            reserved: [
              "console.log",
              // 'console.error',
              // 'console.warn',
              // ...
            ],
          },
        },
      }),
    ],
  },
};
