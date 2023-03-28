const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isDev = argv.mode !== "production";

  console.log(`IsDev = ${isDev}\n`);
  return {
    mode: isDev ? "development" : "production",
    devtool: isDev ? "eval-source-map" : false,

    // Первая сборка, после включения опции, затратная по времени.
    // После сохранения конфига webpack происходит пересборка.
    // Собираются только измененные файлы
    cache: {
      type: "filesystem",
    },

    entry: {
      bundle: path.resolve(__dirname, "src/js/dashboard/index.js"),
    },

    output: {
      filename: isDev ? "[name].js" : "[name].min.js",
      path: path.resolve(__dirname, "../assets/js/dashboard/dist"),
      clean: true,
      pathinfo: false,
    },

    resolve: {
      alias: {
        "@root": path.resolve(__dirname, ""),
        "@src": path.resolve(__dirname, "src/"),
        "@js": path.resolve(__dirname, "src/js/"),
        "@css": path.resolve(__dirname, "src/css/"),
        "@dashboard": path.resolve(__dirname, "src/js/dashboard/"),
      },

      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: [".ts", ".tsx", ".js", ".jsx"],

      // Add support for TypeScripts fully qualified ESM imports.
      extensionAlias: {
        ".js": [".js", ".ts", ".jsx"],
        ".cjs": [".cjs", ".cts"],
        ".mjs": [".mjs", ".mts"],
      },
    },

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
          generator: {
            outputPath: "imgs",
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
          generator: {
            outputPath: "fonts",
          },
        },
        {
          test: /\.([cm]?ts|tsx)$/,
          // include: path.resolve(__dirname, 'src'),
          exclude: /(node_modules|bower_components)/,
          use: [
            {
              loader: "ts-loader",
              options: {
                transpileOnly: true,
              },
            },
          ],
        },
        {
          test: /\.(js|jsx)$/,
          // include: path.resolve(__dirname, 'src'),
          // exclude: /(node_modules|bower_components)/,
          generator: {
            // outputPath: 'js'
          },
          use: {
            loader: "babel-loader",
            options: {
              exclude: [
                // \\ for Windows, \/ for Mac OS and Linux
                /node_modules[\\\/]core-js/,
                /node_modules[\\\/]webpack[\\\/]buildin/,
              ],

              presets: ["@babel/preset-env", "@babel/preset-typescript"],
              cacheCompression: false,
              cacheDirectory: true,
              // plugins: ['@babel/plugin-proposal-object-rest-spread']
            },
          },
        },
      ],
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: "css/[name].css",
        chunkFilename: "css/[id].css",
      }),
    ],

    optimization: {
      // removeAvailableModules: false,
      // removeEmptyChunks: false,
      // splitChunks: false,
      // runtimeChunk: true,
      // runtimeChunk: 'single',
      // Minimize CSS in development mode too
      // minimize: true,
      // minimizer: [
      //     // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      //     new CssMinimizerPlugin(),
      // ],
      // removeAvailableModules: false,
      // removeEmptyChunks: false,
      // emitOnErrors: true,
      // mergeDuplicateChunks: false,
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
    },
  };
};
