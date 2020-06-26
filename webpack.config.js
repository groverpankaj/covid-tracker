var path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

var CLIENT_SRC_DIR = path.join(__dirname, '/client/src');
var CLIENT_DIST_DIR = path.join(__dirname, '/client/dist');

let browserConfig = {
  mode: 'development',
  entry: CLIENT_SRC_DIR + '/index.js',
  output: {
    filename: 'bundle.js',
    path: CLIENT_DIST_DIR
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
        test: /.css$/,
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
        include: /.module.css$/
      },
      {
        test: /.css$/,
          use: [
            'style-loader',
            'css-loader'
          ],
          exclude: /.module.css$/
        },
      {
        test: /.(png|jpg|gif)$/i,
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
    new webpack.DefinePlugin({
      __isBrowser__: "true"
    }),
    new CompressionPlugin()
  ]
};

var SERVER_SRC_DIR = path.join(__dirname, '/server');
var SERVER_DIST_DIR = path.join(__dirname, '/server-build');

let serverConfig = {
  mode: 'development',
  target: 'node',
  externals: [nodeExternals()],
  entry: SERVER_SRC_DIR + '/index.js',
  output: {
    filename: 'index.js',
    path: SERVER_DIST_DIR
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
        test: /.css$/,
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
        include: /.module.css$/
      },
      {
        test: /.css$/,
          use: [
            'style-loader',
            'css-loader'
          ],
          exclude: /.module.css$/
        },
      {
        test: /.(png|jpg|gif)$/i,
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
    new webpack.DefinePlugin({
      __isBrowser__: "false"
    }),
    new CompressionPlugin()
  ]
};

module.exports = [browserConfig, serverConfig];