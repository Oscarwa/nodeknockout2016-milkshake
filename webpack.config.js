var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'eval',
  entry: [
    './public/js/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/ 
      }
    ]
  },
  include: [
    path.resolve(__dirname, 'public/js')
  ],
  resolve: {
    root: [
      path.resolve('./public/js')
    ]
  }
}
