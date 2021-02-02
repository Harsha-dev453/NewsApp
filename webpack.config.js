const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin')


module.exports = ({ mode } = { mode: "production" }) => {
  console.log(`mode is: ${mode}`);

  return {
    mode,
    entry: "./server/client/index.js",
    devServer: {
      hot: true,
      open: true,
      historyApiFallback: true
    },
    devtool: "inline-source-maps",
    stats: {
      errorDetails: true, 
    },
    node: {
      fs: "empty",
      net: "empty",
      tls: "empty",
      request: "empty",
      child_process: "empty",
      dns: "empty",
    },
    output: {
      publicPath: "/",
      path: path.resolve(__dirname, "./server/build"),
      filename: 'build.js'
      },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: ["/node_modules/"],
          loader: "babel-loader",
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader", "less-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ja|it/),
      // new BundleAnalyzerPlugin(),
    ],
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          terserOptions: {
            compress: false,
            ecma: 6,
            mangle: true,
          },
          sourceMap: true,
        }),
      ],
    },
  };
};
