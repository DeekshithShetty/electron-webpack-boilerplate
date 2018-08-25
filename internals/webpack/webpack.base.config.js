const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

module.exports = env => ({
  entry: {
    main: './app/main.js',
    home: './app/home-page/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../../build'),
  },
  target: 'electron-renderer',
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [nodeExternals()],
  resolve: {
    alias: {
      env: path.resolve(__dirname, `../config/env_${env}.json`),
    },
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'app/**/*.png', to: 'images', flatten: true },
      { from: 'app/**/*.jpg', to: 'images', flatten: true },
      { from: 'app/**/*.gif', to: 'images', flatten: true },
      { from: 'app/**/*.svg', to: 'images', flatten: true },
      { from: 'app/global-styles.css' },
    ]),
    new HtmlWebpackPlugin({
      filename: 'home.html',
      template: 'app/home-page/index.html',
      chunks: ['home'],
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: ['global-styles.css'],
      append: false,
    }),
  ],
});
