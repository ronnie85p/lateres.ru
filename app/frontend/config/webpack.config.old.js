// // module.exports = {
// //     mode: 'development',
// //     devtool: 'inline-source-map',
// //     entry: {
// //         index: './src/index.js',
// //         // index: {
// //         //     import: './src/index.js',
// //         //     dependOn: 'shared',
// //         // },
// //         // shared: 'lodash',
// //     },
// //     output: {
// //         filename: '[name].[contenthash].js',
// //         path: path.resolve(__dirname, 'dist'),
// //         clean: true
// //     },
// //     module: {
// //         rules: [
// //             {
// //                 test: /\.css$/i,
// //                 use: [MiniCssExtractPlugin.loader, 'css-loader'],
// //             },
// //             {
// //                 test: /\.(png|svg|jpg|jpeg|gif)$/i,
// //                 type: 'asset/resource',
// //             },
// //             {
// // 		        test: /\.(woff|woff2|eot|ttf|otf)$/i,
// // 		        type: 'asset/resource',
// // 		    },
// //         ],
// //     },
// //     plugins: [
// //         new MiniCssExtractPlugin({
// //             filename: "[name].css",
// //             chunkFilename: "[id].css",
// //         }),
// //         new HtmlWebpackPlugin({
// //             title: 'Output Management',
// //         }),
// //     ],
// //     optimization: {
// //         // Minimize CSS in development mode too
// //         minimize: true,
// //         minimizer: [
// //             // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
// //             // `...`,
// //             new CssMinimizerPlugin(),
// //         ],
// //         runtimeChunk: 'single',
// //         splitChunks: {
// //             splitChunks: {
// //                 cacheGroups: {
// //                   vendor: {
// //                     test: /[\\/]node_modules[\\/]/,
// //                     name: 'vendors',
// //                     chunks: 'all',
// //                   },
// //                 },
// //               },
// //         }
// //     }
// // };
