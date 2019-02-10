const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const htmlWebpackPluginBaseConfig = {
   favicon: "./src/img/favicon.png",
   minify: {
      collapseWhitespace: true,
      removeComments: true,
   },
}

module.exports = {
   mode: 'development',
   entry: {
      index: './src/pages/index/index.ts',
      matrixMulMatrix: './src/pages/matrix-mul-matrix/matrix-mul-matrix.ts',
   },
   output: {
      filename: 'js/[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
   },
   module: {
      rules: [{
         test: /\.ts$/,
         use: [{
            loader: 'ts-loader',
            options: {
               transpileOnly: true,
               experimentalWatchApi: true,
            },
         }],
         exclude: /node_modules/
      }, {
         test: /\.pug/,
         loaders: ['html-loader', 'pug-html-loader'],
      }, {
         test: /\.(sass|css)$/,
         use: [
            MiniCssExtractPlugin.loader, //'style-loader',
            'css-loader',
            {
               loader: 'postcss-loader',
               options: {
                  plugins: [
                     autoprefixer({
                        browsers: ['last 3 version']
                     }),
                     cssnano(),
                  ],
                  sourceMap: true
               }
            },
            {
               loader: 'sass-loader',
               options: {
                  sourceMap: true,
               }
            }
         ]
      }, {
         test: /\.(gif|png|jpe?g|svg|webp)$/i,
         use: [{
            loader: 'file-loader',
            options: {
               outputPath: 'img',
            },
         }, {
            loader: 'image-webpack-loader',
            options: {
               mozjpeg: {
                  progressive: true,
                  quality: 65
               },
               pngquant: {
                  quality: '65-90',
                  speed: 4
               },
            }
         }],
      }],
   },
   resolve: {
      extensions: ['.tsx', '.ts', '.js']
   },
   plugins: [
      new HtmlWebpackPlugin(merge(htmlWebpackPluginBaseConfig, {
         filename: 'index.html',
         template: './src/pages/index/index.pug',
         chunks: ['index'],
      })),
      new HtmlWebpackPlugin(merge(htmlWebpackPluginBaseConfig, {
         filename: 'matrix-mul-matrix/index.html',
         template: './src/pages/matrix-mul-matrix/matrix-mul-matrix.pug',
         chunks: ['matrixMulMatrix'],
      })),
      new webpack.HashedModuleIdsPlugin(),
      new MiniCssExtractPlugin({
         filename: "css/[name].[contenthash].css",
      }),
   ],

};
