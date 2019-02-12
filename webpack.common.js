const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const pagesConfig = require("./src/pages/_templates/pagesConfig.pug")

const htmlWebpackPluginBaseConfig = {
   favicon: "./src/img/favicon.png",
   minify: {
      collapseWhitespace: true,
      removeComments: true,
   },
}

const entries = {};
const htmlWebpackPlugins = [];

pagesConfig.pages.forEach((page) => {

   // Entries
   entries[page.alias] = page.webpackEntry;

   // WebpackHtmlPlugin

   if (!page.htmlWebpackPlugin) {
      console.log(`Нет поля htmlWebpackPlugin в pagesConfig.${page.alias}`);
   }

   if (!page.webpackEntry) {
      console.log(`Нет поля webpackEntry в pagesConfig.${page.alias}`);
   }

   htmlPlugin = new HtmlWebpackPlugin(merge(htmlWebpackPluginBaseConfig, {
      filename: page.htmlWebpackPlugin.filename,
      template: page.htmlWebpackPlugin.template,
      chunks: [page.alias],
   })),

   htmlWebpackPlugins.push(htmlPlugin);

});

module.exports = {
   mode: 'development',
   entry: merge(entries, {

   }),
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
      new webpack.HashedModuleIdsPlugin(),
      new MiniCssExtractPlugin({
         filename: "css/[name].[contenthash].css",
      }),
   ].concat(htmlWebpackPlugins), 

};
