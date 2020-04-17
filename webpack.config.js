var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: SRC_DIR + '/index.js',
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module: {
    rules: [
      {
        test: /(js|jsx)$/,
        exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
      {
        test: /css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
            }
          }
        ],
        include: /module\.css$/
      },
      {
        test: /css$/,
          use: [
            'style-loader',
            'css-loader'
          ],
          exclude: /module\.css$/
        },
      {
        test: /(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      }
    ]
  },
  plugins: [
    new CompressionPlugin()
  ]
};