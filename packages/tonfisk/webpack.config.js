const path = require("path");
const { VanillaExtractPlugin } = require("@vanilla-extract/webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: path.join(__dirname, "./index.ts"),
  output: {
    path: path.join(__dirname, "dist"),
    library: "componentLibrary",
    globalObject: "this",
    // Found here as required part of externals below
    // https://github.com/webpack/webpack/issues/1275
    libraryTarget: "umd",
  },
  resolve: {
    extensions: [".js", ".json", ".ts", ".tsx"],
  },
  mode: "production",
  devtool: "source-map",
  // https://github.com/webpack/webpack/issues/1275
  externals: {
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react",
    },
    "react-dom": {
      root: "ReactDOM",
      commonjs2: "react-dom",
      commonjs: "react-dom",
      amd: "react-dom",
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: "babel-loader",
            options: {
              babelrc: false,
              presets: [
                "@babel/preset-typescript",
                ["@babel/preset-react", { runtime: "automatic" }],
                [
                  "@babel/preset-env",
                  { targets: { node: 14 }, modules: false },
                ],
              ],
              plugins: ["@vanilla-extract/babel-plugin"],
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin(), new VanillaExtractPlugin()],
};
