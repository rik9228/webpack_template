const path = require("path");
const isDevelopment = process.env.NODE_ENV !== "production";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const ImageminMozjpeg = require("imagemin-mozjpeg");

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
    assetModuleFilename: "img/[name][ext][query]",
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
        // background-imageバンドル化
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "css/style.css" }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/assets/img"),
          to: path.resolve(__dirname, "dist/assets/img"),
        },
      ],
    }),
    //画像圧縮処理
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      plugins: [
        ImageminMozjpeg({
          quality: 89,
          progressive: true,
        }),
      ],
      pngquant: {
        quality: "80-89",
      },
      gifsicle: {
        interlaced: false,
        optimizationLevel: 10,
        colors: 256,
      },
      svgo: {},
    }),
    // webp生成
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
    new BrowserSyncPlugin({
      host: "localhost",
      port: 3000,
      // proxy: "http://exmaple.local", // Local で使うと時にここをSite Domain に変更する
      server: { baseDir: "dist" },
      files: ["./dist/*.{html,css,js,jpg,png,webp,php}"],
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
