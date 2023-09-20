const path = require("path");
const mergeJSON = require("handlebars-webpack-plugin/utils/mergeJSON");
const HandlebarsPlugin = require("handlebars-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const glob = require("fast-glob");

const projectData = mergeJSON(path.join(__dirname, "./src/data/**/*.json"));

const getFileName = (path) => glob.sync(path);
const controllers = getFileName("./src/assets/js/*.js").reduce(
  (acc, currentPath) => {
    const fileName = currentPath.split("/").pop().replace(".js", "");
    acc[fileName] = currentPath;

    return acc;
  },
  {}
);

module.exports = {
  mode: "development",
  entry: { ...controllers },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: `assets/js/[name].js`,
    chunkFilename: `assets/js/[name].js`,
    publicPath: "/",
  },
  devServer: {
    static: path.join(__dirname, "dist"),
    open: ["/"],
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "handlebars-loader",
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      }
    ],
  },
  plugins: [
    new CopyPlugin({
        patterns: [
          {
            from: "./src/assets/fonts",
            to: "./assets/fonts",
            noErrorOnMissing: true,
          },
          {
            from: "./src/assets/images",
            to: "./assets/images",
            noErrorOnMissing: true,
          },
        ],
      }),
    new HandlebarsPlugin({
      entry: path.join(process.cwd(), "src", "html", "**", "*.html"),
      output: path.join(process.cwd(), "dist", "[path]", "[name].html"),
      data: projectData,
      partials: [
        path.join(process.cwd(), "src", "partials", "**", "*.{html,svg}"),
      ],
    }),
    new MiniCssExtractPlugin({
        filename: "assets/css/[name].css",
        chunkFilename: "[id].css",
    }),
  ],
};
