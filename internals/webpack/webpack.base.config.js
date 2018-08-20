const path = require('path');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    new HtmlWebpackPlugin({
      filename: 'home.html',
      template: 'app/home-page/index.html',
      chunks: ['home'],
    }),
  ],
});
