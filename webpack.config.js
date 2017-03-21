import path from 'path';
import webpack from 'webpack';

export default {

  entry: {
    main: [
      'webpack-hot-middleware/client?reload=true',
      path.join(__dirname, 'client/main.js'),
    ]
  },
  output: {
    path: path.join(),
  },
  watch: true,
  module: {
    preLoaders: [{
      test: /\.jsx$|\.js$/,
      loader: 'eslint-loader',
      include: `${__dirname}/src/`
    }],
    loaders: [{
      test: /\.jsx?$/,
      include: path.join(__dirname, 'src'),
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react']
      }
    }]
  }

};
