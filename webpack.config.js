const path = require("path");
const isDevelopment = process.env.NODE_ENV !== "production";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

module.exports = {
  mode: isDevelopment ? "development" : "production",
  devtool: isDevelopment ? "inline-source-map" : false,
  entry: {
    main: path.resolve(__dirname, "./src/assets/ts/main.ts"),
  },
  output: {
    path: path.resolve(__dirname, "dist/assets"),
    filename: "js/[name].js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, { loader: "css-loader", options: { url: false } }, "sass-loader"],
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
      files: ["./dist"],
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
