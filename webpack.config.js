const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// const VENDOR_LIBS = [];

module.exports = {
  mode: "development",
  entry: {
    bundle: path.resolve(__dirname, "src", "index.js"),
    // vendor: VENDOR_LIBS,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: ["@babel/plugin-transform-runtime"],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.gif$/,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "styles/styles.css",
    }),
    new CleanWebpackPlugin(),
  ],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "js/[name].js",
  },
  devServer: {
    port: 9000,
    open: true,
    historyApiFallback: true,
    contentBase: "./build",
  },
  devtool: "source-map",
};
