const path = require("path");
const isDevelopment = process.env.NODE_ENV !== "production";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: isDevelopment ? "development" : "production",
  devtool: isDevelopment ? "inline-source-map" : false,
  entry: {
    main: path.resolve(__dirname, "./src/assets/ts/main.ts"),
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, "dist/assets"),
    filename: "js/[name].js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        exclude: /node_modules/,
        generator: {
          filename: `./image/[name].[contenthash][ext]`,
        },
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "css/style.css" }),
    new BrowserSyncPlugin({
      host: "localhost",
      port: 3000,
      // proxy: "http://exmaple.local", // Local で使うと時にここをSite Domain に変更する
      server: { baseDir: "dist" },
      files: ["./dist/*.{html,css,js,jpg,png,webp,php}"],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/assets", "img"),
          to: path.resolve(__dirname, "dist/assets", "img"),
        },
      ],
    }),
    new ImageminWebpWebpackPlugin({
      config: [
        {
          test: /\.(png|jpe?g)$/i,
          options: {
            quality: 75,
          },
        },
      ],
    }),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      "@": path.resolve(__dirname, "./src/assets"),
    },
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  target: ["web", "es5"],
};
