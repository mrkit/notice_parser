const HTMLPlugin = require('html-webpack-plugin'),
      MiniCSS = require('mini-css-extract-plugin'),
      { resolve } = require('path');

const config = {
  entry: './client',
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env']
      }
    }, {
      test: /\.(scss|css)$/,
      use: [
        MiniCSS.loader,
        'css-loader',
        'sass-loader'
      ]
    }]
  },
  plugins: [
    new HTMLPlugin({ template: './client/index.html'}),
    new MiniCSS()
  ]
};

module.exports = config;