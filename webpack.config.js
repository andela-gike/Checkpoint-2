const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    'eventsource-polyfill',
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'client/index')
  ],
  target: 'web',
  output: {
    path: path.join(__dirname, '/dist/'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'client')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new HtmlWebpackPlugin({
      template: 'client/index.html',
      inject: 'body',
      filename: 'index.html'
    })
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader?-babelrc,+cacheDirectory,presets[]=es2015,presets[]=stage-2,presets[]=react',
      // query: {
      //   presets: ['es2015', 'stage-2', 'react']
      // }
    }, {
      test: /\.json?$/,
      loader: 'json'
    // }, {
    //   test: /\.(png|jpg)$/,
    //   loader: 'file?name=[path][name].[ext]&context=./app/shared/images'
    }
    // {
    //   test: /\.css$/,
    //   loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[name]---[local]---[hash:base64:5]!postcss')
    // }
    ]
  }
};
