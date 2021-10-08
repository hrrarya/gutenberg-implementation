const path = require("path");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env, argv) => {
  const isDev = () => {
    return argv.mode === "devlopment";
  };

  const config = {
    entry: {
      editor: "./src/editor.js",
      script: "./src/script.js",
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].js",
    },
    resolve: {
      alias: {
        components: path.resolve(__dirname, "src/base/DHComponents"),
      },
      extensions: [".js", ".jsx"],
    },
    optimization: {
      minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [path.join(__dirname, "dist/**/*")],
      }),
      new MiniCssExtractPlugin({
        filename: (chunkData) => {
          return chunkData.chunk.name === "script" ? "style.css" : "[name].css";
        },
      }),
    ],
    devtool: isDev() ? "eval-cheap-module-source-map" : "source-map",
    module: {
      rules: [
        {
          test: /\.js$|jsx/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              plugins: [
                "@babel/plugin-proposal-class-properties",
                [
                  "babel-plugin-styled-components",
                  {
                    fileName: false,
                  },
                ],
              ],
              presets: [
                "@babel/preset-env",
                [
                  "@babel/preset-react",
                  {
                    pragma: "wp.element.createElement",
                    pragmaFrag: "wp.element.Fragment",
                    development: isDev(),
                  },
                ],
              ],
            },
          },
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            // "style-loader",
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [autoprefixer()],
                },
              },
            },
            "sass-loader",
          ],
        },
      ],
    },
    externals: {
      jquery: "jQuery",
      lodash: "lodash",
      react: "React",
      "react-dom": "ReactDOM",
      "@wordpress/blocks": ["wp", "blocks"],
      "@wordpress/i18n": ["wp", "i18n"],
      "@wordpress/editor": ["wp", "editor"],
      "@wordpress/components": ["wp", "components"],
      "@wordpress/element": ["wp", "element"],
      "@wordpress/blob": ["wp", "blob"],
      "@wordpress/data": ["wp", "data"],
      "@wordpress/html-entities": ["wp", "htmlEntities"],
      "@wordpress/edit-post": ["wp", "editPost"],
    },
  };

  return config;
};
